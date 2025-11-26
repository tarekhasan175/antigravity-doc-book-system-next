"use client"

import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface PaymentCheckoutProps {
    invoiceId: string
    amount: number
    tax: number
    total: number
    appointmentDetails: {
        doctorName: string
        date: string
        time: string
        type: string
    }
    onSuccess?: () => void
    onCancel?: () => void
}

export function PaymentCheckout({
    invoiceId,
    amount,
    tax,
    total,
    appointmentDetails,
    onSuccess,
    onCancel
}: PaymentCheckoutProps) {
    const [processing, setProcessing] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'insurance'>('card')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setProcessing(true)

        try {
            // TODO: Integrate with Stripe
            // const response = await fetch('/api/payments/create-intent', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ invoiceId, amount: total })
            // })
            // const { clientSecret } = await response.json()
            // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
            // const result = await stripe.confirmCardPayment(clientSecret, {
            //   payment_method: { card: elements.getElement(CardElement)! }
            // })

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000))

            onSuccess?.()
        } catch (error) {
            console.error('Payment failed:', error)
        } finally {
            setProcessing(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Doctor</span>
                        <span className="font-medium">{appointmentDetails.doctorName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span className="font-medium">{appointmentDetails.date} at {appointmentDetails.time}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <Badge variant="secondary">{appointmentDetails.type}</Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                                onClick={() => setPaymentMethod('card')}
                                className="flex-1"
                            >
                                Credit Card
                            </Button>
                            <Button
                                type="button"
                                variant={paymentMethod === 'insurance' ? 'default' : 'outline'}
                                onClick={() => setPaymentMethod('insurance')}
                                className="flex-1"
                            >
                                Insurance
                            </Button>
                        </div>

                        {paymentMethod === 'card' && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Card Number</Label>
                                    <Input placeholder="4242 4242 4242 4242" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Expiry Date</Label>
                                        <Input placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CVC</Label>
                                        <Input placeholder="123" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Cardholder Name</Label>
                                    <Input placeholder="John Doe" />
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Consultation Fee</span>
                                        <span>${amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Lock className="w-4 h-4" />
                                    <span>Your payment information is secure and encrypted</span>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1"
                                    >
                                        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onCancel}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}

                        {paymentMethod === 'insurance' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Insurance Provider</Label>
                                    <Input placeholder="Blue Cross Blue Shield" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Policy Number</Label>
                                    <Input placeholder="ABC123456789" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Group Number</Label>
                                    <Input placeholder="GRP456" />
                                </div>
                                <Button className="w-full">Submit Insurance Claim</Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
