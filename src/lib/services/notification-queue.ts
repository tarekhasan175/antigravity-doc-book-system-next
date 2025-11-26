import prisma from '@/lib/prisma'
import { NotificationStatus } from '@prisma/client'

export type NotificationType = 'email' | 'sms' | 'push'

export interface QueueNotificationParams {
    recipientEmail?: string
    recipientPhone?: string
    type: NotificationType
    template: string
    subject?: string
    message: string
    data?: Record<string, any>
    scheduledFor?: Date
}

/**
 * Queue a notification for processing
 */
export async function queueNotification(params: QueueNotificationParams) {
    return await prisma.notificationQueue.create({
        data: {
            recipientEmail: params.recipientEmail,
            recipientPhone: params.recipientPhone,
            type: params.type,
            template: params.template,
            subject: params.subject,
            message: params.message,
            data: params.data || {},
            scheduledFor: params.scheduledFor || new Date(),
            status: NotificationStatus.PENDING
        }
    })
}

/**
 * Send appointment confirmation notification
 */
export async function sendAppointmentConfirmation(
    email: string,
    phone: string,
    appointmentData: {
        doctorName: string
        date: string
        time: string
        clinicName?: string
    }
) {
    const message = `Your appointment with Dr. ${appointmentData.doctorName} is confirmed for ${appointmentData.date} at ${appointmentData.time}${appointmentData.clinicName ? ` at ${appointmentData.clinicName}` : ''}.`

    // Queue email
    await queueNotification({
        recipientEmail: email,
        type: 'email',
        template: 'appointment_confirmation',
        subject: 'Appointment Confirmation',
        message,
        data: appointmentData
    })

    // Queue SMS
    await queueNotification({
        recipientPhone: phone,
        type: 'sms',
        template: 'appointment_confirmation_sms',
        message,
        data: appointmentData
    })
}

/**
 * Send appointment reminder (24 hours before)
 */
export async function sendAppointmentReminder(
    email: string,
    phone: string,
    appointmentData: {
        doctorName: string
        date: string
        time: string
        clinicAddress?: string
    },
    scheduledFor: Date
) {
    const message = `Reminder: You have an appointment with Dr. ${appointmentData.doctorName} tomorrow at ${appointmentData.time}.${appointmentData.clinicAddress ? ` Location: ${appointmentData.clinicAddress}` : ''}`

    // Queue email reminder
    await queueNotification({
        recipientEmail: email,
        type: 'email',
        template: 'appointment_reminder',
        subject: 'Appointment Reminder - Tomorrow',
        message,
        data: appointmentData,
        scheduledFor
    })

    // Queue SMS reminder
    await queueNotification({
        recipientPhone: phone,
        type: 'sms',
        template: 'appointment_reminder_sms',
        message,
        data: appointmentData,
        scheduledFor
    })
}

/**
 * Process pending notifications (to be called by a worker/cron job)
 */
export async function processPendingNotifications(batchSize: number = 10) {
    const notifications = await prisma.notificationQueue.findMany({
        where: {
            status: NotificationStatus.PENDING,
            scheduledFor: {
                lte: new Date()
            },
            attempts: {
                lt: prisma.notificationQueue.fields.maxAttempts
            }
        },
        take: batchSize,
        orderBy: {
            scheduledFor: 'asc'
        }
    })

    const results = await Promise.allSettled(
        notifications.map(notification => sendNotification(notification.id))
    )

    return {
        processed: results.length,
        succeeded: results.filter(r => r.status === 'fulfilled').length,
        failed: results.filter(r => r.status === 'rejected').length
    }
}

/**
 * Send a single notification
 */
async function sendNotification(notificationId: string) {
    const notification = await prisma.notificationQueue.findUnique({
        where: { id: notificationId }
    })

    if (!notification) {
        throw new Error('Notification not found')
    }

    try {
        // Update attempts
        await prisma.notificationQueue.update({
            where: { id: notificationId },
            data: {
                attempts: notification.attempts + 1
            }
        })

        // Send based on type
        if (notification.type === 'email') {
            await sendEmail(notification)
        } else if (notification.type === 'sms') {
            await sendSMS(notification)
        } else if (notification.type === 'push') {
            await sendPushNotification(notification)
        }

        // Mark as sent
        await prisma.notificationQueue.update({
            where: { id: notificationId },
            data: {
                status: NotificationStatus.SENT,
                sentAt: new Date()
            }
        })

        return true
    } catch (error) {
        // Mark as failed if max attempts reached
        const shouldMarkFailed = notification.attempts + 1 >= notification.maxAttempts

        await prisma.notificationQueue.update({
            where: { id: notificationId },
            data: {
                status: shouldMarkFailed ? NotificationStatus.FAILED : NotificationStatus.PENDING,
                failedAt: shouldMarkFailed ? new Date() : null,
                error: error instanceof Error ? error.message : 'Unknown error'
            }
        })

        throw error
    }
}

/**
 * Send email using SendGrid
 */
async function sendEmail(notification: any) {
    if (!notification.recipientEmail) {
        throw new Error('No recipient email provided')
    }

    // TODO: Integrate with SendGrid
    console.log(`[EMAIL] To: ${notification.recipientEmail}, Subject: ${notification.subject}`)
    console.log(`Message: ${notification.message}`)

    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: notification.recipientEmail,
    //   from: 'noreply@docbook.com',
    //   subject: notification.subject,
    //   text: notification.message,
    //   html: renderTemplate(notification.template, notification.data)
    // })
}

/**
 * Send SMS using Twilio
 */
async function sendSMS(notification: any) {
    if (!notification.recipientPhone) {
        throw new Error('No recipient phone provided')
    }

    // TODO: Integrate with Twilio
    console.log(`[SMS] To: ${notification.recipientPhone}`)
    console.log(`Message: ${notification.message}`)

    // Example Twilio integration:
    // const twilio = require('twilio')
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    // await client.messages.create({
    //   body: notification.message,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: notification.recipientPhone
    // })
}

/**
 * Send push notification
 */
async function sendPushNotification(notification: any) {
    // TODO: Integrate with Firebase Cloud Messaging or similar
    console.log(`[PUSH] Message: ${notification.message}`)
}
