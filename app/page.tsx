import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { InteractiveSandbox } from "@/components/landing/InteractiveSandbox";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { SimpleWorkflowSection } from "@/components/landing/SimpleWorkflowSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <LandingNavbar />
      <main>
        <HeroSection />
        <InteractiveSandbox />
        <FeaturesSection />
        <TemplatesSection />
        <SimpleWorkflowSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
