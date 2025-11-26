"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, MapPin, Languages, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DOCTORS } from "@/lib/data"

export function DoctorList() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSpecialty, setSelectedSpecialty] = useState("all")
    const [currentIndex, setCurrentIndex] = useState(0)

    const specialties = ["all", ...new Set(DOCTORS.map(d => d.specialty))]

    const filteredDoctors = DOCTORS.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty
        return matchesSearch && matchesSpecialty
    })

    const itemsPerPage = 3
    const maxIndex = Math.max(0, filteredDoctors.length - itemsPerPage)

    const handlePrev = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    }

    const visibleDoctors = filteredDoctors.slice(currentIndex, currentIndex + itemsPerPage)

    return (
        <section id="doctors" className="py-20 bg-background transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Find Your Doctor</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Browse our network of verified specialists
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                        <Input
                            placeholder="Search by name or specialty..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentIndex(0)
                            }}
                            className="flex-1"
                        />
                        <Select value={selectedSpecialty} onValueChange={(value) => {
                            setSelectedSpecialty(value)
                            setCurrentIndex(0)
                        }}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                {specialties.map(specialty => (
                                    <SelectItem key={specialty} value={specialty}>
                                        {specialty === "all" ? "All Specialties" : specialty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {filteredDoctors.length > 0 ? (
                    <div className="relative max-w-6xl mx-auto">
                        {/* Navigation Buttons */}
                        {filteredDoctors.length > itemsPerPage && (
                            <>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full shadow-lg disabled:opacity-30"
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full shadow-lg disabled:opacity-30"
                                    onClick={handleNext}
                                    disabled={currentIndex >= maxIndex}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </>
                        )}

                        {/* Doctor Cards Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {visibleDoctors.map((doctor) => (
                                <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="relative mb-4">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={doctor.image}
                                                    alt={doctor.name}
                                                    className="w-full aspect-square object-cover rounded-2xl"
                                                />
                                                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-sm font-bold">{doctor.rating}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-1">{doctor.name}</h3>
                                            <p className="text-primary font-medium mb-3">{doctor.specialty}</p>

                                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{doctor.experience}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Languages className="w-4 h-4" />
                                                    <span>{doctor.languages.join(", ")}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <span className="text-lg font-bold text-primary">{doctor.price}</span>
                                                <Button size="sm">Book Now</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {/* Dots Indicator */}
                        {filteredDoctors.length > itemsPerPage && (
                            <div className="flex justify-center gap-2 mt-8">
                                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No doctors found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
