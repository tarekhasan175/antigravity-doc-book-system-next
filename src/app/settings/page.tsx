import { NotificationPreferences } from "@/components/settings/NotificationPreferences"

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-secondary/30 py-8">
            <div className="container mx-auto px-4 md:px-6">
                <NotificationPreferences />
            </div>
        </div>
    )
}
