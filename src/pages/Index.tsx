import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfiniteScrollBand from "@/components/InfiniteScrollBand";
import About from "@/components/About";
import BlogsSection from "@/components/BlogsSection";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Floating3DElements from "@/components/Floating3DElements";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-scroll-section]');
    sections.forEach(section => observer.observe(section));

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <Floating3DElements />
      <Header />
      <Hero />
      <div 
        id="about-section" 
        data-scroll-section 
        className={`transition-all duration-1000 ${visibleSections.has('about-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <About />
      </div>
      <div 
        id="projects-section" 
        data-scroll-section 
        className={`transition-all duration-1000 ${visibleSections.has('projects-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Projects />
      </div>
      
      {/* Referral CTA Section */}
      <section 
        id="referral-section" 
        data-scroll-section 
        className={`py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 transition-all duration-1000 ${visibleSections.has('referral-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Refer & Earn Up to <span className="text-primary">2%</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our referral program and earn rewards for every successful booking you refer
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => window.location.href = '/referral'}
          >
            Join Referral Program
          </Button>
        </div>
      </section>
      
      <div 
        id="blogs-section" 
        data-scroll-section 
        className={`transition-all duration-1000 ${visibleSections.has('blogs-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <BlogsSection />
      </div>
      <div 
        id="contact-section" 
        data-scroll-section 
        className={`transition-all duration-1000 ${visibleSections.has('contact-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <Contact />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
