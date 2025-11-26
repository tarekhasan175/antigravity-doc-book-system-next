import { Search, CalendarCheck, CheckCircle2 } from "lucide-react"

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Find Your Doctor",
        description: "Browse our network of verified specialists. Filter by specialty, location, and availability to find the perfect match."
    },
    {
        icon: CalendarCheck,
        number: "02",
        title: "Book Appointment",
        description: "Select your preferred clinic location, choose a convenient time slot, and complete your booking in minutes."
    },
    {
        icon: CheckCircle2,
        number: "03",
        title: "Get Confirmed",
        description: "Receive instant confirmation via email and SMS. Get reminders before your appointment so you never miss it."
    }
]

export function HowItWorks() {
    return (
        <section className="py-20 bg-secondary/30 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Get started in three simple steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                            )}

                            <div className="text-center relative z-10">
                                {/* Icon Circle */}
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center relative">
                                    <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                        {step.number}
                                    </div>
                                    <step.icon className="w-12 h-12 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
