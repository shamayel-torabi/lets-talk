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
            <section className="flex flex-col flex-1 px-3 py-10 max-md:py-10 sm:px-10 overflow-y-auto ">
                <div className="w-full">
                    {children}
                </div>
            </section>
        </main>
    )

}

export default HomeLayout