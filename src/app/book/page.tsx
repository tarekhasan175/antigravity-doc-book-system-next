"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Building2, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function EnhancedBookingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        doctorId: '',
        clinicId: '',
        date: '',
        time: '',
        type: '',
        notes: ''
    })

    const clinics = [
        { id: '1', name: 'Main Medical Center', address: '123 Health St, New York, NY' },
        { id: '2', name: 'Downtown Clinic', address: '456 Care Ave, New York, NY' },
        { id: '3', name: 'Westside Health', address: '789 Wellness Blvd, Los Angeles, CA' }
    ]

    const doctors = [
        { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', clinics: ['1', '2'] },
        { id: '2', name: 'Dr. Michael Chen', specialty: 'Dermatology', clinics: ['1', '3'] },
        { id: '3', name: 'Dr. Emily Davis', specialty: 'Pediatrics', clinics: ['2'] }
    ]

    const availableClinics = doctors.find(d => d.id === formData.doctorId)?.clinics || []
    const filteredClinics = clinics.filter(c => availableClinics.includes(c.id))

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = async () => {
        // TODO: Call booking API with clinic
        console.log('Booking with clinic:', formData)
        router.push('/appointments')
    }

    return (
        <div className="min-h-screen bg-secondary/30 py-8">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">Book Appointment</h1>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                                }`}>
                                {s}
                            </div>
                            {s < 3 && (
                                <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-primary' : 'bg-secondary'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 1: Doctor & Clinic Selection */}
                {step === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Select Doctor & Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Doctor</Label>
                                <Select value={formData.doctorId} onValueChange={(value) => {
                                    setFormData({ ...formData, doctorId: value, clinicId: '' })
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a doctor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id}>
                                                {doctor.name} - {doctor.specialty}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {formData.doctorId && (
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" />
                                        Clinic Location
                                    </Label>
                                    <Select value={formData.clinicId} onValueChange={(value) =>
                                        setFormData({ ...formData, clinicId: value })
                                    }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select clinic location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredClinics.map((clinic) => (
                                                <SelectItem key={clinic.id} value={clinic.id}>
                                                    <div>
                                                        <div className="font-medium">{clinic.name}</div>
                                                        <div className="text-sm text-muted-foreground">{clinic.address}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <Button
                                onClick={handleNext}
                                disabled={!formData.doctorId || !formData.clinicId}
                                className="w-full"
                            >
                                Next: Select Date & Time
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Select Date & Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Appointment Date</Label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Time Slot
                                </Label>
                                <Select value={formData.time} onValueChange={(value) =>
                                    setFormData({ ...formData, time: value })
                                }>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="09:00">9:00 AM</SelectItem>
                                        <SelectItem value="10:00">10:00 AM</SelectItem>
                                        <SelectItem value="11:00">11:00 AM</SelectItem>
                                        <SelectItem value="14:00">2:00 PM</SelectItem>
                                        <SelectItem value="15:00">3:00 PM</SelectItem>
                                        <SelectItem value="16:00">4:00 PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Appointment Type</Label>
                                <Select value={formData.type} onValueChange={(value) =>
                                    setFormData({ ...formData, type: value })
                                }>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Check-up">Check-up</SelectItem>
                                        <SelectItem value="Consultation">Consultation</SelectItem>
                                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleBack} className="flex-1">
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!formData.date || !formData.time || !formData.type}
                                    className="flex-1"
                                >
                                    Next: Review & Confirm
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Review & Confirm */}
                {step === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Review & Confirm
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 p-4 bg-secondary/50 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Doctor</span>
                                    <span className="font-medium">
                                        {doctors.find(d => d.id === formData.doctorId)?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Clinic</span>
                                    <span className="font-medium">
                                        {clinics.find(c => c.id === formData.clinicId)?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Date</span>
                                    <span className="font-medium">{formData.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Time</span>
                                    <span className="font-medium">{formData.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Type</span>
                                    <span className="font-medium">{formData.type}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Notes (Optional)</Label>
                                <Textarea
                                    placeholder="Any specific concerns or information for the doctor..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleBack} className="flex-1">
                                    Back
                                </Button>
                                <Button onClick={handleSubmit} className="flex-1">
                                    Confirm Booking
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
