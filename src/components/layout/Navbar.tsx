"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Activity, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const isActive = (path: string) => pathname === path

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                            <Activity className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                            DocBook
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/appointments"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/appointments") ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            My Appointments
                        </Link>

                        {/* Demo Links */}
                        <Link
                            href="/doctor/dashboard"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/doctor/dashboard") ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            Doctor
                        </Link>
                        <Link
                            href="/admin"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/admin") ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            Admin
                        </Link>
                        <Link
                            href="/support"
                            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/support") ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            AI Support
                        </Link>

                        <div className="h-6 w-px bg-border mx-2"></div>

                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="rounded-full"
                                aria-label="Toggle Theme"
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>
                        )}

                        <Link href="/#doctors">
                            <Button className="rounded-full shadow-lg shadow-primary/20">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="rounded-full"
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        <Link
                            href="/"
                            className="block text-sm font-medium py-2 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/appointments"
                            className="block text-sm font-medium py-2 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            My Appointments
                        </Link>
                        <Link
                            href="/doctor/dashboard"
                            className="block text-sm font-medium py-2 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Doctor Dashboard
                        </Link>
                        <Link
                            href="/admin"
                            className="block text-sm font-medium py-2 hover:text-primary"
                            onClick={() => setIsOpen(false)}
                        >
                            Admin Dashboard
                        </Link>
                        <Link href="/#doctors" onClick={() => setIsOpen(false)}>
                            <Button className="w-full rounded-full mt-4">
                                Book Now
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
