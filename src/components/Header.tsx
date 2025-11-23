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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'top-4 opacity-100' : '-top-24 opacity-0'
        }`}
      >
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl rounded-2xl px-8 py-1.5 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300">
          <nav className="flex items-center justify-center gap-6">
            {/* Left Navigation Items - Flex with equal width */}
            <div className="hidden md:flex items-center justify-end gap-5 w-64">
              {leftNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground font-medium text-sm transition-all duration-300 relative group whitespace-nowrap ${
                      isActive ? 'text-secondary' : 'hover:text-secondary'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-px bg-secondary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
            </div>

            {/* Logo - Center with fixed width */}
            <Link to="/" className="flex items-center justify-center px-6 flex-shrink-0">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-10 w-auto object-contain filter drop-shadow-md"
              />
            </Link>

            {/* Right Navigation Items - Flex with equal width */}
            <div className="hidden md:flex items-center justify-start gap-5 w-64">
              {rightNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground font-medium text-sm transition-all duration-300 relative group whitespace-nowrap ${
                      isActive ? 'text-secondary' : 'hover:text-secondary'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-px bg-secondary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                );
              })}
              <button
                onClick={() => setContactDialogOpen(true)}
                className="text-foreground font-medium text-sm transition-all duration-300 relative group hover:text-secondary whitespace-nowrap"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-secondary font-medium text-lg transition-colors"
                  >
                    Overview
                  </Link>
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
          </nav>
        </div>
      </header>

      {/* Floating Contact Button - Above Chatbot */}
      <div className="fixed bottom-24 right-6 z-[60]">
        <Button
          size="icon"
          className="w-14 h-14 bg-black/90 backdrop-blur-xl text-[#86A376] hover:bg-black hover:shadow-2xl rounded-full transition-all duration-300 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          onClick={() => window.location.href = 'tel:+918884545404'}
        >
          <Phone className="w-5 h-5" />
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
