'use server'

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "@/lib/auth-options"
import prisma from "@/lib/prisma"
import { bookingSchema, cancelAppointmentSchema, rescheduleAppointmentSchema } from "@/lib/validations"
import { checkAppointmentConflict, checkDoctorAvailability } from "@/lib/services/conflict-detection"
import { createAuditLog } from "@/lib/audit"
import { AppointmentStatus } from "@prisma/client"

export async function bookAppointment(data: unknown) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error('Unauthorized')
    }

    if (session.user.role !== 'PATIENT') {
        throw new Error('Only patients can book appointments')
    }

    // Validate input
    const validated = bookingSchema.parse(data)

    // Parse date and time
    const appointmentDate = new Date(validated.date)
    const [hours, minutes] = validated.time.split(':').map(Number)

    const startTime = new Date(appointmentDate)
    startTime.setHours(hours, minutes, 0, 0)

    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + 30) // 30-minute slots

    // Check doctor availability
    const isAvailable = await checkDoctorAvailability(
        validated.doctorId,
        appointmentDate,
        validated.time,
        `${hours}:${minutes + 30}`
    )

    if (!isAvailable) {
        throw new Error('Doctor is not available at this time')
    }

    // Check for conflicts
    const hasConflict = await checkAppointmentConflict(
        validated.doctorId,
        startTime,
        endTime
    )

    if (hasConflict) {
        throw new Error('This time slot is no longer available')
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
        data: {
            patientId: session.user.patientId!,
            doctorId: validated.doctorId,
            date: appointmentDate,
            startTime,
            endTime,
            type: validated.type,
            notes: validated.notes,
            status: AppointmentStatus.REQUESTED
        },
        include: {
            doctor: {
                include: {
                    user: true
                }
            },
            patient: {
                include: {
                    user: true
                }
            }
        }
    })

    // Create audit log
    await createAuditLog(
        'APPOINTMENT_CREATED',
        session.user.id,
        'appointment',
        appointment.id,
        { doctorId: validated.doctorId, date: validated.date, time: validated.time }
    )

    // Revalidate relevant paths
    revalidatePath('/appointments')
    revalidatePath('/doctor/dashboard')

    return appointment
}

export async function cancelAppointment(data: unknown) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error('Unauthorized')
    }

    const validated = cancelAppointmentSchema.parse(data)

    // Get appointment
    const appointment = await prisma.appointment.findUnique({
        where: { id: validated.appointmentId }
    })

    if (!appointment) {
        throw new Error('Appointment not found')
    }

    // Check permissions
    const isPatient = session.user.role === 'PATIENT' && appointment.patientId === session.user.patientId
    const isDoctor = session.user.role === 'DOCTOR' && appointment.doctorId === session.user.doctorId
    const isAdmin = session.user.role === 'ADMIN'

    if (!isPatient && !isDoctor && !isAdmin) {
        throw new Error('You do not have permission to cancel this appointment')
    }

    // Update appointment
    const updated = await prisma.appointment.update({
        where: { id: validated.appointmentId },
        data: {
            status: AppointmentStatus.CANCELLED,
            cancelReason: validated.reason
        }
    })

    // Audit log
    await createAuditLog(
        'APPOINTMENT_CANCELLED',
        session.user.id,
        'appointment',
        validated.appointmentId,
        { reason: validated.reason }
    )

    revalidatePath('/appointments')
    revalidatePath('/doctor/dashboard')

    return updated
}

export async function rescheduleAppointment(data: unknown) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error('Unauthorized')
    }

    const validated = rescheduleAppointmentSchema.parse(data)

    // Get existing appointment
    const appointment = await prisma.appointment.findUnique({
        where: { id: validated.appointmentId }
    })

    if (!appointment) {
        throw new Error('Appointment not found')
    }

    // Check permissions
    const isPatient = session.user.role === 'PATIENT' && appointment.patientId === session.user.patientId
    const isDoctor = session.user.role === 'DOCTOR' && appointment.doctorId === session.user.doctorId
    const isAdmin = session.user.role === 'ADMIN'

    if (!isPatient && !isDoctor && !isAdmin) {
        throw new Error('You do not have permission to reschedule this appointment')
    }

    // Parse new date and time
    const newDate = new Date(validated.newDate)
    const [hours, minutes] = validated.newTime.split(':').map(Number)

    const newStartTime = new Date(newDate)
    newStartTime.setHours(hours, minutes, 0, 0)

    const newEndTime = new Date(newStartTime)
    newEndTime.setMinutes(newEndTime.getMinutes() + 30)

    // Check availability
    const isAvailable = await checkDoctorAvailability(
        appointment.doctorId,
        newDate,
        validated.newTime,
        `${hours}:${minutes + 30}`
    )

    if (!isAvailable) {
        throw new Error('Doctor is not available at the new time')
    }

    // Check for conflicts (excluding current appointment)
    const hasConflict = await checkAppointmentConflict(
        appointment.doctorId,
        newStartTime,
        newEndTime,
        validated.appointmentId
    )

    if (hasConflict) {
        throw new Error('The new time slot is not available')
    }

    // Update appointment
    const updated = await prisma.appointment.update({
        where: { id: validated.appointmentId },
        data: {
            date: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            status: AppointmentStatus.REQUESTED
        }
    })

    // Audit log
    await createAuditLog(
        'APPOINTMENT_RESCHEDULED',
        session.user.id,
        'appointment',
        validated.appointmentId,
        { newDate: validated.newDate, newTime: validated.newTime }
    )

    revalidatePath('/appointments')
    revalidatePath('/doctor/dashboard')

    return updated
}
