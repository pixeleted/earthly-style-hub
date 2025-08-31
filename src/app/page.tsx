import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import ContentShowcase from "@/components/ContentShowcase";
import FooterNewsletter from "@/components/FooterNewsletter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />
      
      <main className="pt-14 md:pt-16">
        <HeroSection />
        <ContentShowcase />
      </main>
      
      <FooterNewsletter />
    </div>
  );
}