import { SignUp } from "@clerk/nextjs"
import Image from "next/image"

const RegisterPage = () => {
    return (
        <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
            <section className="flex flex-col items-center">
                <Image
                    src='/assets/logo.svg'
                    width={100}
                    height={100}
                    alt="Logo"
                />
                <h1 className="text-lg font-extrabold text-sky-1 lg:text-2xl">
                بصورت زنده با دوستان و خویشاوندان خود نشست ویدئویی برگذار کنید !
                </h1>

            </section>
            <div className="mt-3">
                <SignUp />
            </div>
        </main>
    )
}

export default RegisterPage
