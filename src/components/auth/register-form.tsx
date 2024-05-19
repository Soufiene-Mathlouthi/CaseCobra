"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RegisterSchema } from "../../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormField
} from "@/components/ui/form"
import { useState, useTransition } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/app/auth/register/actions"
import {useRouter} from "next/navigation"

export const RegisterForm = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
        setTimeout(() => {
            router.push('/auth/login')
        }, 3000);
        
    }

    return (
        <CardWrapper headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} type="text" placeholder="Your full name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} type="email" placeholder="Email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} type="password" placeholder="Password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">
                        Create an account
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}