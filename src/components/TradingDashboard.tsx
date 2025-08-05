import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Brain,
  Target,
  Zap,
  AlertTriangle
} from "lucide-react";

const TradingDashboard = () => {
  const positions = [
    { symbol: "AAPL", shares: 150, price: 182.52, change: 2.45, changePercent: 1.36 },
    { symbol: "TSLA", shares: 50, price: 248.98, change: -8.23, changePercent: -3.20 },
    { symbol: "NVDA", shares: 25, price: 875.42, change: 15.67, changePercent: 1.82 },
    { symbol: "MSFT", shares: 100, price: 378.91, change: 4.82, changePercent: 1.29 },
  ];

  const aiInsights = [
    {
      type: "bullish",
      symbol: "AAPL",
      message: "Strong momentum detected - Consider increasing position",
      confidence: 87
    },
    {
      type: "bearish", 
      symbol: "TSLA",
      message: "Resistance level reached - Potential reversal incoming",
      confidence: 72
    },
    {
      type: "neutral",
      symbol: "SPY",
      message: "Market consolidation - Wait for breakout signal",
      confidence: 65
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Trading Dashboard</h1>
            <p className="text-muted-foreground">AI-powered insights and real-time portfolio management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="trading">
              <Target className="w-4 h-4 mr-2" />
              New Trade
            </Button>
            <Button variant="premium">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-card hover:shadow-card-custom transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold text-bull">$127,845.32</p>
                <p className="text-sm text-bull flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.8% Today
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-bull" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card-custom transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily P&L</p>
                <p className="text-2xl font-bold text-bull">+$3,284.67</p>
                <p className="text-sm text-bull flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.6%
                </p>
              </div>
              <Activity className="w-8 h-8 text-bull" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card-custom transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
                <p className="text-2xl font-bold text-primary">87.3%</p>
                <p className="text-sm text-success flex items-center mt-1">
                  <Brain className="w-4 h-4 mr-1" />
                  High Confidence
                </p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card-custom transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Trades</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-primary flex items-center mt-1">
                  <Zap className="w-4 h-4 mr-1" />
                  3 AI Automated
                </p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Positions */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-xl font-semibold mb-4">Current Positions</h2>
              <div className="space-y-3">
                {positions.map((position) => (
                  <div 
                    key={position.symbol}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{position.symbol}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{position.symbol}</p>
                        <p className="text-sm text-muted-foreground">{position.shares} shares</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${position.price}</p>
                      <div className={`flex items-center justify-end ${
                        position.change >= 0 ? 'text-bull' : 'text-bear'
                      }`}>
                        {position.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm">
                          {position.change >= 0 ? '+' : ''}{position.change} ({position.changePercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Insights */}
          <div>
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">AI Insights</h2>
                <Badge className="bg-primary/20 text-primary">Live</Badge>
              </div>
              
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-background/50 rounded-lg border-l-4 border-l-primary"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-primary">{insight.symbol}</span>
                      <Badge 
                        variant={insight.type === 'bullish' ? 'default' : 'secondary'}
                        className={
                          insight.type === 'bullish' 
                            ? 'bg-bull/20 text-bull' 
                            : insight.type === 'bearish'
                            ? 'bg-bear/20 text-bear'
                            : 'bg-neutral/20 text-neutral'
                        }
                      >
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="premium">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View All Alerts
              </Button>
            </Card>
          </div>
        </div>

        {/* Market Chart Placeholder */}
        <Card className="p-6 bg-gradient-card">
          <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
          <div className="h-64 bg-background/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Advanced trading charts with AI trend analysis</p>
              <p className="text-sm text-muted-foreground mt-2">Coming soon in full implementation</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TradingDashboard;