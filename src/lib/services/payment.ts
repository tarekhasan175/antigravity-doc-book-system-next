import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { PaymentStatus } from '@prisma/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover',
})

export interface CreatePaymentIntentParams {
    invoiceId: string
    amount: number
    currency?: string
    metadata?: Record<string, string>
}

/**
 * Create a Stripe Payment Intent for an invoice
 */
export async function createPaymentIntent(params: CreatePaymentIntentParams) {
    const { invoiceId, amount, currency = 'usd', metadata = {} } = params

    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: {
            patient: {
                include: {
                    user: true
                }
            },
            appointment: true
        }
    })

    if (!invoice) {
        throw new Error('Invoice not found')
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: {
            invoiceId,
            patientId: invoice.patientId,
            appointmentId: invoice.appointmentId,
            ...metadata
        },
        receipt_email: invoice.patient.user.email,
    })

    // Update invoice with Stripe Payment Intent ID
    await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
            stripePaymentIntentId: paymentIntent.id
        }
    })

    return paymentIntent
}

/**
 * Confirm a payment and update invoice status
 */
export async function confirmPayment(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not successful')
    }

    const invoice = await prisma.invoice.findFirst({
        where: { stripePaymentIntentId: paymentIntentId }
    })

    if (!invoice) {
        throw new Error('Invoice not found for payment intent')
    }

    // Update invoice
    await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
            status: PaymentStatus.COMPLETED,
            paidAt: new Date()
        }
    })

    // Create payment record
    await prisma.payment.create({
        data: {
            invoiceId: invoice.id,
            amount: invoice.total,
            method: 'card',
            status: PaymentStatus.COMPLETED,
            stripeChargeId: paymentIntent.latest_charge as string,
            transactionId: paymentIntent.id,
            paidAt: new Date()
        }
    })

    return invoice
}

/**
 * Process a refund for a payment
 */
export async function processRefund(invoiceId: string, amount?: number, reason?: string) {
    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: {
            payments: {
                where: {
                    status: PaymentStatus.COMPLETED
                }
            }
        }
    })

    if (!invoice) {
        throw new Error('Invoice not found')
    }

    if (!invoice.stripePaymentIntentId) {
        throw new Error('No Stripe payment found for this invoice')
    }

    const payment = invoice.payments[0]
    if (!payment) {
        throw new Error('No completed payment found')
    }

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
        payment_intent: invoice.stripePaymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
        reason: reason as any || 'requested_by_customer',
    })

    // Update invoice status
    await prisma.invoice.update({
        where: { id: invoiceId },
        data: {
            status: PaymentStatus.REFUNDED
        }
    })

    // Update payment record
    await prisma.payment.update({
        where: { id: payment.id },
        data: {
            status: PaymentStatus.REFUNDED,
            stripeRefundId: refund.id,
            refundedAt: new Date()
        }
    })

    return refund
}

/**
 * Generate invoice PDF (placeholder - integrate with PDF library)
 */
export async function generateInvoicePDF(invoiceId: string): Promise<Buffer> {
    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        include: {
            patient: {
                include: {
                    user: true
                }
            },
            appointment: {
                include: {
                    doctor: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    })

    if (!invoice) {
        throw new Error('Invoice not found')
    }

    // TODO: Integrate with PDF generation library (e.g., PDFKit, Puppeteer)
    // For now, return a placeholder
    const pdfContent = `
    INVOICE #${invoice.invoiceNumber}
    
    Patient: ${invoice.patient.user.name}
    Doctor: ${invoice.appointment.doctor.user.name}
    Date: ${invoice.createdAt.toLocaleDateString()}
    
    Amount: $${invoice.amount}
    Tax: $${invoice.tax}
    Total: $${invoice.total}
    
    Status: ${invoice.status}
  `

    return Buffer.from(pdfContent, 'utf-8')
}
