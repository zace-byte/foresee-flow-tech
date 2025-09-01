import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Wallet, Lock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userData: { phone: string; name: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication for testing
    if ((phone === "0061414491726" && password === "AAaa123456") || 
        (phone === "0064273173352" && password === "AAaa123456") ||
        (phone === "447703277077" && password === "AAaa123456") ||
        (phone === "00447817963523" && password === "AAaa123456")) {
      const userData = phone === "0061414491726" 
        ? { phone: "0061414491726", name: "Joanne Bernadette Savage" }
        : phone === "0064273173352" 
        ? { phone: "0064273173352", name: "Dorothy Glenys Smith" }
        : phone === "447703277077" 
        ? { phone: "447703277077", name: "Jan Kijowski" }
        : { phone: "00447817963523", name: "Jeremy Goose" };
        
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: "Welcome to Commercial Wallet سلام",
        });
        onLogin(userData);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Login Failed",
          description: "Invalid phone number or password",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-card-custom border-0">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Commercial Wallet سلام</h1>
          <p className="text-muted-foreground">Crypto Wallet</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            variant="premium"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

      </Card>
    </div>
  );
};

export default LoginForm;