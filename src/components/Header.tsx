import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe, Home, MapPin, Users, Newspaper, Lightbulb, Map, Gift } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo-new.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullViewItems = [
    { name: "About", href: "#about" },
    { name: "Blogs", href: "#blogs" },
    { name: "Projects", href: "#projects" },
    { name: "Referral", href: "/referral" },
    { name: "Contact", href: "#contact" }
  ];

  const menuItems = [
    { name: "3D Tour", icon: Globe, href: "#3d-tour" },
    { name: "Ongoing Projects", icon: Home, href: "#projects" },
    { name: "Visit Samara", icon: MapPin, href: "#samara" },
    { name: "Contact Us", icon: Phone, href: "#contact" },
    { name: "Referral Program", icon: Gift, href: "/referral" },
    { name: "For Developers", icon: Users, href: "#developers" },
    { name: "News", icon: Newspaper, href: "#blogs" },
    { name: "Insights", icon: Lightbulb, href: "#insights" },
    { name: "Local Guides", icon: Map, href: "#guides" },
  ];

  return (
    <>
      {/* Dynamic Island Header */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'top-6 opacity-100' : '-top-24 opacity-0'
        }`}
      >
        <div className="bg-background/60 backdrop-blur-xl rounded-full px-6 py-3 border border-border/50 shadow-2xl">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Logo */}
            <a href="#home" className="flex items-center mr-4">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* Navigation Items */}
            {fullViewItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary font-medium text-sm px-4 py-2 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Menu Dropdown */}
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button className="text-foreground hover:text-primary font-medium text-sm px-4 py-2 transition-all duration-300 flex items-center">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-3 bg-background border shadow-xl z-[100] mt-2 rounded-2xl">
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const showDivider = index === 3 || index === 5;
                    return (
                      <div key={item.name}>
                        <DropdownMenuItem asChild className="cursor-pointer py-3 px-4 hover:bg-muted rounded-xl transition-colors">
                          <a href={item.href} className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground font-normal">{item.name}</span>
                          </a>
                        </DropdownMenuItem>
                        {showDivider && <div className="my-2 border-t border-border" />}
                      </div>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <a href="#home" className="flex items-center">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-8 w-auto object-contain"
              />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-background/60 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl w-[280px]">
            <nav className="flex flex-col p-6 space-y-4">
              {fullViewItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium text-sm py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t pt-4 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium"
                  onClick={() => window.location.href = 'tel:+918884545404'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  8884545404
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Floating Contact Button */}
      <div className="hidden sm:block fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-background/95 backdrop-blur-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-wider font-medium rounded-full shadow-lg"
          onClick={() => window.location.href = 'tel:+918884545404'}
        >
          <Phone className="w-4 h-4 mr-2" />
          <span>Call Us</span>
        </Button>
      </div>
    </>
  );
};

export default Header;
