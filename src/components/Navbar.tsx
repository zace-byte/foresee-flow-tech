import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  User, 
  Settings, 
  Bell,
  Search,
  Menu
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">UltraBrokers</span>
              <Badge className="bg-primary/20 text-primary text-xs">AI</Badge>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#trading" className="text-foreground hover:text-primary transition-colors">
              Trading
            </a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#analytics" className="text-foreground hover:text-primary transition-colors">
              AI Analytics
            </a>
            <a href="#markets" className="text-foreground hover:text-primary transition-colors">
              Markets
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="pl-10 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary w-48"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-bull rounded-full"></span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button variant="premium" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;