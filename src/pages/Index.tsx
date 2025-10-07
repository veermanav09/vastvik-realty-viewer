import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfiniteScrollBand from "@/components/InfiniteScrollBand";
import About from "@/components/About";
import BlogsSection from "@/components/BlogsSection";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
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

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <BlogsSection />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
