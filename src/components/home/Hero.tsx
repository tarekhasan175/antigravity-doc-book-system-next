"use client"

import Link from "next/link"
import { Shield, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-secondary/30 pt-16 pb-24 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Trusted by 10,000+ Patients</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Perfect Doctor</span> & Book Instantly
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            Skip the waiting room. Connect with top-rated specialists in your area and manage your health journey with ease.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/#doctors">
                                <Button size="lg" className="rounded-2xl text-lg px-8 py-6 shadow-xl shadow-primary/20">
                                    Find a Doctor
                                </Button>
                            </Link>
                            <Link href="/appointments">
                                <Button variant="outline" size="lg" className="rounded-2xl text-lg px-8 py-6 bg-background">
                                    My Appointments
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="text-3xl font-bold">50+</p>
                                <p className="text-sm text-muted-foreground">Specialists</p>
                            </div>
                            <div className="w-px h-10 bg-border"></div>
                            <div>
                                <p className="text-3xl font-bold">24/7</p>
                                <p className="text-sm text-muted-foreground">Support</p>
                            </div>
                            <div className="w-px h-10 bg-border"></div>
                            <div>
                                <p className="text-3xl font-bold">4.9</p>
                                <p className="text-sm text-muted-foreground">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-3xl transform rotate-3 blur-2xl"></div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                            alt="Doctor Team"
                            className="relative rounded-3xl shadow-2xl border-4 border-background"
                        />

                        {/* Floating Card */}
                        <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border flex items-center gap-4 animate-bounce-slow">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Patient Satisfaction</p>
                                <p className="text-lg font-bold">98.5%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
