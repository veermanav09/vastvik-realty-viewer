import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import vastwikLogo from "@/assets/vastvik-logo.jpeg";

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
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Youtube, href: "#", name: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src={vastwikLogo}
                alt="Vastvik Realty"
                className="h-16 w-auto object-contain mb-2"
              />
              <p className="text-sm opacity-75">Premium Homes & Smart Investments</p>
            </div>

            <p className="text-white/80 leading-relaxed mb-6">
              Your gateway to premium homes and exclusive living experiences in Bangalore.
              We specialize in crafting homes that blend aesthetic beauty with modern functionality.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white" />
                <button
                  onClick={() => window.location.href = 'tel:8884545404'}
                  className="font-semibold text-white hover:text-white/80 transition-colors text-left"
                >
                  8884545404
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white" />
                <button
                  onClick={() => window.location.href = 'mailto:info@vastvikrealty.com'}
                  className="text-white hover:text-white/80 transition-colors text-left"
                >
                  info@vastvikrealty.com
                </button>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white mt-1" />
                <button
                  onClick={() => window.open('https://maps.google.com/?q=Marsur Gate, Chandapura-Anekal Main Road, Bengaluru-562106', '_blank')}
                  className="text-sm text-white/90 hover:text-white transition-colors text-left"
                >
                  #340, Marsur Gate, Opp M Trees School,
                  Chandapura-Anekal Main Road, Bengaluru-562106
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-heading font-bold text-xl mb-4 mt-8">Projects</h4>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.name} className="flex items-center space-x-2">
                  <span className="text-white/80">{project.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
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

          <div>
            <h4 className="font-heading font-bold text-xl mb-6">Stay Updated</h4>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to get the latest updates on new projects and exclusive offers.
            </p>

            <div className="space-y-3 mb-6">
              <Input
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="w-full bg-white text-primary hover:bg-white/90 hover:shadow-lg transition-all duration-300">
                Subscribe
              </Button>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Vastvik Realty. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                RERA Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
