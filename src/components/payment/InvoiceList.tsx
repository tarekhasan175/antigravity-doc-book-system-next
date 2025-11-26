"use client"

import { useState } from "react"
import { FileText, Download, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Invoice = {
    id: string
    invoiceNumber: string
    date: string
    doctorName: string
    appointmentType: string
    amount: number
    tax: number
    total: number
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
    paidAt?: string
}

export function InvoiceList() {
    const [invoices] = useState<Invoice[]>([
        {
            id: '1',
            invoiceNumber: 'INV-2024-001',
            date: '2024-01-15',
            doctorName: 'Dr. Sarah Johnson',
            appointmentType: 'Check-up',
            amount: 150.00,
            tax: 15.00,
            total: 165.00,
            status: 'COMPLETED',
            paidAt: '2024-01-15'
        },
        {
            id: '2',
            invoiceNumber: 'INV-2024-002',
            date: '2024-01-20',
            doctorName: 'Dr. Michael Chen',
            appointmentType: 'Consultation',
            amount: 200.00,
            tax: 20.00,
            total: 220.00,
            status: 'PENDING'
        },
        {
            id: '3',
            invoiceNumber: 'INV-2024-003',
            date: '2024-01-10',
            doctorName: 'Dr. Emily Davis',
            appointmentType: 'Follow-up',
            amount: 100.00,
            tax: 10.00,
            total: 110.00,
            status: 'REFUNDED',
            paidAt: '2024-01-10'
        }
    ])

    const getStatusBadge = (status: Invoice['status']) => {
        switch (status) {
            case 'COMPLETED':
                return <Badge className="gap-1"><CheckCircle className="w-3 h-3" /> Paid</Badge>
            case 'PENDING':
                return <Badge variant="secondary" className="gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
            case 'FAILED':
                return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" /> Failed</Badge>
            case 'REFUNDED':
                return <Badge variant="outline" className="gap-1">Refunded</Badge>
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Invoices & Payments</h2>
            </div>

            <div className="space-y-4">
                {invoices.map((invoice) => (
                    <Card key={invoice.id}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        {invoice.invoiceNumber}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {new Date(invoice.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                {getStatusBadge(invoice.status)}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Doctor</span>
                                        <span className="font-medium">{invoice.doctorName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Type</span>
                                        <span>{invoice.appointmentType}</span>
                                    </div>
                                    {invoice.paidAt && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Paid On</span>
                                            <span>{new Date(invoice.paidAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Amount</span>
                                        <span>${invoice.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>${invoice.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold pt-2 border-t">
                                        <span>Total</span>
                                        <span>${invoice.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </Button>
                                {invoice.status === 'PENDING' && (
                                    <Button size="sm" className="gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Pay Now
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
