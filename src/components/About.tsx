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
      
      // Calculate progress based on element position in viewport
      const start = windowHeight;
      const end = -elementHeight;
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
      title: "Design",
      description: "Architectural excellence that blends modern innovation with timeless elegance, creating spaces that inspire and endure."
    },
    {
      title: "Development",
      description: "Quality construction with meticulous project management, ensuring every detail meets our exacting standards."
    },
    {
      title: "Personalized Living",
      description: "Tailored homes that reflect your unique preferences and lifestyle, offering the freedom to create your perfect living space."
    },
    {
      title: "Innovative Design",
      description: "Modern amenities seamlessly integrated with classic sophistication, delivering living spaces that set new standards."
    },
    {
      title: "Enduring Value",
      description: "Properties built to stand the test of time, offering lasting value in both construction quality and market appreciation."
    },
    {
      title: "Exceptional Amenities",
      description: "An array of world-class amenities that enhance comfort, convenience, and elevate your everyday living experience."
    },
    {
      title: "Strategic Locations",
      description: "Prime addresses that offer prestige, connectivity, and access to everything that matters in modern urban living."
    },
    {
      title: "Investment",
      description: "Strategic guidance and market insights to help you make informed decisions for long-term wealth creation."
    }
  ];

  const largeText = "LIFE DESIGNED";
  const totalChars = largeText.length;

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Our Philosophy
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Side - Large Text with Letter Animation */}
          <div className="lg:pr-12">
            <div ref={largeTextRef} className="relative">
              <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight break-words">
                {largeText.split('').map((char, index) => {
                  const charProgress = (scrollProgress * totalChars) - index;
                  const opacity = Math.max(0, Math.min(1, charProgress));
                  
                  return (
                    <span
                      key={index}
                      className={char === ' ' ? 'inline-block w-3 md:w-4' : 'inline-block transition-colors duration-300'}
                      style={{
                        color: `hsl(var(--foreground) / ${0.3 + (opacity * 0.7)})`
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
              </h3>
              
              <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl">
                LifeDesigned® is our guiding philosophy of drawing inspiration from and influencing the lives we touch through our built environments which are meticulously perfected to understand, nurture and enrich your life from now till forever.
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
                <div className="border-b border-border py-4 transition-all duration-300">
                  <h4 className="text-2xl md:text-3xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-300">
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
