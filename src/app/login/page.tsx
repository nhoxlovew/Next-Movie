import { CatIcon } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <CatIcon className="size-10 text-green-400" />
            </div>
            <div className="pl-2">
            Acme Inc.
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md flex items-center justify-center">
            <LoginForm className="w-xs" />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <CatIcon className="size-2/3 text-green-400 inset-0 absolute m-auto" />
        {/* <div className="relative inset-0 flex flex-col items-center justify-center pt-50 text-center">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <h2 className="text-2xl font-semibold">Please log in to your account</h2>
          <h3 className="text-lg">We missed you!</h3>
        </div> */}
      </div>
    </div>
  )
}


