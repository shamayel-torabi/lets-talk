import NavBar from "@/components/NavBar"
import React from "react"

const HomeLayout = async ({
    children
}: {
    children: React.ReactNode
}
) => {

    return (
        <main className="flex flex-col h-screen animate-fade-in">
            <NavBar />
            <section className="flex flex-col flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 overflow-y-auto ">
                <div className="w-full">
                    {children}
                </div>
            </section>
        </main>
    )

}

export default HomeLayout