import { z } from 'zod'

// User schemas
export const signUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['PATIENT', 'DOCTOR']),
})

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

// Appointment schemas
export const bookingSchema = z.object({
    doctorId: z.string().cuid('Invalid doctor ID'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
    type: z.string().min(1, 'Appointment type is required'),
    notes: z.string().optional(),
})

export const cancelAppointmentSchema = z.object({
    appointmentId: z.string().cuid('Invalid appointment ID'),
    reason: z.string().min(10, 'Please provide a reason (at least 10 characters)').optional(),
})

export const rescheduleAppointmentSchema = z.object({
    appointmentId: z.string().cuid('Invalid appointment ID'),
    newDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    newTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
})

// Doctor schemas
export const availabilitySchema = z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    isAvailable: z.boolean().default(true),
})

export const updateDoctorProfileSchema = z.object({
    bio: z.string().max(1000).optional(),
    specialty: z.string().min(2).max(100).optional(),
    experience: z.number().min(0).max(70).optional(),
    location: z.string().max(200).optional(),
    price: z.number().positive().optional(),
})

// Patient schemas
export const updatePatientProfileSchema = z.object({
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    allergies: z.array(z.string()).optional(),
    address: z.string().max(300).optional(),
    emergencyContact: z.string().max(200).optional(),
})

// Medical record schemas
export const createMedicalRecordSchema = z.object({
    patientId: z.string().cuid(),
    diagnosis: z.string().min(1, 'Diagnosis is required'),
    prescription: z.array(z.string()),
    notes: z.string().optional(),
    attachments: z.array(z.string().url()).optional(),
})

// Admin schemas
export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['ADMIN', 'DOCTOR', 'PATIENT']),
})

export const updateSystemSettingsSchema = z.object({
    key: z.string().min(1),
    value: z.string(),
    description: z.string().optional(),
})

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type BookingInput = z.infer<typeof bookingSchema>
export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>
export type RescheduleAppointmentInput = z.infer<typeof rescheduleAppointmentSchema>
export type AvailabilityInput = z.infer<typeof availabilitySchema>
export type UpdateDoctorProfileInput = z.infer<typeof updateDoctorProfileSchema>
export type UpdatePatientProfileInput = z.infer<typeof updatePatientProfileSchema>
export type CreateMedicalRecordInput = z.infer<typeof createMedicalRecordSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateSystemSettingsInput = z.infer<typeof updateSystemSettingsSchema>
