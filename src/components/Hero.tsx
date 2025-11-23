import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import PortfolioCarousel from "./PortfolioCarousel";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(scrollY);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const opacity = Math.max(0.3, 1 - scrollY / 600);

  // Calculate transform for horizontal scroll effect (right when scrolling down, left when scrolling up)
  const isScrollingDown = scrollY > lastScrollY;
  const translateX = isScrollingDown ? scrollY * 0.15 : -scrollY * 0.15;

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20 px-4 md:px-8"
      style={{ opacity }}
    >
      {/* Video Container with Rounded Corners */}
      <div className="absolute inset-8 md:inset-12 rounded-[32px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          key="hero-video"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* 3D Floating Overlays */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-float-slow"></div>
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto depth-3d">

          {/* Main heading with 3D effect */}
          <div className="mb-12 leo9-slide-up depth-3d-item">
            <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight tracking-tight drop-shadow-2xl hero-text-3d">
              Where Dreams Find Home
            </h1>
          </div>

          {/* Subtitle */}
          <div className="leo9-reveal depth-3d-item">
            <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-body">
              Crafting architectural masterpieces that redefine luxury living. Experience where timeless elegance meets modern sophistication in Bangalore's most coveted addresses.
            </p>
          </div>

          {/* Clean CTA */}
          <div className="leo9-reveal depth-3d-item">
            <Button
              onClick={() => setShowPortfolio(true)}
              size="lg"
              className="bg-background/95 backdrop-blur-md text-foreground border-2 border-foreground px-12 py-6 text-lg font-semibold elevated-shadow hover:bg-foreground hover:text-background hover:shadow-2xl transition-all duration-500 group premium-lift-subtle hover:scale-105"
            >
              Explore Our Portfolio
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Portfolio Carousel Modal */}
      <PortfolioCarousel isOpen={showPortfolio} onClose={() => setShowPortfolio(false)} />
    </section>
  );
};

export default Hero;
