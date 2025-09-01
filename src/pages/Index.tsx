import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import WalletDashboard from "@/components/WalletDashboard";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ phone: string; name: string } | null>(null);

  const handleLogin = (user: { phone: string; name: string }) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn && userData ? (
        <WalletDashboard onLogout={handleLogout} userData={userData} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      
      {/* Floating Telegram Chat Button */}
      <Button
        asChild
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary hover:bg-primary/90 z-50"
      >
        <a
          href="https://t.me/fatima_commercial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on Telegram"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default Index;
