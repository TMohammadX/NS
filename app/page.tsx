import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
