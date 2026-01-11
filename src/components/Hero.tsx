import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const opacity = Math.max(0.3, 1 - scrollY / 600);
  const scale = Math.max(0.95, 1 - scrollY / 3000);
  const blur = Math.min(scrollY / 100, 8);
  return <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 px-4 md:px-8" style={{
    opacity
  }}>
      {/* Video Container with Rounded Corners */}
      <div className="absolute inset-8 md:inset-12 rounded-[32px] overflow-hidden transition-all duration-700" style={{
      transform: `scale(${scale})`,
      filter: `blur(${blur}px)`
    }}>
        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" key="hero-video">
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* 3D Floating Overlays with improved animations */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-float-slow" style={{
        animationDelay: '-2s'
      }}></div>
        
        {/* Additional atmospheric elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float-slower" style={{
        animationDelay: '-3s'
      }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-6xl mx-auto depth-3d">

          {/* Main heading with staggered animation */}
          <div className={`mb-12 depth-3d-item transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-2xl opacity-50 animate-pulse-soft"></div>
              <h1 className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight tracking-tight drop-shadow-2xl hero-text-3d relative">
                Where Dreams Find Home
              </h1>
            </div>
          </div>

          {/* Subtitle with delayed animation */}
          <div className={`depth-3d-item transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-body px-4">
              Crafting architectural masterpieces that redefine luxury living. Experience where timeless elegance meets modern sophistication in Bangalore's most coveted addresses.
            </p>
          </div>
        </div>

        {/* Minimal scroll indicator with improved animation */}
        <div className={`absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 text-white/80 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <span className="text-xs uppercase tracking-wider font-medium group-hover:text-white transition-colors">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/50 p-1.5 group-hover:border-white/80 transition-colors items-center justify-center flex flex-col gap-0 py-[10px]">
              <div className="w-1.5 h-3 bg-white/80 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;