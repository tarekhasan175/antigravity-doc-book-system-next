"use client"

import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubscribed(true)
        setEmail("")
        setIsSubmitting(false)

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000)
    }

    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8" />
                    </div>

                    <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-xl text-primary-foreground/80 mb-8">
                        Subscribe to our newsletter for health tips, special offers, and the latest updates from DocBook
                    </p>

                    {isSubscribed ? (
                        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-6 animate-in fade-in slide-in-from-top-4">
                            <p className="text-lg font-medium">✓ Successfully subscribed! Check your inbox.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
                            >
                                {isSubmitting ? "Subscribing..." : "Subscribe"}
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    )}

                    <p className="text-sm text-primary-foreground/60 mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}
