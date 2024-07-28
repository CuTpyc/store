import bcryptjs from "bcryptjs"
import { environment } from "../constant/environment.constant"

export const hashPassword = async (password: string): Promise<string> => {
    return bcryptjs.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return bcryptjs.compare(password, hash)

}