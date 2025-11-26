"use client"

import { useState } from "react"
import { Users, Calendar, DollarSign, Activity, TrendingUp, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/UserManagement"
import { ContentManager } from "@/components/admin/ContentManager"
import { AppointmentOversight } from "@/components/admin/AppointmentOversight"
import { SystemSettings } from "@/components/admin/SystemSettings"

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-secondary/30 py-8 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,345</div>
                            <p className="text-xs text-muted-foreground">+180 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">+201 since last hour</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">48</div>
                            <p className="text-xs text-muted-foreground">+2 new this week</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">+19% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Analytics Chart */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Revenue & Appointments Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center text-muted-foreground">
                                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p>Chart Visualization Placeholder</p>
                                <p className="text-sm">Integrate with Chart.js or Recharts</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Management Tabs */}
                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                        <UserManagement />
                    </TabsContent>

                    <TabsContent value="content">
                        <ContentManager />
                    </TabsContent>

                    <TabsContent value="appointments">
                        <AppointmentOversight />
                    </TabsContent>

                    <TabsContent value="settings">
                        <SystemSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
