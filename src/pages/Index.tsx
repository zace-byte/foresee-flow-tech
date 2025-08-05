import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TradingDashboard from "@/components/TradingDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <div className="border-t border-border">
        <TradingDashboard />
      </div>
    </div>
  );
};

export default Index;
