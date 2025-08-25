import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import WalletDashboard from "@/components/WalletDashboard";

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
    </div>
  );
};

export default Index;
