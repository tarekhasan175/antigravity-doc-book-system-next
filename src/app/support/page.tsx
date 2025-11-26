"use client"

import { useState, useEffect } from "react"
import { Activity, Heart, Moon, Flame, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AIService, SymptomCheckResult } from "@/lib/services/ai"
import { WearableService, HealthMetrics } from "@/lib/services/wearable"

export default function SupportPage() {
    // Symptom Checker State
    const [symptoms, setSymptoms] = useState("")
    const [isChecking, setIsChecking] = useState(false)
    const [results, setResults] = useState<SymptomCheckResult[]>([])

    // Wearable Data State
    const [metrics, setMetrics] = useState<HealthMetrics | null>(null)
    const [isLoadingMetrics, setIsLoadingMetrics] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await WearableService.getMetrics("user-123")
                setMetrics(data)
            } catch (error) {
                console.error("Failed to fetch metrics", error)
            } finally {
                setIsLoadingMetrics(false)
            }
        }
        fetchMetrics()
    }, [])

    const handleCheckSymptoms = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!symptoms.trim()) return

        setIsChecking(true)
        try {
            const data = await AIService.checkSymptoms(symptoms)
            setResults(data)
        } catch (error) {
            console.error("Failed to check symptoms", error)
        } finally {
            setIsChecking(false)
        }
    }

    return (
        <div className="min-h-screen bg-secondary/30 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-12">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">AI Health Support</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powered by advanced AI to help you understand your symptoms and track your health metrics.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* AI Symptom Checker */}
                    <Card className="h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Activity className="h-6 w-6 text-primary" />
                                <CardTitle>AI Symptom Checker</CardTitle>
                            </div>
                            <CardDescription>
                                Describe your symptoms to get an instant preliminary analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form onSubmit={handleCheckSymptoms} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="symptoms">What are you feeling?</Label>
                                    <Input
                                        id="symptoms"
                                        placeholder="e.g., severe headache and fever..."
                                        value={symptoms}
                                        onChange={(e) => setSymptoms(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isChecking || !symptoms.trim()}>
                                    {isChecking ? "Analyzing..." : "Check Symptoms"}
                                </Button>
                            </form>

                            {results.length > 0 && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <h3 className="font-semibold text-lg">Analysis Results</h3>
                                    {results.map((result, index) => (
                                        <div key={index} className="bg-secondary/50 p-4 rounded-xl border">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-primary">{result.condition}</h4>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${parseInt(result.probability) > 70 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {result.probability} Match
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <p>This is an AI-generated assessment and not a medical diagnosis. Please consult a doctor.</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Wearable Device Integration */}
                    <Card className="h-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Heart className="h-6 w-6 text-red-500" />
                                <CardTitle>Live Health Metrics</CardTitle>
                            </div>
                            <CardDescription>
                                Real-time data synced from your connected wearable device.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoadingMetrics ? (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-muted-foreground animate-pulse">Syncing device...</p>
                                </div>
                            ) : metrics ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                                        <Heart className="h-8 w-8 text-red-500 mb-2" />
                                        <span className="text-3xl font-bold">{metrics.heartRate}</span>
                                        <span className="text-sm text-muted-foreground">BPM</span>
                                    </div>
                                    <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                                        <Activity className="h-8 w-8 text-blue-500 mb-2" />
                                        <span className="text-3xl font-bold">{metrics.steps.toLocaleString()}</span>
                                        <span className="text-sm text-muted-foreground">Steps</span>
                                    </div>
                                    <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                                        <Moon className="h-8 w-8 text-purple-500 mb-2" />
                                        <span className="text-3xl font-bold">{metrics.sleepHours}h</span>
                                        <span className="text-sm text-muted-foreground">Sleep</span>
                                    </div>
                                    <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                                        <Flame className="h-8 w-8 text-orange-500 mb-2" />
                                        <span className="text-3xl font-bold">{metrics.caloriesBurned}</span>
                                        <span className="text-sm text-muted-foreground">Calories</span>
                                    </div>

                                    <div className="col-span-2 mt-4 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>Last synced: {new Date(metrics.lastSync).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p>No device connected.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
