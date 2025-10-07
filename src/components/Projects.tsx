import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Users, IndianRupee, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DownloadBrochureDialog from "./DownloadBrochureDialog";

const Projects = () => {
  const navigate = useNavigate();
  const [brochureDialog, setBrochureDialog] = useState<{isOpen: boolean, projectName: string, projectId: number}>({
    isOpen: false,
    projectName: "",
    projectId: 0,
  });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: "ELEMENT",
      type: "ONGOING",
      bedrooms: "1, 2 & 3 BHK",
      units: "60 UNITS",
      price: "38 LAKHS ONWARD",
      location: "MARSUR GATE",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      features: ["Premium Amenities", "Gated Community", "24/7 Security"],
      completion: "Dec 2024"
    },
    {
      id: 2,
      name: "HIGH RISE",
      type: "UPCOMING",
      bedrooms: "2 & 3 BHK",
      units: "120 UNITS",
      price: "60 LAKHS ONWARD",
      location: "CHANDAPURA MAIN ROAD",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      features: ["Sky Lounge", "Swimming Pool", "Gym & Spa"],
      completion: "Q2 2025"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-primary border-primary">
            Our Portfolio
          </Badge>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-8">
            OUR PROJECTS
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover our carefully crafted residential projects that blend luxury with modern living
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => {
            const isExpanded = expandedProject === project.id;

            return (
              <div key={project.id} className="group">
                <div className="relative overflow-hidden rounded-3xl h-80 card-shadow hover:shadow-3d transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <Badge
                      variant={project.type === "ONGOING" ? "default" : "secondary"}
                      className={`${project.type === "ONGOING" ? "bg-green-500" : "bg-primary"} text-white px-3 py-1 text-xs font-semibold mb-3`}
                    >
                      {project.type}
                    </Badge>
                    <h3 className="font-heading font-bold text-3xl text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/80 text-sm">{project.location}</p>
                  </div>
                  <button
                    onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-card rounded-3xl p-8 card-shadow">
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Configuration</p>
                        <p className="font-semibold text-foreground">{project.bedrooms}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Total Units</p>
                        <p className="font-semibold text-foreground">{project.units}</p>
                      </div>
                      <div className="text-center">
                        <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">Completion</p>
                        <p className="font-semibold text-foreground">{project.completion}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-accent/30">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-foreground font-medium">{project.location}</p>
                    </div>

                    <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-card">
                      <IndianRupee className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-foreground font-bold text-lg">{project.price}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-primary border-primary/30 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => window.open(`/project/${project.id}`, '_blank')}
                        className="flex-1 bg-primary text-primary-foreground hover:elevated-shadow transition-all duration-300"
                        size="sm"
                      >
                        Full Details
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        onClick={() => setBrochureDialog({isOpen: true, projectName: project.name, projectId: project.id})}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        size="sm"
                      >
                        Brochure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-20">
          <p className="text-2xl text-muted-foreground mb-10">
            Interested in learning more about our projects?
          </p>
          <Button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            size="lg"
            className="bg-primary text-primary-foreground px-16 py-6 text-xl minimal-shadow hover:elevated-shadow transition-all duration-300"
          >
            View All Projects
          </Button>
        </div>
      </div>

      <DownloadBrochureDialog
        isOpen={brochureDialog.isOpen}
        onClose={() => setBrochureDialog({isOpen: false, projectName: "", projectId: 0})}
        projectName={brochureDialog.projectName}
        projectId={brochureDialog.projectId}
      />
    </section>
  );
};

export default Projects;
