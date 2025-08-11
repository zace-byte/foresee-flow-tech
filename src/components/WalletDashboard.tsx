import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Send,
  Download,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react";

interface WalletDashboardProps {
  onLogout: () => void;
}

const WalletDashboard = ({ onLogout }: WalletDashboardProps) => {
  const [btcPrice, setBtcPrice] = useState(67420.50); // Mock BTC price
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const btcBalance = 1.5;
  const usdValue = btcBalance * btcPrice;

  // Mock price fluctuation for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 1000; // Random change up to ±$500
      setBtcPrice(prev => Math.max(0, prev + change));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { id: "1", type: "received", amount: 0.5, date: "2024-01-15", hash: "1A1zP1..." },
    { id: "2", type: "sent", amount: 0.2, date: "2024-01-14", hash: "1BvBMS..." },
    { id: "3", type: "received", amount: 1.2, date: "2024-01-13", hash: "1Df6HJ..." }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Johns Coinbase</h1>
              <p className="text-muted-foreground">zz477496@gmail.com</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="p-6 bg-gradient-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-lg font-semibold">Bitcoin Balance</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                >
                  {isBalanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
              
              {isBalanceVisible ? (
                <>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {btcBalance} BTC
                  </p>
                  <p className="text-xl text-muted-foreground">
                    ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold text-primary mb-1">••••••</p>
                  <p className="text-xl text-muted-foreground">••••••••</p>
                </>
              )}
            </div>
            
            <div className="text-right">
              <Badge className="bg-primary/20 text-primary mb-2">
                Live Price
              </Badge>
              <p className="text-lg font-semibold">
                ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button className="flex-1" variant="premium">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button className="flex-1" variant="trading">
              <Download className="w-4 h-4 mr-2" />
              Receive
            </Button>
            <Button variant="ghost">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 bg-gradient-card">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'received' ? 'bg-bull/20' : 'bg-bear/20'
                  }`}>
                    {tx.type === 'received' ? (
                      <TrendingUp className={`w-5 h-5 text-bull`} />
                    ) : (
                      <TrendingDown className={`w-5 h-5 text-bear`} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold capitalize">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    tx.type === 'received' ? 'text-bull' : 'text-bear'
                  }`}>
                    {tx.type === 'received' ? '+' : '-'}{tx.amount} BTC
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.hash}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p className="text-lg font-bold text-bull">+$2,340.50</p>
              <p className="text-sm text-bull">+3.6%</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-lg font-bold">${usdValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-primary">1 Asset</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;