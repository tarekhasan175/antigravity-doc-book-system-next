import { Hero } from "@/components/home/Hero"
import { DoctorList } from "@/components/doctors/DoctorList"
import { Features } from "@/components/home/Features"
import { HowItWorks } from "@/components/home/HowItWorks"
import { ContactUs } from "@/components/home/ContactUs"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <DoctorList />
      <Newsletter />
      <ContactUs />
    </div>
  )
}
