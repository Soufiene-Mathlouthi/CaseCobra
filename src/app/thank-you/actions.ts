"use server"

import { db } from "@/db"
import { auth } from "../../../auth"

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    const session = await auth()
    const user = session?.user

    if (!user?.id || !user.email) {
        throw new Error('You need to be logged in to view this page')
    }

    const order = await db.order.findFirst({
        where: {
            id: orderId,
            userId: user.id,
        },
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true
        }
    })

    if(!order) throw new Error('This order does not exist.')

    if(order.isPaid) {
        return order
    } else {
        return false
    }
}