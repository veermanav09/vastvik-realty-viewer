import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo-new.png";

const Header = () => {
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

  const leftNavItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blogs", href: "#blogs" }
  ];

  const rightNavItems = [
    { name: "Referral", href: "/referral" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Header with Logo and Navigation */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'top-6 opacity-100' : '-top-24 opacity-0'
        }`}
      >
        <div className="bg-background/80 backdrop-blur-xl rounded-full px-6 py-2 border border-border/50 shadow-2xl">
          <nav className="flex items-center justify-between gap-8">
            {/* Left Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              {leftNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium text-sm transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <a href="#home" className="flex items-center">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-10 w-auto object-contain"
              />
            </a>

            {/* Right Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary font-medium text-sm"
              >
                Overview
              </Button>
              {rightNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium text-sm transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Floating Contact Button - Above Chatbot */}
      <div className="fixed bottom-28 right-6 z-40">
        <Button
          variant="outline"
          size="lg"
          className="bg-background/95 backdrop-blur-xl border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold rounded-full shadow-lg px-6"
          onClick={() => window.location.href = 'tel:+918884545404'}
        >
          <Phone className="w-5 h-5 mr-2" />
          <span>Get In Touch</span>
        </Button>
      </div>
    </>
  );
};

export default Header;
