import StreamProvider from "@/providers/StreamProvider"
import { SignIn } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import React from "react"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}
) => {

    const user = await currentUser()
    if (!user) return (
        <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
            <section className="flex flex-col items-center">
                <Image
                    src='/assets/logo.svg'
                    width={100}
                    height={100}
                    alt="Logo"
                />
                <h1 className="text-lg font-extrabold text-sky-1 lg:text-2xl">
                    ارتباط ، مکالمه و تعامل بصورت زنده
                </h1>

            </section>

            <div className="mt-3">
                <SignIn />
            </div>
        </main>
    )

    return (
        <main className="animate-fade-in">
            <StreamProvider>
                {children}
            </StreamProvider>
        </main>
    )

}

export default MainLayout