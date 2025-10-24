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

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blogs", href: "#blogs" },
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
        <div className="bg-background/80 backdrop-blur-xl rounded-full px-8 py-4 border border-border/50 shadow-2xl">
          <nav className="flex items-center gap-8">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
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
    </>
  );
};

export default Header;
