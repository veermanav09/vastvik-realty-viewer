import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, TrendingUp, Heart, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);
  const features = [
    {
      icon: Shield,
      title: "PERSONALIZED LIVING",
      description: "Vastvik Realty's Crafted Homes offer the opportunity for personalization, allowing residents to tailor their living spaces to suit their unique preferences and lifestyle."
    },
    {
      icon: Award,
      title: "INNOVATIVE DESIGN",
      description: "Our homes feature innovative design concepts, providing a living space that seamlessly blends modern amenities with classic sophistication."
    },
    {
      icon: TrendingUp,
      title: "ENDURING VALUE",
      description: "Investing in a Vastvik Realty's Crafted Home means investing in lasting value—properties that stand the test of time both in terms of construction and market appreciation."
    },
    {
      icon: Heart,
      title: "EXCEPTIONAL AMENITIES",
      description: "Crafted Homes come with an array of exceptional amenities, enhancing the overall living experience and providing residents with the ultimate in comfort and convenience."
    },
    {
      icon: Building2,
      title: "STRATEGIC LOCATIONS",
      description: "Each Vastvik Realty's Crafted Home is strategically located, offering not just a residence but a coveted address that reflects prestige and convenience."
    }
  ];

  const services = [
    {
      title: "Design",
      description: "Architectural Excellence",
      items: ["Premium Design", "Space Planning", "Interior Concepts"]
    },
    {
      title: "Development",
      description: "Quality Construction",
      items: ["Project Management", "Quality Assurance", "Timeline Delivery"]
    },
    {
      title: "Investment",
      description: "Strategic Guidance",
      items: ["Market Analysis", "ROI Planning", "Investment Advisory"]
    }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Leo9 Style Header */}
        <div ref={headingRef} className="text-center mb-32 leo9-text-reveal">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">About Us</span>
          </div>
          <h2 className="font-heading font-bold text-5xl md:text-7xl text-foreground mb-12 leading-tight">
            <span className="inline-block overflow-hidden">
              <span className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0.1s' }}>We are a premium</span>
            </span><br/>
            <span className="inline-block overflow-hidden">
              <span className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0.3s' }}>real estate developer that</span>
            </span><br/>
            <span className="inline-block overflow-hidden">
              <span className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0.5s' }}>transforms architectural vision</span>
            </span><br/>
            <span className="inline-block overflow-hidden">
              <span className={`inline-block transition-transform duration-700 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`} style={{ transitionDelay: '0.7s' }}>into living reality</span>
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-16 mb-32">
          {services.map((service, index) => (
            <div key={index} className="text-center leo9-reveal" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <h3 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8 font-light">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Large Text Section with Fade Effect */}
        <div className="text-center mb-32 leo9-reveal">
          <h3 className="font-heading font-light text-3xl md:text-4xl leading-relaxed max-w-5xl mx-auto">
            <span className="text-foreground">
              At Vastvik Realty, we're building modern communities for tomorrow. Explore our spacious apartments, luxury villas, and premium plots. Be part of our journey as we grow into{" "}
            </span>
            <span className="text-muted-foreground/40">
              one of Bangalore's leading real estate developers.
            </span>
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-32">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="group leo9-reveal" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <div className="p-8 bg-card elevated-shadow rounded-lg card-tilt hover:bg-accent/50 transition-all duration-500">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6 float-3d" style={{ animationDelay: `${index * 0.2}s` }}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-heading font-bold text-xl text-foreground mb-4 uppercase tracking-wider">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto mb-32">
          {features.slice(3).map((feature, index) => (
            <div key={index + 3} className="group leo9-reveal" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <div className="p-8 bg-card elevated-shadow rounded-lg card-tilt hover:bg-accent/50 transition-all duration-500">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6 float-3d" style={{ animationDelay: `${(index + 3) * 0.2}s` }}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-heading font-bold text-xl text-foreground mb-4 uppercase tracking-wider">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center leo9-reveal">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Ready to Start?</span>
          </div>
          <h3 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-8">
            Discover Bengaluru's Finest
          </h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light">
            Crafted homes, smart investments, and enduring prosperity in prime locations.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground px-12 py-6 text-lg font-medium minimal-shadow hover:elevated-shadow transition-all duration-300 leo9-scale"
          >
            Explore Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
