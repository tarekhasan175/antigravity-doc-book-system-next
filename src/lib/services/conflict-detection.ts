import prisma from '@/lib/prisma'
import { AppointmentStatus } from '@prisma/client'

export interface TimeSlot {
    startTime: Date
    endTime: Date
}

/**
 * Check if a doctor has any conflicting appointments
 * @param doctorId - The doctor's ID
 * @param startTime - Proposed appointment start time
 * @param endTime - Proposed appointment end time
 * @param excludeAppointmentId - Optional appointment ID to exclude (for rescheduling)
 * @returns true if there's a conflict, false otherwise
 */
export async function checkAppointmentConflict(
    doctorId: string,
    startTime: Date,
    endTime: Date,
    excludeAppointmentId?: string
): Promise<boolean> {
    const conflicts = await prisma.appointment.findMany({
        where: {
            doctorId,
            id: excludeAppointmentId ? { not: excludeAppointmentId } : undefined,
            status: {
                in: [AppointmentStatus.REQUESTED, AppointmentStatus.CONFIRMED]
            },
            OR: [
                // New appointment starts during existing appointment
                {
                    AND: [
                        { startTime: { lte: startTime } },
                        { endTime: { gt: startTime } }
                    ]
                },
                // New appointment ends during existing appointment
                {
                    AND: [
                        { startTime: { lt: endTime } },
                        { endTime: { gte: endTime } }
                    ]
                },
                // New appointment completely contains existing appointment
                {
                    AND: [
                        { startTime: { gte: startTime } },
                        { endTime: { lte: endTime } }
                    ]
                }
            ]
        }
    })

    return conflicts.length > 0
}

/**
 * Check if the requested time slot is within doctor's availability
 * @param doctorId - The doctor's ID
 * @param date - Appointment date
 * @param startTime - Start time string (HH:MM)
 * @param endTime - End time string (HH:MM)
 * @returns true if available, false otherwise
 */
export async function checkDoctorAvailability(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string
): Promise<boolean> {
    const dayOfWeek = date.getDay()

    const availability = await prisma.doctorAvailability.findFirst({
        where: {
            doctorId,
            dayOfWeek,
            isAvailable: true,
            startTime: { lte: startTime },
            endTime: { gte: endTime }
        }
    })

    return availability !== null
}

/**
 * Get available time slots for a doctor on a specific date
 * @param doctorId - The doctor's ID
 * @param date - The date to check
 * @param slotDuration - Duration of each slot in minutes (default: 30)
 * @returns Array of available time slots
 */
export async function getAvailableSlots(
    doctorId: string,
    date: Date,
    slotDuration: number = 30
): Promise<TimeSlot[]> {
    const dayOfWeek = date.getDay()

    // Get doctor's availability for this day
    const availabilities = await prisma.doctorAvailability.findMany({
        where: {
            doctorId,
            dayOfWeek,
            isAvailable: true
        }
    })

    if (availabilities.length === 0) {
        return []
    }

    // Get existing appointments for this day
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const existingAppointments = await prisma.appointment.findMany({
        where: {
            doctorId,
            date: startOfDay,
            status: {
                in: [AppointmentStatus.REQUESTED, AppointmentStatus.CONFIRMED]
            }
        },
        select: {
            startTime: true,
            endTime: true
        }
    })

    const availableSlots: TimeSlot[] = []

    // Generate slots from availability windows
    for (const availability of availabilities) {
        const [startHour, startMinute] = availability.startTime.split(':').map(Number)
        const [endHour, endMinute] = availability.endTime.split(':').map(Number)

        let currentTime = new Date(date)
        currentTime.setHours(startHour, startMinute, 0, 0)

        const windowEnd = new Date(date)
        windowEnd.setHours(endHour, endMinute, 0, 0)

        while (currentTime < windowEnd) {
            const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000)

            if (slotEnd <= windowEnd) {
                // Check if this slot conflicts with existing appointments
                const hasConflict = existingAppointments.some(apt => {
                    return (
                        (currentTime >= apt.startTime && currentTime < apt.endTime) ||
                        (slotEnd > apt.startTime && slotEnd <= apt.endTime) ||
                        (currentTime <= apt.startTime && slotEnd >= apt.endTime)
                    )
                })

                if (!hasConflict) {
                    availableSlots.push({
                        startTime: new Date(currentTime),
                        endTime: new Date(slotEnd)
                    })
                }
            }

            currentTime = new Date(currentTime.getTime() + slotDuration * 60000)
        }
    }

    return availableSlots
}
