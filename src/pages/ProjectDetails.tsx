import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bed, Users, IndianRupee, Calendar, Download, FileText, Waves, Dumbbell, Route, PartyPopper, CircleDot, Dog, Armchair, Sparkles, Baby, Shield, Building2, Laptop, Car, ChevronUp, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectMap from "@/components/ProjectMap";
import elementImage from "@/assets/element-project.png";
import highriseImage from "@/assets/highrise-project.png";
import { useState } from "react";
import ExpressionOfInterestDialog from "@/components/ExpressionOfInterestDialog";

const iconMap: Record<string, React.ElementType> = {
  Waves, Dumbbell, Route, PartyPopper, CircleDot, Dog, Armchair, Sparkles, Baby, Shield, Building2, Laptop, Car, Users
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eoiDialog, setEoiDialog] = useState<{isOpen: boolean, projectName: string, projectId: number}>({
    isOpen: false,
    projectName: "",
    projectId: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      description: "Vastvik Element is a luxury residential apartment project recently launched by Vastvik Realty at Marsur Gate, off Chandapura Road near Electronic City in South East Bangalore. Element comprises some of the best luxuries of living, offering expansive 2 and 3 BHK apartments set amidst beautifully landscaped open spaces. The project prioritizes comfort and an elite lifestyle for the residents who value quality and convenience.",
      fullDescription: "Situated at prime area in Marsur Gate, it connects with the Outer Ring Road, Electronic City, Sarjapur Road and HSR Layout and, thus connects perfect residential neighborhoods to main business areas.",
      address: "Sy.No-340/2&3, Marsur gate, opp M tres school, chandapura, anekal main road, bengaluru -562106",
      amenities: [
        { name: "Swimming Pool", icon: "Waves" },
        { name: "Gym", icon: "Dumbbell" },
        { name: "Jogging Track", icon: "Route" },
        { name: "Event Plaza", icon: "PartyPopper" },
        { name: "Sports Court", icon: "CircleDot" },
        { name: "Pet Park", icon: "Dog" },
        { name: "Elders Seating", icon: "Armchair" },
        { name: "Yoga Deck", icon: "Sparkles" },
        { name: "Banquet Hall", icon: "Users" },
        { name: "Children's Play Area", icon: "Baby" },
        { name: "24/7 Security", icon: "Shield" }
      ],
      nearbyEducation: ["Sri Chaitanya School", "SFS Academy", "National Public School", "D-Sales Academy", "Swami Vivekanada College", "Alliance University", "Spoorthi Institute"],
      nearbyHospitals: ["Narayana Institution", "Oxford Medical Institute", "Best Hospital", "Athreya Hospital", "Sparsh Hospital"],
      nearbyCorporate: ["Infosys", "Biocon", "Tech Machindra", "TCS", "Siemens", "Wipro"],
      nearbyRetail: ["M5", "Royal Mart", "D Mart", "Metro Cash and Carry"],
      gallery: [elementImage, elementImage, elementImage, elementImage] 
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
      description: "HIGH RISE offers luxury high-rise living with stunning city views and world-class amenities.", 
      fullDescription: "A perfect blend of luxury and convenience on Chandapura Main Road, designed for those who seek elevated living experiences.",
      address: "Survey No. 128, Chandapura Main Road, Near Tech Park, Bangalore - 560099",
      amenities: [
        { name: "Sky Lounge", icon: "Building2" },
        { name: "Infinity Pool", icon: "Waves" },
        { name: "Spa & Wellness", icon: "Sparkles" },
        { name: "Co-working Space", icon: "Laptop" },
        { name: "Multi-purpose Hall", icon: "Users" },
        { name: "Reserved Parking", icon: "Car" }
      ],
      nearbyEducation: [],
      nearbyHospitals: [],
      nearbyCorporate: [],
      nearbyRetail: [],
      gallery: [highriseImage, highriseImage, highriseImage, highriseImage] 
    }
  ];

  const project = projects.find(p => p.id === parseInt(id || "1"));
  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen">
      <Header />
      {/* Full-page Hero Image */}
      <div className="relative h-screen w-full">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {/* Back Button */}
          <div className="container mx-auto px-4 lg:px-8 pt-8">
            <Button onClick={() => navigate(-1)} variant="ghost" className="text-white hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />Back to Projects
            </Button>
          </div>
          
          {/* Project Info */}
          <div className="container mx-auto px-4 lg:px-8 pb-16">
            <Badge className={`${project.type === "ONGOING" ? "bg-green-500" : "bg-primary"} text-white mb-4 text-base px-4 py-2`}>
              {project.type}
            </Badge>
            <h1 className="font-heading font-bold text-6xl md:text-7xl lg:text-8xl text-white mb-4">
              {project.name}
            </h1>
            <div className="flex items-center text-white/90 text-2xl">
              <MapPin className="w-6 h-6 mr-3" />
              {project.location}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card rounded-3xl p-8 card-shadow">
                <h2 className="font-heading font-bold text-3xl mb-4">About This Project</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">{project.description}</p>
                {project.fullDescription && (
                  <p className="text-muted-foreground text-lg leading-relaxed">{project.fullDescription}</p>
                )}
              </div>

              <div className="bg-card rounded-3xl p-8 card-shadow">
                <h2 className="font-heading font-bold text-3xl mb-6">Project Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bed className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Configuration</p>
                      <p className="font-semibold text-lg">{project.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Units</p>
                      <p className="font-semibold text-lg">{project.units}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Starting Price</p>
                      <p className="font-semibold text-lg">{project.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completion</p>
                      <p className="font-semibold text-lg">{project.completion}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 card-shadow">
                <h2 className="font-heading font-bold text-3xl mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {project.amenities.map((amenity: {name: string, icon: string}, index: number) => {
                    const IconComponent = iconMap[amenity.icon];
                    return (
                      <div key={index} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors">
                        {IconComponent && <IconComponent className="w-12 h-12 stroke-[2.5]" />}
                        <span className="text-sm font-medium text-center leading-tight">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {project.nearbyEducation && project.nearbyEducation.length > 0 && (
                <div className="bg-card rounded-3xl p-8 card-shadow">
                  <h2 className="font-heading font-bold text-3xl mb-6">Nearby Locations</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-primary">Educational Institutions</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.nearbyEducation.map((place, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-primary">Hospitals</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.nearbyHospitals.map((place, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-primary">Corporate Hubs</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.nearbyCorporate.map((place, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-xl mb-3 text-primary">Retail & Entertainment</h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.nearbyRetail.map((place, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {place}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Map for Element Project */}
              {project.id === 1 && (
                <ProjectMap
                  projectName={project.name}
                  projectLocation={{ lat: 12.8184, lng: 77.7065 }}
                  nearbyPlaces={[
                    { name: "M tres School", category: "education", lat: 12.8190, lng: 77.7070 },
                    { name: "National Public School", category: "education", lat: 12.8200, lng: 77.7100 },
                    { name: "Narayana Hospital", category: "hospital", lat: 12.8150, lng: 77.7080 },
                    { name: "Infosys", category: "corporate", lat: 12.8300, lng: 77.7200 },
                    { name: "TCS", category: "corporate", lat: 12.8250, lng: 77.7150 },
                    { name: "D Mart", category: "retail", lat: 12.8170, lng: 77.7090 },
                  ]}
                />
              )}

              <div className="bg-card rounded-3xl p-8 card-shadow">
                <h2 className="font-heading font-bold text-3xl mb-4">Location</h2>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{project.address}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              {/* Vertical Image Carousel */}
              <div className="bg-card rounded-3xl p-6 card-shadow sticky top-24 mb-6">
                <h3 className="font-heading font-bold text-2xl mb-4">Project Gallery</h3>
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={project.gallery[currentImageIndex]} 
                      alt={`${project.name} view ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex gap-2 justify-center mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? project.gallery.length - 1 : prev - 1)}
                      className="h-10 w-10 p-0"
                    >
                      <ChevronUp className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentImageIndex(prev => prev === project.gallery.length - 1 ? 0 : prev + 1)}
                      className="h-10 w-10 p-0"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Thumbnail Strip */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {project.gallery.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-3xl p-8 card-shadow sticky top-24">
                <h3 className="font-heading font-bold text-2xl mb-6">Interested?</h3>
                {project.id === 2 ? (
                  <Button 
                    onClick={() => setEoiDialog({isOpen: true, projectName: project.name, projectId: project.id})} 
                    className="w-full bg-primary mb-4" 
                    size="lg"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Express Interest
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate(`/download-brochure/${project.id}`)} 
                    className="w-full bg-primary mb-4" 
                    size="lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Brochure
                  </Button>
                )}
                <Button onClick={() => window.open('https://wa.me/918884545404', '_blank')} variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" size="lg">WhatsApp Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ExpressionOfInterestDialog
        isOpen={eoiDialog.isOpen}
        onClose={() => setEoiDialog({isOpen: false, projectName: "", projectId: 0})}
        projectName={eoiDialog.projectName}
        projectId={eoiDialog.projectId}
      />
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;
