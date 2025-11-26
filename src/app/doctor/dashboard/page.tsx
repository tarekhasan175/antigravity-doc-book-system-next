"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, User, FileText, Settings, Video, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentActions } from "@/components/doctor/AppointmentActions"

export default function DoctorDashboard() {
    const [appointments] = useState([
        { id: '1', patientName: 'Alice Smith', time: '14:00', date: '2024-01-20', type: 'Check-up', status: 'pending' as const },
        { id: '2', patientName: 'Bob Jones', time: '15:30', date: '2024-01-20', type: 'Follow-up', status: 'confirmed' as const },
        { id: '3', patientName: 'Charlie Brown', time: '16:15', date: '2024-01-20', type: 'Consultation', status: 'pending' as const },
    ])

    return (
        <div className="min-h-screen bg-secondary/30 py-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">2 remaining</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,240</div>
                            <p className="text-xs text-muted-foreground">+12 this month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Needs review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.8</div>
                            <p className="text-xs text-muted-foreground">From 156 reviews</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Appointment Queue */}
                    <Card className="col-span-2 md:col-span-1">
                        <CardHeader>
                            <CardTitle>Appointment Queue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <User className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <Link href={`/doctor/patients/patient-1`} className="font-medium hover:underline">
                                                    {apt.patientName}
                                                </Link>
                                                <p className="text-sm text-muted-foreground">{apt.type}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                    <Clock className="h-3 w-3" />
                                                    {apt.time}
                                                </div>
                                            </div>
                                        </div>
                                        <AppointmentActions appointment={apt} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Schedule Overview */}
                    <Card className="col-span-2 md:col-span-1">
                        <CardHeader>
                            <CardTitle>This Week's Schedule</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { day: 'Monday', slots: 6, available: true },
                                    { day: 'Tuesday', slots: 4, available: false },
                                    { day: 'Wednesday', slots: 8, available: true },
                                    { day: 'Thursday', slots: 5, available: true },
                                    { day: 'Friday', slots: 6, available: true },
                                ].map((schedule, i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium">{schedule.day}</p>
                                            <p className="text-sm text-muted-foreground">{schedule.slots} slots</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${schedule.available
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {schedule.available ? 'Available' : 'Unavailable'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Button variant="outline" className="h-24 flex-col gap-2">
                                    <Video className="h-6 w-6" />
                                    <span className="text-sm">Start Video Call</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2">
                                    <FileText className="h-6 w-6" />
                                    <span className="text-sm">Write Prescription</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2">
                                    <Calendar className="h-6 w-6" />
                                    <span className="text-sm">Manage Schedule</span>
                                </Button>
                                <Button variant="outline" className="h-24 flex-col gap-2">
                                    <Users className="h-6 w-6" />
                                    <span className="text-sm">View All Patients</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
