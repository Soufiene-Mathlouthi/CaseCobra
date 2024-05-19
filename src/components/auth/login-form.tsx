"use client"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginSchema } from "../../../schemas"
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
import { login } from "@/app/auth/login/actions"

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('')
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error)
            })
        })
    }

    return (
        <CardWrapper headerLabel="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
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
                    <Button type="submit" disabled={isPending} className="w-full">
                        Login
                    </Button>
                </form>

            </Form>
        </CardWrapper>
    )
}