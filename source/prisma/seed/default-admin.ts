import type { PrismaClient } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { environment } from "~/.server/constant/environment.constant";

export const createDefaultAdmin = async (prisma: PrismaClient) => {
    const user = await prisma.user.findFirst({where: {email: environment.users.admin.email}})
    
    if (user){
        return;
    }

    await prisma.user.create({
        data: {
            fullName: 'Admin',
            email: environment.users.admin.email,
            password: environment.users.admin.password,
            role: $Enums.AdminRole.ADMIN
        }
    })
}