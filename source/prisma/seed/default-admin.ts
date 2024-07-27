import type { PrismaClient } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { environment } from "~/.server/constant/environment.constant";
import { hashPassword } from "~/.server/utils/auth.util";

export const createDefaultAdmin = async (prisma: PrismaClient) => {
    const user = await prisma.user.findFirst({where: {email: environment.users.admin.email}})
    
    if (user){
        return;
    }

    await prisma.user.create({
        data: {
            fullName: 'Admin',
            email: environment.users.admin.email,
            password: await hashPassword(environment.users.admin.password),
            role: $Enums.AdminRole.ADMIN
        }
    })
}