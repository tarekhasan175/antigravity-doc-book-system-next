import Link from "next/link"
import { Activity, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t pt-16 pb-8 transition-colors duration-300 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Activity className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">DocBook</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Connecting patients with the best healthcare professionals. Book appointments instantly and manage your health journey.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/#doctors" className="hover:text-primary transition-colors">Find a Doctor</Link></li>
                            <li><Link href="/appointments" className="hover:text-primary transition-colors">My Appointments</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Services</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Cardiology</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Dermatology</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pediatrics</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Neurology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>123 Medical Center Dr,<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>support@docbook.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} DocBook. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
