import { notFound } from "next/navigation"
import { User, Calendar, FileText, Video, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock patient data
const PATIENTS = [
    {
        id: "patient-1",
        name: "John Doe",
        age: 45,
        gender: "Male",
        email: "john.doe@email.com",
        phone: "(555) 123-4567",
        bloodType: "O+",
        allergies: ["Penicillin"],
        conditions: ["Hypertension"],
        lastVisit: "2024-01-15",
        visits: [
            { date: "2024-01-15", diagnosis: "Routine Check-up", notes: "Blood pressure stable" },
            { date: "2023-10-20", diagnosis: "Hypertension Follow-up", notes: "Medication adjusted" }
        ]
    }
]

export default async function PatientRecordPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const patient = PATIENTS.find(p => p.id === id)

    if (!patient) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-secondary/30 py-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Patient Record</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Video className="w-4 h-4" />
                            Start Video Call
                        </Button>
                        <Button className="gap-2">
                            <FileText className="w-4 h-4" />
                            Add Note
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>{patient.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{patient.age} years, {patient.gender}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Contact</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="w-3 h-3" />
                                        {patient.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="w-3 h-3" />
                                        {patient.phone}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Medical Info</h4>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Blood Type:</span> {patient.bloodType}
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Last Visit:</span> {patient.lastVisit}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Allergies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies.map((allergy, i) => (
                                        <Badge key={i} variant="destructive">{allergy}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Conditions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {patient.conditions.map((condition, i) => (
                                        <Badge key={i} variant="secondary">{condition}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Visit History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {patient.visits.map((visit, i) => (
                                    <div key={i} className="border-l-2 border-primary pl-4 pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold">{visit.diagnosis}</h4>
                                            <span className="text-sm text-muted-foreground">{visit.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{visit.notes}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
