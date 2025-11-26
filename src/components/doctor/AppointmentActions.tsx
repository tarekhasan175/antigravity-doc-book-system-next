"use client"

import { useState } from "react"
import { Check, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Appointment = {
    id: string
    patientName: string
    time: string
    date: string
    type: string
    status: 'pending' | 'confirmed' | 'cancelled'
}

export function AppointmentActions({ appointment }: { appointment: Appointment }) {
    const [status, setStatus] = useState(appointment.status)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleAction = async (action: 'accept' | 'cancel' | 'reschedule') => {
        setIsProcessing(true)
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (action === 'accept') {
            setStatus('confirmed')
        } else if (action === 'cancel') {
            setStatus('cancelled')
        }

        setIsProcessing(false)
    }

    if (status === 'confirmed') {
        return (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Confirmed</span>
            </div>
        )
    }

    if (status === 'cancelled') {
        return (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Cancelled</span>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                variant="default"
                onClick={() => handleAction('accept')}
                disabled={isProcessing}
                className="gap-1"
            >
                <Check className="w-3 h-3" />
                Accept
            </Button>
            <Button
                size="sm"
                variant="outline"
                onClick={() => handleAction('reschedule')}
                disabled={isProcessing}
                className="gap-1"
            >
                <Calendar className="w-3 h-3" />
                Reschedule
            </Button>
            <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction('cancel')}
                disabled={isProcessing}
                className="gap-1"
            >
                <X className="w-3 h-3" />
                Cancel
            </Button>
        </div>
    )
}
