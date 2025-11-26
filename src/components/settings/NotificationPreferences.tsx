"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationPreferences() {
    const [preferences, setPreferences] = useState({
        emailConfirmation: true,
        emailReminder: true,
        smsConfirmation: false,
        smsReminder: true,
        pushNotifications: true,
        marketingEmails: false
    })

    const handleToggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold">Notification Preferences</h2>
                <p className="text-muted-foreground mt-1">
                    Manage how you receive updates about your appointments
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Email Notifications
                    </CardTitle>
                    <CardDescription>
                        Receive updates via email
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Appointment Confirmations</Label>
                            <p className="text-sm text-muted-foreground">
                                Get email when appointments are confirmed
                            </p>
                        </div>
                        <Switch
                            checked={preferences.emailConfirmation}
                            onCheckedChange={() => handleToggle('emailConfirmation')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Appointment Reminders</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive reminders 24 hours before appointments
                            </p>
                        </div>
                        <Switch
                            checked={preferences.emailReminder}
                            onCheckedChange={() => handleToggle('emailReminder')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">
                                Health tips and promotional offers
                            </p>
                        </div>
                        <Switch
                            checked={preferences.marketingEmails}
                            onCheckedChange={() => handleToggle('marketingEmails')}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        SMS Notifications
                    </CardTitle>
                    <CardDescription>
                        Receive text messages on your phone
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Appointment Confirmations</Label>
                            <p className="text-sm text-muted-foreground">
                                Get SMS when appointments are confirmed
                            </p>
                        </div>
                        <Switch
                            checked={preferences.smsConfirmation}
                            onCheckedChange={() => handleToggle('smsConfirmation')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Appointment Reminders</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive SMS reminders before appointments
                            </p>
                        </div>
                        <Switch
                            checked={preferences.smsReminder}
                            onCheckedChange={() => handleToggle('smsReminder')}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Push Notifications
                    </CardTitle>
                    <CardDescription>
                        Get instant notifications on your device
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Enable Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive real-time updates about your appointments
                            </p>
                        </div>
                        <Switch
                            checked={preferences.pushNotifications}
                            onCheckedChange={() => handleToggle('pushNotifications')}
                        />
                    </div>
                </CardContent>
            </Card>

            <Button className="w-full">Save Preferences</Button>
        </div>
    )
}
