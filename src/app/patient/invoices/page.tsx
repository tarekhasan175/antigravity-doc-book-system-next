import { InvoiceList } from "@/components/payment/InvoiceList"

export default function InvoicesPage() {
    return (
        <div className="min-h-screen bg-secondary/30 py-8">
            <div className="container mx-auto px-4 md:px-6">
                <InvoiceList />
            </div>
        </div>
    )
}
