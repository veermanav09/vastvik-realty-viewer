import { useEffect, useRef, useState } from "react";

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const largeTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!largeTextRef.current) return;
      
      const rect = largeTextRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Faster animation - completes when element is centered in viewport
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const current = rect.top;
      
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const philosophyItems = [
    {
      title: "Design Excellence",
      description: "Architectural mastery that harmonizes contemporary innovation with enduring elegance, creating spaces that inspire daily and endure eternally."
    },
    {
      title: "Quality Craftsmanship",
      description: "Uncompromising construction standards with meticulous oversight, ensuring every detail exceeds our exacting benchmarks of perfection."
    },
    {
      title: "Personalized Living",
      description: "Bespoke residences tailored to your unique vision and lifestyle, offering the freedom to curate your ideal sanctuary."
    },
    {
      title: "Innovative Design",
      description: "Cutting-edge amenities seamlessly integrated with timeless sophistication, delivering living experiences that set industry standards."
    },
    {
      title: "World-Class Amenities",
      description: "Curated collection of premium facilities that elevate comfort, enhance convenience, and transform everyday living into extraordinary experiences."
    },
    {
      title: "Strategic Investment",
      description: "Expert guidance backed by market intelligence to help you make informed decisions for sustained wealth creation and long-term value appreciation."
    }
  ];

  const largeText = "LIFE DESIGNED";
  const totalChars = largeText.length;

  return (
    <section id="about" ref={sectionRef} className="relative py-16 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Animated Shadow Gradient Overlay */}
      <div className="absolute inset-0 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"></div>
      </div>
      
      {/* CSS Keyframes for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          25% {
            opacity: 0.5;
            transform: scale(1.05) rotate(1deg);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.02) rotate(-1deg);
          }
          75% {
            opacity: 0.6;
            transform: scale(1.03) rotate(0.5deg);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 15s ease-in-out infinite;
          background: linear-gradient(
            135deg,
            hsl(var(--primary) / 0.08),
            hsl(var(--secondary) / 0.12),
            hsl(var(--accent) / 0.1),
            hsl(var(--primary) / 0.15)
          );
          background-size: 400% 400%;
          animation: gradient-shift 15s ease-in-out infinite, gradient-move 20s ease infinite;
        }
        
        @keyframes gradient-move {
          0%, 100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
            Our Philosophy
          </h2>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Building more than homes—we create legacies
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Side - Large Text with Letter Animation */}
          <div className="lg:pr-12">
            <div ref={largeTextRef} className="relative">
              <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight break-words">
                {largeText.split('').map((char, index) => {
                  const charProgress = (scrollProgress * totalChars * 1.2) - index;
                  const opacity = Math.max(0, Math.min(1, charProgress));
                  
                  // Calculate gradient color based on character position
                  const colorProgress = index / totalChars;
                  const hue1 = 25; // Orange
                  const hue2 = 10; // Red-orange
                  const currentHue = hue1 + (hue2 - hue1) * colorProgress;
                  
                  return (
                    <span
                      key={index}
                      className={char === ' ' ? 'inline-block w-3 md:w-4' : 'inline-block transition-all duration-500 ease-out'}
                      style={{
                        color: opacity > 0.1 
                          ? `hsl(${currentHue}, 70%, ${45 + opacity * 15}%)`
                          : 'hsl(var(--muted-foreground) / 0.2)',
                        transform: `translateY(${(1 - opacity) * 10}px)`,
                        filter: `blur(${(1 - opacity) * 2}px)`
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </h3>
              
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl font-body">
                LifeDesigned® is our commitment to excellence—a philosophy that transforms spaces into sanctuaries. Every detail is meticulously crafted to understand, nurture, and enrich the lives we touch, creating homes that stand the test of time.
              </p>
            </div>
          </div>

          {/* Right Side - Hoverable Items */}
          <div className="space-y-4">
            {philosophyItems.map((item, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="border-b border-border py-4 transition-all duration-300 group-hover:border-secondary/50">
                  <h4 className="text-2xl md:text-3xl font-light text-muted-foreground group-hover:text-secondary transition-colors duration-300">
                    {item.title}
                  </h4>
                  
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: hoveredItem === index ? '200px' : '0px',
                      opacity: hoveredItem === index ? 1 : 0
                    }}
                  >
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
