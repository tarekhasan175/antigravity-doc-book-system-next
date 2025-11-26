import { Calendar, Shield, Clock, CreditCard, Bell, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
    {
        icon: Calendar,
        title: "Easy Booking",
        description: "Book appointments in just a few clicks. Choose your preferred doctor, clinic, and time slot.",
        color: "text-blue-600 dark:text-blue-400"
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your medical data is encrypted and protected with industry-standard security measures.",
        color: "text-green-600 dark:text-green-400"
    },
    {
        icon: Clock,
        title: "24/7 Access",
        description: "Book appointments anytime, anywhere. Our platform is always available for you.",
        color: "text-purple-600 dark:text-purple-400"
    },
    {
        icon: CreditCard,
        title: "Easy Payments",
        description: "Secure payment processing with multiple options including credit cards and insurance.",
        color: "text-orange-600 dark:text-orange-400"
    },
    {
        icon: Bell,
        title: "Smart Reminders",
        description: "Get timely reminders via email and SMS so you never miss an appointment.",
        color: "text-pink-600 dark:text-pink-400"
    },
    {
        icon: Users,
        title: "Top Specialists",
        description: "Access to 50+ verified doctors across multiple specialties and locations.",
        color: "text-cyan-600 dark:text-cyan-400"
    }
]

export function Features() {
    return (
        <section className="py-20 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose DocBook?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to manage your healthcare appointments in one place
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-2 hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
