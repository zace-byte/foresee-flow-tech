import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Bot, 
  Shield, 
  Zap, 
  BarChart3, 
  Target,
  TrendingUp,
  Lock,
  Smartphone
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Predictive Analytics",
      description: "Advanced machine learning models analyze vast market data to predict trends with 85% accuracy.",
      badge: "ML Powered",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Bot,
      title: "Automated Trading Bots",
      description: "Deploy intelligent trading strategies that work 24/7, executing trades based on your preferences.",
      badge: "24/7 Active",
      gradient: "from-bull to-success"
    },
    {
      icon: BarChart3,
      title: "Real-time Market Data",
      description: "Professional-grade charts with AI-powered trend lines and instant market sentiment analysis.",
      badge: "Live Data",
      gradient: "from-primary to-accent"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security with biometric authentication, AI fraud detection, and regulatory compliance.",
      badge: "Secure",
      gradient: "from-success to-bull"
    },
    {
      icon: Target,
      title: "Smart Risk Management",
      description: "AI analyzes your portfolio and suggests optimal risk-reward strategies for your trading style.",
      badge: "Risk AI",
      gradient: "from-destructive to-bear"
    },
    {
      icon: Zap,
      title: "Lightning Fast Execution",
      description: "Ultra-low latency trading with microsecond execution times for competitive advantage.",
      badge: "Ultra Fast",
      gradient: "from-primary-glow to-primary"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Detailed performance tracking with AI insights to improve your trading strategies over time.",
      badge: "Analytics",
      gradient: "from-bull to-primary"
    },
    {
      icon: Smartphone,
      title: "Mobile Trading",
      description: "Full-featured mobile app with all desktop capabilities, trade anywhere with confidence.",
      badge: "Mobile Ready",
      gradient: "from-accent to-primary"
    },
    {
      icon: Lock,
      title: "Regulatory Compliance",
      description: "Fully compliant with international trading regulations and financial security standards.",
      badge: "Compliant",
      gradient: "from-muted to-accent"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="mx-auto bg-primary/20 text-primary border-primary/30">
            <Zap className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Everything You Need to 
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Trade Like a Pro
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered trading platform combines cutting-edge technology with intuitive design 
            to give you the ultimate trading advantage.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-trading group hover:-translate-y-2"
            >
              <div className="space-y-4">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-20`}>
                    <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <Badge 
                    className="bg-primary/10 text-primary border-primary/20 text-xs"
                  >
                    {feature.badge}
                  </Badge>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1 bg-gradient-primary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to experience the future of trading?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-primary text-primary-foreground rounded-md font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-primary/30 text-primary rounded-md font-semibold hover:bg-primary/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;