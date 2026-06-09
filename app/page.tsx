import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import SkillsMarquee from "@/components/SkillsMarquee";
import ResearchPapers from "@/components/ResearchPapers";
import ManagementApproaches from "@/components/ManagementApproaches";
import Projects from "@/components/Projects";
import BentoShowcase from "@/components/BentoShowcase";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 selection:bg-blue-500/30 selection:text-blue-200">
      <ScrollReveal />
      <Navbar />
      <Hero />
      <SkillsMarquee />
      <ResearchPapers />
      <Projects />
      <ManagementApproaches />
      <BentoShowcase />
      <ContactForm />
      <Footer />
    </div>
  );
}
