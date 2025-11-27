import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Users, IndianRupee, Calendar, ChevronDown, ExternalLink } from "lucide-react";
import DownloadBrochureDialog from "./DownloadBrochureDialog";
import ExpressionOfInterestDialog from "./ExpressionOfInterestDialog";
import elementImage from "@/assets/element-project.png";
import highriseImage from "@/assets/highrise-project.png";

const Projects = () => {
  const [brochureDialog, setBrochureDialog] = useState<{isOpen: boolean, projectName: string, projectId: number}>({
    isOpen: false,
    projectName: "",
    projectId: 0,
  });
  const [eoiDialog, setEoiDialog] = useState<{isOpen: boolean, projectName: string, projectId: number}>({
    isOpen: false,
    projectName: "",
    projectId: 0,
  });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: "ELEMENT",
      type: "ONGOING",
      bedrooms: "2 & 3 BHK",
      units: "60 UNITS",
      price: "45 LAKHS ONWARD",
      location: "MARSUR GATE",
      image: elementImage,
      features: ["Premium Amenities", "Gated Community", "24/7 Security"],
      completion: "April 2027",
      description: "Vastvik Element is an exclusive residential sanctuary at Marsur Gate, featuring expansive 2 and 3 BHK residences surrounded by lush landscaped gardens. Experience premium living where every detail reflects sophistication.",
      address: "Sy.No-340/2&3, Marsur gate, opp M tres school, chandapura, anekal main road, bengaluru -562106"
    },
    {
      id: 2,
      name: "HIGH RISE",
      type: "UPCOMING",
      bedrooms: "2 & 3 BHK",
      units: "120 UNITS",
      price: "60 LAKHS ONWARD",
      location: "CHANDAPURA MAIN ROAD",
      image: highriseImage,
      features: ["Sky Lounge", "Swimming Pool", "Gym & Spa"],
      completion: "Q2 2025",
      description: "Elevate your lifestyle at High Rise, where panoramic city vistas meet world-class amenities. The perfect fusion of luxury, convenience, and architectural brilliance on Chandapura Main Road.",
      address: "Survey No. 128, Chandapura Main Road, Near Tech Park, Bangalore - 560099"
    }
  ];

  return (
    <section id="projects" className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl"></div>
            <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground relative">
              Our Projects
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-body">
            Discover meticulously crafted residences where luxury meets lifestyle, designed to exceed expectations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => {
            const isHovered = hoveredProject === project.id;

            return (
              <div 
                key={project.id} 
                className="group relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`relative overflow-hidden rounded-[32px] bg-card transition-all duration-500 ${isHovered ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>
                  {/* Image Section */}
                  <div className="relative p-6">
                    <div className={`relative h-96 overflow-hidden rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 ${isHovered ? 'shadow-[0_12px_40px_rgba(0,0,0,0.25)] -translate-y-2' : ''}`}>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    
                      {/* Badge */}
                      <Badge
                        variant={project.type === "ONGOING" ? "default" : "secondary"}
                        className={`absolute top-4 left-4 ${project.type === "ONGOING" ? "bg-green-500" : "bg-primary"} text-white px-3 py-1 text-xs font-semibold`}
                      >
                        {project.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="p-6">
                    {/* Project Title */}
                    <div className="mb-4">
                      <h3 className="font-heading font-bold text-3xl text-foreground mb-2">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>

                    {/* Configuration and Price */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Configuration</p>
                        <p className="font-semibold text-foreground flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-primary" />
                          {project.bedrooms}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Starting Price</p>
                        <p className="font-bold text-primary flex items-center justify-end gap-1">
                          <IndianRupee className="w-4 h-4" />
                          <span className="text-sm">{project.price}</span>
                        </p>
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {project.description}
                      </p>
                      
                      {/* Address */}
                      <div className="flex items-start gap-2 mb-3 p-3 rounded-lg bg-accent/30">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground">{project.address}</p>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{project.units}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">By {project.completion}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => window.open(`/project/${project.id}`, '_blank')}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                        size="sm"
                      >
                        More Details
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        onClick={() => {
                          if (project.id === 2) {
                            setEoiDialog({isOpen: true, projectName: project.name, projectId: project.id});
                          } else {
                            setBrochureDialog({isOpen: true, projectName: project.name, projectId: project.id});
                          }
                        }}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        size="sm"
                      >
                        {project.id === 2 ? "Express Interest" : "Download Brochure"}
                      </Button>
                    </div>

                    {/* View More Indicator */}
                    <div className="flex justify-center mt-4">
                      <div className={`flex items-center gap-1 text-xs text-muted-foreground transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                        <span>Hover to view more</span>
                        <ChevronDown className="w-3 h-3 animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-body">
            Ready to explore your dream home? Let's begin your journey.
          </p>
          <Button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            size="lg"
            className="bg-primary text-primary-foreground px-16 py-6 text-xl minimal-shadow hover:elevated-shadow transition-all duration-300"
          >
            Schedule a Viewing
          </Button>
        </div>
      </div>

      <DownloadBrochureDialog
        isOpen={brochureDialog.isOpen}
        onClose={() => setBrochureDialog({isOpen: false, projectName: "", projectId: 0})}
        projectName={brochureDialog.projectName}
        projectId={brochureDialog.projectId}
      />
      
      <ExpressionOfInterestDialog
        isOpen={eoiDialog.isOpen}
        onClose={() => setEoiDialog({isOpen: false, projectName: "", projectId: 0})}
        projectName={eoiDialog.projectName}
        projectId={eoiDialog.projectId}
      />
    </section>
  );
};

export default Projects;
