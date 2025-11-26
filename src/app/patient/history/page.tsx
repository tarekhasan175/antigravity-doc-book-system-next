"use client"

import { useState } from "react"
import { FileText, Calendar, Clock, User, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type MedicalRecord = {
    id: string
    date: string
    doctorName: string
    specialty: string
    diagnosis: string
    prescription: string[]
    notes: string
    status: 'completed' | 'cancelled'
}

export default function PatientHistoryPage() {
    // Mock data
    const [records] = useState<MedicalRecord[]>([
        {
            id: "1",
            date: "2023-11-10",
            doctorName: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            diagnosis: "Mild Hypertension",
            prescription: ["Lisinopril 10mg", "Aspirin 81mg"],
            notes: "Patient advised to reduce sodium intake and monitor BP daily.",
            status: "completed"
        },
        {
            id: "2",
            date: "2023-09-15",
            doctorName: "Dr. Michael Chen",
            specialty: "Dermatology",
            diagnosis: "Eczema",
            prescription: ["Hydrocortisone Cream"],
            notes: "Follow up in 2 weeks if symptoms persist.",
            status: "completed"
        }
    ])

    return (
        <div className="min-h-screen bg-secondary/30 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Medical History</h1>

                <div className="space-y-6">
                    {records.map((record) => (
                        <Card key={record.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <User className="h-5 w-5 text-primary" />
                                            {record.doctorName}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">{record.specialty}</p>
                                    </div>
                                    <Badge variant={record.status === 'completed' ? 'default' : 'destructive'}>
                                        {record.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{record.date}</span>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-1">Diagnosis</h4>
                                            <p className="text-sm">{record.diagnosis}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-1">Prescription</h4>
                                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                                {record.prescription.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-1">Doctor's Notes</h4>
                                            <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                                                {record.notes}
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Download className="h-4 w-4" />
                                                Download Report
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
