import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Nature and Real Estate inspired 3D components
const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Tree trunk */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#6B4423" roughness={0.8} />
      </mesh>
      {/* Tree foliage */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.6, 1.2, 8]} />
        <meshStandardMaterial color="#2D5016" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <coneGeometry args={[0.45, 0.9, 8]} />
        <meshStandardMaterial color="#3A6B1F" roughness={0.6} />
      </mesh>
    </group>
  );
};

const Building = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Building base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#B57B66" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.6, 0.5, 4]} />
        <meshStandardMaterial color="#8B5A3C" roughness={0.5} />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.2, 0.31]}>
        <boxGeometry args={[0.2, 0.3, 0.02]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.2, 0.31]}>
        <boxGeometry args={[0.3, 0.35, 0.02]} />
        <meshStandardMaterial color="#6B8E23" roughness={0.7} />
      </mesh>
    </group>
  );
};

const Leaf = ({ position }: { position: [number, number, number] }) => {
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.quadraticCurveTo(0.3, 0.1, 0.4, 0.4);
  leafShape.quadraticCurveTo(0.3, 0.7, 0, 0.8);
  leafShape.quadraticCurveTo(-0.3, 0.7, -0.4, 0.4);
  leafShape.quadraticCurveTo(-0.3, 0.1, 0, 0);

  const extrudeSettings = {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2
  };

  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <extrudeGeometry args={[leafShape, extrudeSettings]} />
      <meshStandardMaterial color="#7CB342" roughness={0.4} />
    </mesh>
  );
};

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
      title: "Exceptional Amenities",
      description: "An array of world-class amenities that enhance comfort, convenience, and elevate your everyday living experience."
    },
    {
      title: "Investment",
      description: "Strategic guidance and market insights to help you make informed decisions for long-term wealth creation."
    }
  ];

  const largeText = "LIFE DESIGNED";
  const totalChars = largeText.length;

  return (
    <section id="about" ref={sectionRef} className="relative py-16 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* 3D Background Elements - Nature & Real Estate */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#B57B66" />
          
          {/* Floating Buildings */}
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
            <Building position={[-3.5, 1.5, -1]} />
          </Float>
          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
            <Building position={[3, -1.5, -2]} />
          </Float>
          
          {/* Floating Trees */}
          <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7}>
            <Tree position={[-2, -2, 0]} />
          </Float>
          <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.6}>
            <Tree position={[3.5, 2, -1.5]} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <Tree position={[-4, 0, -2]} />
          </Float>
          
          {/* Floating Leaves */}
          <Float speed={2} rotationIntensity={0.8} floatIntensity={0.9}>
            <Leaf position={[1.5, 3, 0]} />
          </Float>
          <Float speed={1.8} rotationIntensity={0.7} floatIntensity={0.8}>
            <Leaf position={[-1, 2.5, -1]} />
          </Float>
          <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.7}>
            <Leaf position={[4, 0.5, -0.5]} />
          </Float>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            About us
          </h2>
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
