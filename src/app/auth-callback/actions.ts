"use server"

import { db } from "@/db"
import { auth } from "../../../auth"

export const getAuthStatus = async () => {
    const session = await auth()
    const user = session?.user

    if (!user?.id || !user.email) {
        throw new Error('Invalid user data')
    }
    const existingUser = await db.user.findFirst({
        where: { id: user.id }
    })

    if (!existingUser) {
        await db.user.create({
            data: {
                id: user.id,
                email: user.email,
                password: "123456789"
            }
        })
    }

    return { success: true }

}
