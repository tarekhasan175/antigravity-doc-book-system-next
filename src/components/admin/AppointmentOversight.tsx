"use client"

import { useState } from "react"
import { Calendar, AlertTriangle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Appointment = {
    id: string
    patient: string
    doctor: string
    date: string
    time: string
    status: 'confirmed' | 'pending' | 'conflict'
}

export function AppointmentOversight() {
    const [appointments] = useState<Appointment[]>([
        { id: '1', patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2024-01-20', time: '14:00', status: 'confirmed' },
        { id: '2', patient: 'Alice Smith', doctor: 'Dr. Michael Chen', date: '2024-01-20', time: '14:00', status: 'conflict' },
        { id: '3', patient: 'Bob Jones', doctor: 'Dr. Sarah Johnson', date: '2024-01-21', time: '10:00', status: 'pending' },
    ])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Appointment Oversight
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="font-semibold">{apt.patient}</h4>
                                    <span className="text-muted-foreground">→</span>
                                    <span className="text-primary">{apt.doctor}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{apt.date}</span>
                                    <span>{apt.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {apt.status === 'conflict' && (
                                    <Badge variant="destructive" className="gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        Conflict
                                    </Badge>
                                )}
                                {apt.status === 'pending' && (
                                    <Badge variant="secondary">Pending</Badge>
                                )}
                                {apt.status === 'confirmed' && (
                                    <Badge variant="default" className="gap-1">
                                        <Check className="w-3 h-3" />
                                        Confirmed
                                    </Badge>
                                )}
                                {apt.status === 'conflict' && (
                                    <Button size="sm" variant="outline">Resolve</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
