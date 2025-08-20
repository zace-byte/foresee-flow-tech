import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  Send,
  Download,
  Eye,
  EyeOff,
  LogOut,
  Copy
} from "lucide-react";

interface WalletDashboardProps {
  onLogout: () => void;
}

const WalletDashboard = ({ onLogout }: WalletDashboardProps) => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const btcBalance = 5;
  const usdValue = btcBalance * btcPrice;

  // Fetch real BTC price
  const fetchBtcPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await response.json();
      setBtcPrice(data.bitcoin.usd);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching BTC price:', error);
      setBtcPrice(67420.50); // Fallback price
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBtcPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchBtcPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { 
      id: "8", 
      type: "received", 
      amount: 0.5, 
      date: "2025-08-20", 
      time: "14:22",
      hash: "bc1qab..." 
    },
    { 
      id: "7", 
      type: "received", 
      amount: 0.3, 
      date: "2025-08-20", 
      time: "11:37",
      hash: "bc1qzx..." 
    },
    { 
      id: "6", 
      type: "received", 
      amount: 1.2, 
      date: "2025-08-19", 
      time: "16:45",
      hash: "bc1qcd..." 
    },
    { 
      id: "5", 
      type: "received", 
      amount: 0.75, 
      date: "2025-08-19", 
      time: "09:12",
      hash: "bc1qef..." 
    },
    { 
      id: "4", 
      type: "received", 
      amount: 0.65, 
      date: "2025-08-18", 
      time: "20:33",
      hash: "bc1qgh..." 
    },
    { 
      id: "3", 
      type: "received", 
      amount: 0.8, 
      date: "2025-08-18", 
      time: "15:21",
      hash: "bc1qij..." 
    },
    { 
      id: "2", 
      type: "received", 
      amount: 0.45, 
      date: "2025-08-17", 
      time: "12:08",
      hash: "bc1qkl..." 
    },
    { 
      id: "1", 
      type: "received", 
      amount: 0.35, 
      date: "2025-08-17", 
      time: "08:14",
      hash: "bc1qmn..." 
    }
  ];

  const depositAddress = "bc1qhvley3tp7rs0fs8w867jw0t5ufsnmazg9djutu";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Address has been copied successfully",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

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
              <h1 className="text-2xl font-bold">Coinbase Wallet</h1>
              <p className="text-muted-foreground">0061414491726</p>
              <p className="text-sm text-muted-foreground">mark test</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="p-6 shadow-card-custom border-0">
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
                {isLoading ? 'Loading...' : `$${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button 
              className="flex-1" 
              variant="premium"
              onClick={() => setIsSendDialogOpen(true)}
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button 
              className="flex-1" 
              variant="trading"
              onClick={() => setIsReceiveDialogOpen(true)}
            >
              <Download className="w-4 h-4 mr-2" />
              Receive
            </Button>
            <Button variant="ghost">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 shadow-card-custom border-0">
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
                    <p className="text-sm text-muted-foreground">
                      {tx.date} {tx.time && `at ${tx.time}`}
                    </p>
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
            <Card className="p-4 shadow-card-custom border-0">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <p className="text-lg font-bold text-bull">+$2,340.50</p>
              <p className="text-sm text-bull">+3.6%</p>
            </div>
          </Card>
          
          <Card className="p-4 shadow-card-custom border-0">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-lg font-bold">${usdValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-primary">1 Asset</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Send Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdrawal Notice</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-lg text-muted-foreground">
              Minimum withdrawal is <span className="font-bold text-primary">460.10 BTC</span>
            </p>
            <p className="text-muted-foreground mt-2">
              Please top up to be able to withdraw.
            </p>
          </div>
          <Button onClick={() => setIsSendDialogOpen(false)} className="w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Deposit Address</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-lg text-muted-foreground">
              Please enter the BTC address in the code
            </p>
          </div>
          <Button onClick={() => setIsReceiveDialogOpen(false)} className="w-full">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletDashboard;