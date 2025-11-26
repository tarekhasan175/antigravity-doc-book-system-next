import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30">
            <div className="text-center space-y-6 p-8">
                <ShieldAlert className="h-24 w-24 mx-auto text-destructive" />
                <h1 className="text-4xl font-bold">Unauthorized Access</h1>
                <p className="text-muted-foreground text-lg max-w-md">
                    You don't have permission to access this page. Please contact an administrator if you believe this is an error.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button>Go Home</Button>
                    </Link>
                    <Link href="/auth/signin">
                        <Button variant="outline">Sign In</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
