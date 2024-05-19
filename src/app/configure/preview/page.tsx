import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'
import DesignPreview from './DesignPreview'
import { SessionProvider } from 'next-auth/react'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const Page = async ({ searchParams }: PageProps) => {

    const { id } = searchParams
    if (!id || typeof id !== "string") {
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where: { id },
    })

    if (!configuration) {
        return notFound()
    }

    return <SessionProvider><DesignPreview configuration={configuration} /></SessionProvider>
}

export default Page