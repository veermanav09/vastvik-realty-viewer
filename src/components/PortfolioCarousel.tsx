import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PortfolioCarouselProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioCarousel = ({ isOpen, onClose }: PortfolioCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);

  const projects = [
    {
      id: 1,
      name: "ELEMENT",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      location: "Marsur Gate",
      type: "Ongoing"
    },
    {
      id: 2,
      name: "HIGH RISE",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      location: "Chandapura Main Road",
      type: "Upcoming"
    },
    {
      id: 3,
      name: "LUXURY VILLAS",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      location: "Whitefield",
      type: "Upcoming"
    },
    {
      id: 4,
      name: "URBAN RESIDENCY",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      location: "Electronic City",
      type: "Ongoing"
    },
    {
      id: 5,
      name: "GREEN ACRES",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      location: "Sarjapur Road",
      type: "Planning"
    },
  ];

  // Duplicate projects for seamless loop
  const allProjects = [...projects, ...projects, ...projects];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] w-[90vw] h-[70vh] p-0 border-0 bg-transparent shadow-none overflow-visible">
        <div className="relative w-full h-full bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-border">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-foreground hover:text-background transition-all duration-300 flex items-center justify-center group"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Infinite Carousel */}
          <div 
            className="relative w-full h-full flex items-center overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className={`flex gap-6 ${isPaused ? '' : 'animate-scroll-horizontal'}`}
              style={{
                width: 'fit-content',
              }}
            >
              {allProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="relative flex-shrink-0 w-[400px] h-[500px] rounded-2xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                      {project.type}
                    </span>
                  </div>

                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                    <h3 className="font-heading font-bold text-2xl text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/80 text-sm">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioCarousel;
