import PublicHeader from "@/components/layout/public-header.layout";
import PublicFooter from "@/components/layout/public-footer.layout";
import Hero from "@/components/shared/hero.shared";
import Services from "@/components/layout/services.layout";
import Features from "@/components/shared/features.shared";
import AboutUs from "@/components/shared/about-us.shared";
import { useCallback } from "react";

const Homepage = () => {
  const formattedWebsiteCall = useCallback((name: string) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  const websiteName = formattedWebsiteCall(import.meta.env.VITE_WEBSITE_NAME);

  return (
    <div
      style={{
        background: "#f8f6f1",
        color: "#1a1a2e",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>
      <PublicHeader />
      <Hero websiteName={websiteName} />
      <Services />
      <Features />
      <AboutUs websiteName={websiteName} />
      <PublicFooter websiteName={websiteName} />
    </div>
  );
};

export default Homepage;
