import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { NavigationMenuMain } from "./components/Navigation";

import { GalleryVerticalEnd } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">

            <div className="flex gap-14 items-center font-semibold">
              <div className="flex justify-center gap-2 md:justify-start">
                <a href="/" className="flex items-center gap-2 font-medium">
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                  <NavigationMenuMain />
                  <ThemeSwitcher />
              </div>
            </div>
            
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
