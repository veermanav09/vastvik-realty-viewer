import { useState, useEffect, useRef } from "react";

const InfiniteScrollBand = () => {
  const [translateX, setTranslateX] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const lastScrollY = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // Change direction based on scroll
      if (scrollDelta > 0) {
        setDirection(1); // scrolling down = move right
      } else if (scrollDelta < 0) {
        setDirection(-1); // scrolling up = move left
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Continuous animation with increased speed
    const animate = () => {
      setTranslateX(prev => prev + direction * 2.5);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction]);

  const text = "Welcome to Vastvik Realty";
  const repeatedText = Array(8).fill(text).join(" • ");

  return (
    <div className="relative w-full py-6 bg-primary overflow-hidden border-y border-white/10">
      {/* 3D depth effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

      <div
        className="whitespace-nowrap inline-block"
        style={{
          transform: `translateX(${translateX}px)`,
          width: '50%'
        }}
      >
        <span className="text-3xl md:text-4xl font-heading font-bold text-white/90 tracking-wider inline-block">
          {repeatedText}
        </span>
        <span className="text-3xl md:text-4xl font-heading font-bold text-white/90 tracking-wider inline-block">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default InfiniteScrollBand;
