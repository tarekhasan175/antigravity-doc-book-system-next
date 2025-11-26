"use client"

import { useState } from "react"
import { Building2, MapPin, Phone, Mail, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type Clinic = {
    id: string
    name: string
    address: string
    city: string
    state: string
    phone: string
    email?: string
    doctorCount: number
}

export function ClinicManagement() {
    const [clinics] = useState<Clinic[]>([
        {
            id: '1',
            name: 'Main Medical Center',
            address: '123 Health St',
            city: 'New York',
            state: 'NY',
            phone: '+1 (555) 123-4567',
            email: 'main@docbook.com',
            doctorCount: 15
        },
        {
            id: '2',
            name: 'Downtown Clinic',
            address: '456 Care Ave',
            city: 'New York',
            state: 'NY',
            phone: '+1 (555) 234-5678',
            email: 'downtown@docbook.com',
            doctorCount: 8
        },
        {
            id: '3',
            name: 'Westside Health',
            address: '789 Wellness Blvd',
            city: 'Los Angeles',
            state: 'CA',
            phone: '+1 (555) 345-6789',
            doctorCount: 12
        }
    ])

    const [showAddForm, setShowAddForm] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Clinic Management</h2>
                <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Clinic
                </Button>
            </div>

            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Clinic</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Clinic Name</Label>
                                <Input placeholder="Main Medical Center" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Address</Label>
                                <Input placeholder="123 Health Street" />
                            </div>
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="New York" />
                            </div>
                            <div className="space-y-2">
                                <Label>State</Label>
                                <Input placeholder="NY" />
                            </div>
                            <div className="space-y-2">
                                <Label>Email (Optional)</Label>
                                <Input type="email" placeholder="clinic@docbook.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>ZIP Code</Label>
                                <Input placeholder="10001" />
                            </div>
                            <div className="md:col-span-2 flex gap-2">
                                <Button type="submit">Save Clinic</Button>
                                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clinics.map((clinic) => (
                    <Card key={clinic.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-5 h-5 text-primary" />
                                    <CardTitle className="text-lg">{clinic.name}</CardTitle>
                                </div>
                                <Badge>{clinic.doctorCount} doctors</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p>{clinic.address}</p>
                                    <p className="text-muted-foreground">{clinic.city}, {clinic.state}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{clinic.phone}</span>
                            </div>
                            {clinic.email && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span>{clinic.email}</span>
                                </div>
                            )}
                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-2">
                                    <Edit className="w-3 h-3" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive gap-2">
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
