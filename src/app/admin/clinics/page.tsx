import { ClinicManagement } from "@/components/admin/ClinicManagement"

export default function AdminClinicsPage() {
    return (
        <div className="min-h-screen bg-secondary/30 py-8">
            <div className="container mx-auto px-4 md:px-6">
                <ClinicManagement />
            </div>
        </div>
    )
}
