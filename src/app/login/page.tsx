import { CatIcon} from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <CatIcon className="size-10 text-green-400" />
          </div>
          KATVVK-Xem Phim Chất Lượng Cao
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
