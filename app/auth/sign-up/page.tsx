import { Zap } from "lucide-react"
import { SignUpForm } from "@/components/sign-up-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-[#0f172a]">
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center">
        <div className="flex justify-center gap-2 md:justify-start mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl">
            <Zap className="h-6 w-6 text-purple-500" />
            ZapPOD
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-gray-900 lg:block overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-purple-900/40 z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-gray-900 to-gray-950 blur-3xl" />
        <div className="relative z-20 flex h-full flex-col items-center justify-center p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Free Trial</h2>
          <p className="text-gray-400 max-w-md">
            No credit card required. Get instant access to AI design tools and SEO generators.
          </p>
        </div>
      </div>
    </div>
  )
}
