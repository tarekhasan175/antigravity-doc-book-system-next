import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: string
            patientId?: string
            doctorId?: string
        } & DefaultSession["user"]
    }

    interface User {
        role: string
        patientId?: string
        doctorId?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: string
        patientId?: string
        doctorId?: string
    }
}
