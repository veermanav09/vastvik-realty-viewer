import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo-white.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const projects = [
    { name: "Element", status: "Ongoing" },
    { name: "High Rise", status: "Upcoming" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583999404017", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/vastvik_realty/?utm_source=ig_web_button_share_sheet", name: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/vastvikrealty/", name: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-white pt-8 pb-4 md:pt-12 md:pb-6 lg:pt-14 lg:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
          {/* Logo & Contact - Full width on mobile */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              />
              
            </div>

            <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-3 font-body hidden md:block">
              Your trusted partner in discovering exceptional homes and exclusive living experiences.
            </p>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xs md:text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <button
                  onClick={() => window.location.href = 'tel:8884545404'}
                  className="font-semibold text-white hover:text-white/80 transition-colors"
                >
                  8884545404
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <button
                  onClick={() => window.location.href = 'mailto:info@vastvikrealty.com'}
                  className="text-white hover:text-white/80 transition-colors truncate"
                >
                  info@vastvikrealty.com
                </button>
              </div>
            </div>
            <div className="flex items-start space-x-2 mt-2">
              <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
              <button
                onClick={() => window.open('https://maps.google.com/?q=Marsur Gate, Chandapura-Anekal Main Road, Bengaluru-562106', '_blank')}
                className="text-xs text-white/90 hover:text-white transition-colors text-left"
              >
                Marsur Gate, Chandapura-Anekal Main Road, Bengaluru-562106
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm md:text-base mb-2 md:mb-3">Quick Links</h4>
            <ul className="space-y-1 text-xs md:text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/80 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-bold text-sm md:text-base mb-2 mt-3 md:mt-4">Projects</h4>
            <ul className="space-y-1 text-xs md:text-sm">
              {projects.map((project) => (
                <li key={project.name} className="flex items-center space-x-2">
                  <span className="text-white/80">{project.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1 py-0 ${
                      project.status === "Ongoing"
                        ? "border-green-400 text-green-400"
                        : "border-white text-white"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="font-heading font-bold text-sm md:text-base mb-2 md:mb-3">Stay Informed</h4>
            <div className="space-y-2 mb-3">
              <Input
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-8 text-xs"
              />
              <Button className="w-full bg-white text-primary hover:bg-white/90 h-8 text-xs">
                Subscribe
              </Button>
            </div>

            <h5 className="font-semibold text-xs mb-2">Follow Us</h5>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded-md flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-xs">
            <p className="text-white/60">© 2024 Vastvik Realty. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">RERA</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
