import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Bot, Brain, Shield, Zap, BarChart3 } from "lucide-react";
import tradingHero from "@/assets/trading-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${tradingHero})` }}
      />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(214,100,60,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(214,100,60,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-30" />
      
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            <Badge className="mx-auto lg:mx-0 w-fit bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Trading Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Trade Smarter with
              <span className="block bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
                AI Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Experience the future of trading with UltraBrokers' AI-powered platform. 
              Advanced analytics, automated strategies, and real-time insights at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="premium" size="lg" className="group">
                Start Trading Now
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-bull">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Daily Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Features Grid */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-trading group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI Predictive Analytics</h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning models analyze market patterns and predict future trends with 85% accuracy.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-trading group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-bull/20 rounded-lg group-hover:bg-bull/30 transition-colors">
                  <Bot className="w-6 h-6 text-bull" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Automated Trading Bots</h3>
                  <p className="text-muted-foreground">
                    Deploy AI-driven strategies that execute trades 24/7 based on your risk preferences and market conditions.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-trading group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-time Analytics</h3>
                  <p className="text-muted-foreground">
                    Professional-grade charts with AI-powered trend lines and instant market sentiment analysis.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-trading group">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-success/20 rounded-lg group-hover:bg-success/30 transition-colors">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Bank-Grade Security</h3>
                  <p className="text-muted-foreground">
                    Biometric authentication, AI fraud detection, and regulatory compliance keep your assets secure.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-bull/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-primary-glow/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default HeroSection;