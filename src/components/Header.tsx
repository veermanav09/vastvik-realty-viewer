import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo-black.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import ContactDialog from "./ContactDialog";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const location = useLocation();

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
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" }
  ];

  const rightNavItems = [
    { name: "Overview", href: "/overview" },
    { name: "Referral", href: "/referral" }
  ];

  return (
    <>
      {/* Header with Logo and Navigation - Permanent Liquid Glass Effect */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isVisible ? 'top-4 opacity-100 translate-y-0' : '-top-24 opacity-0 -translate-y-4'
        }`}
      >
        <div className="bg-white/50 dark:bg-black/50 backdrop-blur-2xl rounded-2xl px-4 md:px-10 py-3 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-black/60 transition-all duration-500">
          <nav className="flex items-center justify-between md:justify-center gap-4 md:gap-8">
            {/* Mobile Menu Button - Left side on mobile */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden flex-shrink-0"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8">
                  {leftNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground hover:text-secondary font-medium text-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {rightNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-foreground hover:text-secondary font-medium text-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setContactDialogOpen(true);
                    }}
                    className="text-foreground hover:text-secondary font-medium text-lg transition-colors text-left"
                  >
                    Contact
                  </button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Left Navigation Items - Desktop only */}
            <div className="hidden md:flex items-center justify-end gap-6 w-64">
              {leftNavItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground font-medium text-sm transition-all duration-300 relative group whitespace-nowrap hover:-translate-y-0.5 ${
                      isActive ? 'text-primary' : 'hover:text-primary'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
            </div>

            {/* Logo - Center */}
            <Link to="/" className="flex items-center justify-center md:px-6 flex-shrink-0 group">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-8 md:h-10 w-auto object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Invisible spacer for mobile to balance the menu button */}
            <div className="md:hidden w-10 flex-shrink-0"></div>

            {/* Right Navigation Items - Desktop only */}
            <div className="hidden md:flex items-center justify-start gap-6 w-64">
              {rightNavItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground font-medium text-sm transition-all duration-300 relative group whitespace-nowrap hover:-translate-y-0.5 ${
                      isActive ? 'text-primary' : 'hover:text-primary'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
              <button
                onClick={() => setContactDialogOpen(true)}
                className="text-foreground font-medium text-sm transition-all duration-300 relative group hover:text-primary whitespace-nowrap hover:-translate-y-0.5"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Floating Contact Button - Above Chatbot */}
      <div className="fixed bottom-24 right-6 z-[60]">
        <Button
          size="icon"
          className="w-14 h-14 bg-foreground/90 backdrop-blur-xl text-background hover:bg-foreground hover:shadow-2xl rounded-full transition-all duration-500 border border-background/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:scale-110 group"
          onClick={() => window.location.href = 'tel:+918884545404'}
        >
          <Phone className="w-5 h-5 group-hover:animate-pulse" />
        </Button>
      </div>
      
      <ContactDialog 
        isOpen={contactDialogOpen} 
        onClose={() => setContactDialogOpen(false)} 
      />
    </>
  );
};

export default Header;
