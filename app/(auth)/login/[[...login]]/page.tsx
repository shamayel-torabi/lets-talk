import { SignIn } from "@clerk/nextjs"

const LoginPage = () => {
    return <SignIn withSignUp={false} />
}

export default LoginPage