"use client"

import { useState } from "react"
import { Users, Edit, Trash2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type User = {
    id: string
    name: string
    email: string
    role: 'patient' | 'doctor'
    status: 'active' | 'inactive'
    joinedDate: string
}

export function UserManagement() {
    const [users] = useState<User[]>([
        { id: '1', name: 'John Doe', email: 'john@email.com', role: 'patient', status: 'active', joinedDate: '2024-01-15' },
        { id: '2', name: 'Dr. Sarah Johnson', email: 'sarah@email.com', role: 'doctor', status: 'active', joinedDate: '2023-11-20' },
        { id: '3', name: 'Alice Smith', email: 'alice@email.com', role: 'patient', status: 'active', joinedDate: '2024-02-10' },
        { id: '4', name: 'Dr. Michael Chen', email: 'michael@email.com', role: 'doctor', status: 'inactive', joinedDate: '2023-09-05' },
    ])

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        User Management
                    </CardTitle>
                    <Button className="gap-2">
                        <UserPlus className="w-4 h-4" />
                        Add User
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3 font-semibold">Name</th>
                                <th className="text-left p-3 font-semibold">Email</th>
                                <th className="text-left p-3 font-semibold">Role</th>
                                <th className="text-left p-3 font-semibold">Status</th>
                                <th className="text-left p-3 font-semibold">Joined</th>
                                <th className="text-right p-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-secondary/50 transition-colors">
                                    <td className="p-3 font-medium">{user.name}</td>
                                    <td className="p-3 text-muted-foreground">{user.email}</td>
                                    <td className="p-3">
                                        <Badge variant={user.role === 'doctor' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{user.joinedDate}</td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
