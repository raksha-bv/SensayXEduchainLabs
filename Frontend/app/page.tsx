import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import CodeEditorDemo from "@/components/CodeEditorDemo";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import TutorialOnboarding from "@/components/TutorialOnboarding";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`relative min-h-screen ${inter.className} bg-black text-white`}
    >
      {/* Gradient background effect */}
      <div className="fixed top-0 right-0 w-full h-full z-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-violet-700 opacity-10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-500 opacity-10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <Navbar />
        <HeroSection />
        <CodeEditorDemo />
        <ServicesSection />
        <CTASection />
        <Footer />
      </div>

      {/* Tutorial Onboarding - only shows for new unauthenticated users */}
      <TutorialOnboarding />
    </main>
  );
}
