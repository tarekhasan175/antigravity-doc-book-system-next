"use client"

import { useState } from "react"
import { Settings, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContentManager() {
    const [specialties] = useState(['Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics'])
    const [clinics] = useState(['Main Clinic', 'Downtown Branch', 'Westside Medical'])

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Specialties
                        </CardTitle>
                        <Button size="sm" className="gap-2">
                            <Plus className="w-3 h-3" />
                            Add
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {specialties.map((specialty, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span>{specialty}</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Clinics
                        </CardTitle>
                        <Button size="sm" className="gap-2">
                            <Plus className="w-3 h-3" />
                            Add
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {clinics.map((clinic, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                <span>{clinic}</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Pricing Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Base Consultation Fee</Label>
                            <Input type="number" defaultValue="150" />
                        </div>
                        <div className="space-y-2">
                            <Label>Booking Fee</Label>
                            <Input type="number" defaultValue="5" />
                        </div>
                        <div className="space-y-2">
                            <Label>Cancellation Fee</Label>
                            <Input type="number" defaultValue="25" />
                        </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    )
}
