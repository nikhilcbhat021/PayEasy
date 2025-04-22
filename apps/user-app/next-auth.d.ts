import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        email?: string
        number?: number
        provider?: string
    }

    interface Session {
        user: User & DefaultSession["user"]
        expires: string
        error: string
    }
}