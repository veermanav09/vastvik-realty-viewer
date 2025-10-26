import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo-black.png";

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
        <div className="bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-2xl px-6 py-2 border border-white/20 shadow-xl">
          <nav className="flex items-center justify-between gap-8">
            {/* Left Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              {leftNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-secondary font-medium text-sm transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Logo - Center */}
            <a href="#home" className="flex items-center px-4">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-12 w-auto object-contain filter drop-shadow-md"
              />
            </a>

            {/* Right Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-secondary font-medium text-sm"
              >
                Overview
              </Button>
              {rightNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-secondary font-medium text-sm transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Floating Contact Button - Above Chatbot */}
      <div className="fixed bottom-20 right-6 z-40">
        <Button
          size="lg"
          className="bg-primary/90 backdrop-blur-xl text-white hover:bg-primary hover:shadow-xl font-medium rounded-full shadow-lg px-6 transition-all duration-300"
          onClick={() => window.location.href = 'tel:+918884545404'}
        >
          <Phone className="w-4 h-4 mr-2" />
          <span>Get In Touch</span>
        </Button>
      </div>
    </>
  );
};

export default Header;
