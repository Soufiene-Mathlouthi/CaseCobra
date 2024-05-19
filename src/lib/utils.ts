import { db } from "@/db"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(price)
}

export const getUserByEmail = async (email:string) => {
  try{
    const user = await db.user.findUnique({
      where: {email}
    })
    return user;
  } catch {
    return null
  }
}
export const getUserById = async (id:string) => {
  try{
    const user = await db.user.findUnique({
      where: {id}
    })
    return user;
  } catch {
    return null
  }
}