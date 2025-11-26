import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Languages, Clock, User, Star, CheckCircle, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DOCTORS } from "@/lib/data"

export default async function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const doctor = DOCTORS.find((d) => d.id === id)

    if (!doctor) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-secondary/30 py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 overflow-hidden">
                            <CardContent className="p-6">
                                <div className="relative mb-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                                    />
                                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-bold">{doctor.rating}</span>
                                    </div>
                                </div>

                                <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
                                <p className="text-primary font-medium mb-4">{doctor.specialty}</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <MapPin className="w-5 h-5 text-muted-foreground/70" />
                                        <span>New York Medical Center</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Languages className="w-5 h-5 text-muted-foreground/70" />
                                        <span>{doctor.languages.join(', ')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Clock className="w-5 h-5 text-muted-foreground/70" />
                                        <span>{doctor.availability}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl mb-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Consultation Fee</p>
                                        <p className="text-xl font-bold">{doctor.price}</p>
                                    </div>
                                    <div className="h-8 w-px bg-border"></div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Experience</p>
                                        <p className="text-xl font-bold">{doctor.experience}</p>
                                    </div>
                                </div>

                                <Link href={`/book?doctorId=${doctor.id}`} className="w-full">
                                    <Button className="w-full py-6 text-lg shadow-lg shadow-primary/20">
                                        Book Appointment
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <Card>
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {doctor.bio}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <p className="text-2xl font-bold">{doctor.patients}</p>
                                    <p className="text-sm text-muted-foreground">Happy Patients</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-2xl font-bold">{doctor.rating}</p>
                                    <p className="text-sm text-muted-foreground">Rating</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-2xl font-bold">{doctor.reviews}</p>
                                    <p className="text-sm text-muted-foreground">Reviews</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Education & Experience */}
                        <Card>
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-6">Education & Training</h2>
                                <div className="space-y-6">
                                    {doctor.education.map((edu, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                                                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">{edu}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
