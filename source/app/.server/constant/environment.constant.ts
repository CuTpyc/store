import { env } from "node:process"

export const environment = {
    users: {
        admin: {
            email: String(env.DEFAULT_ADMIN_EMAIL),
            password: String(env.DEFAULT_ADMIN_PASSWORD)
        }
    }
}