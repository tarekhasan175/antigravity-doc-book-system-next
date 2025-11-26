"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Stethoscope, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Appointment = {
    id: string
    doctorName: string
    doctorSpecialty: string
    date: string
    time: string
    [key: string]: any
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem('appointments')
        if (saved) {
            setAppointments(JSON.parse(saved))
        }
    }, [])

    const handleDelete = (id: string) => {
        if (window.confirm('Cancel this appointment?')) {
            const updated = appointments.filter(app => app.id !== id)
            setAppointments(updated)
            localStorage.setItem('appointments', JSON.stringify(updated))
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-secondary/30 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">My Appointments</h2>
                    <Link href="/#doctors">
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Book New
                        </Button>
                    </Link>
                </div>

                {appointments.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                                <Calendar className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No appointments yet</h3>
                            <p className="text-muted-foreground mb-8">Find a specialist and book your first visit today.</p>
                            <Link href="/#doctors">
                                <Button>Find a Doctor</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {appointments.map((app) => (
                            <Card key={app.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl">
                                            <Stethoscope className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{app.doctorName}</h3>
                                            <p className="text-primary text-sm font-medium">{app.doctorSpecialty}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {app.date}</span>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {app.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium border border-green-100 dark:border-green-900/50 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            Confirmed
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(app.id)}
                                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            title="Cancel Appointment"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
