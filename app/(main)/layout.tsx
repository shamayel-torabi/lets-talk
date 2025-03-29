import StreamProvider from "@/providers/StreamProvider"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}
) => {

    const user = await currentUser();

    if (!user) {
        redirect('/login')
    }

    return (
        <>
            <StreamProvider>
                {children}
            </StreamProvider>
        </>
    )
}

export default MainLayout