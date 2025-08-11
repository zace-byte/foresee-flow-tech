import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import WalletDashboard from "@/components/WalletDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {isLoggedIn ? (
        <WalletDashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default Index;
