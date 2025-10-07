import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo.jpeg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useState(0);

  useEffect(() => {
    let lastY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      // Hide when scrolling up, show when scrolling down
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
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Blogs", href: "#blogs" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Fixed Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <a href="#home" className="flex items-center">
          <img
            src={vastwikLogo}
            alt="Vastvik Realty"
            className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 mix-blend-multiply"
          />
        </a>
      </div>

      {/* Dynamic Island Header */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'top-6 opacity-100' : '-top-24 opacity-0'
        }`}
      >
        <div className="bg-foreground/95 backdrop-blur-2xl rounded-full px-8 py-4 border border-white/10 shadow-2xl">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-background hover:text-primary-foreground font-medium text-sm uppercase tracking-wider transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-foreground transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Menu Dropdown */}
            <DropdownMenu open={projectsOpen} onOpenChange={setProjectsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="text-background hover:text-primary-foreground font-medium text-sm uppercase tracking-wider transition-all duration-300 flex items-center space-x-1">
                  <Menu className="w-4 h-4" />
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${projectsOpen ? 'rotate-180' : ''}`} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-6 bg-background border shadow-lg z-[100] mt-2">
                <div className="space-y-3">
                  <div className="font-bold text-sm uppercase tracking-wider text-primary mb-4 border-b pb-2">More</div>
                  <DropdownMenuItem asChild className="cursor-pointer text-base py-3 hover:bg-accent rounded-md transition-colors">
                    <a href="#projects">Ongoing Projects</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-base py-3 hover:bg-accent rounded-md transition-colors">
                    <a href="#projects">Upcoming Projects</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-base py-3 hover:bg-accent rounded-md transition-colors">
                    <a href="#projects">Completed Projects</a>
                  </DropdownMenuItem>
                  <div className="border-t my-4"></div>
                  <DropdownMenuItem className="cursor-pointer text-base py-3 hover:bg-accent rounded-md transition-colors">
                    <a href="#careers" className="w-full">Careers</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-base py-3 hover:bg-accent rounded-md transition-colors">
                    <a href="/referral" className="w-full">Referral Program</a>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-background hover:text-primary-foreground transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-background/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl w-[280px]">
            <nav className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary font-medium text-sm uppercase tracking-wider py-2 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-wider font-medium"
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
