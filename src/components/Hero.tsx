import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ opacity }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          key="hero-video"
        >
          <source src="https://cdn.pixabay.com/video/2022/04/05/113253-696298069_large.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>

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
              Design Transform Elevate
            </h1>
          </div>

          {/* Subtitle */}
          <div className="leo9-reveal depth-3d-item">
            <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Redefining premium living through architectural excellence and strategic real estate investments in Bangalore
            </p>
          </div>

          {/* Clean CTA */}
          <div className="leo9-reveal depth-3d-item">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-white text-primary px-12 py-6 text-lg font-medium elevated-shadow hover:shadow-2xl transition-all duration-500 group premium-lift-subtle hover:scale-105"
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
    </section>
  );
};

export default Hero;
