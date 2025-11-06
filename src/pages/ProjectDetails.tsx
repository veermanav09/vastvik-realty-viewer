import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bed, Users, IndianRupee, Calendar, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    { 
      id: 1, 
      name: "ELEMENT", 
      type: "ONGOING", 
      bedrooms: "2 & 3 BHK", 
      units: "60 UNITS", 
      price: "45 LAKHS ONWARD", 
      location: "MARSUR GATE", 
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", 
      features: ["Premium Amenities", "Gated Community", "24/7 Security"], 
      completion: "April 2027", 
      description: "Vastvik Element is a luxury residential apartment project recently launched by Vastvik Realty at Marsur Gate, off Chandapura Road near Electronic City in South East Bangalore. Element comprises some of the best luxuries of living, offering expansive 2 and 3 BHK apartments set amidst beautifully landscaped open spaces. The project prioritizes comfort and an elite lifestyle for the residents who value quality and convenience.",
      fullDescription: "Situated at prime area in Marsur Gate, it connects with the Outer Ring Road, Electronic City, Sarjapur Road and HSR Layout and, thus connects perfect residential neighborhoods to main business areas.",
      address: "Sy.No-340/2&3, Marsur gate, opp M tres school, chandapura, anekal main road, bengaluru -562106",
      amenities: ["Swimming Pool", "Gym", "Jogging Track", "Outdoor Gym", "Event Plaza", "Flex Court", "Pet Park", "Elders Park Seater", "Yoga Deck", "Seater Area", "Banquet Hall", "Deck Area", "Sand Pit", "Toddlers Pit", "Security Room", "Store Room", "Transformer"],
      nearbyEducation: ["Sri Chaitanya School", "SFS Academy", "National Public School", "D-Sales Academy", "Swami Vivekanada College", "Alliance University", "Spoorthi Institute"],
      nearbyHospitals: ["Narayana Institution", "Oxford Medical Institute", "Best Hospital", "Athreya Hospital", "Sparsh Hospital"],
      nearbyCorporate: ["Infosys", "Biocon", "Tech Machindra", "TCS", "Siemens", "Wipro"],
      nearbyRetail: ["M5", "Royal Mart", "D Mart", "Metro Cash and Carry"],
      gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"] 
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
      completion: "Q2 2025", 
      description: "HIGH RISE offers luxury high-rise living with stunning city views and world-class amenities.", 
      fullDescription: "A perfect blend of luxury and convenience on Chandapura Main Road, designed for those who seek elevated living experiences.",
      address: "Survey No. 128, Chandapura Main Road, Near Tech Park, Bangalore - 560099",
      amenities: ["Sky Lounge", "Infinity Pool", "Spa & Wellness", "Co-working Space", "Multi-purpose Hall", "Reserved Parking"], 
      nearbyEducation: [],
      nearbyHospitals: [],
      nearbyCorporate: [],
      nearbyRetail: [],
      gallery: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop"] 
    }
  ];

  const project = projects.find(p => p.id === parseInt(id || "1"));
  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <Button onClick={() => navigate(-1)} variant="ghost" className="mb-8"><ArrowLeft className="mr-2 h-4 w-4" />Back to Projects</Button>
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <Badge className={`${project.type === "ONGOING" ? "bg-green-500" : "bg-primary"} text-white mb-4`}>{project.type}</Badge>
              <h1 className="font-heading font-bold text-5xl text-white mb-2">{project.name}</h1>
              <div className="flex items-center text-white/90 text-xl"><MapPin className="w-5 h-5 mr-2" />{project.location}</div>
            </div>
          </div>
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
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {project.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-accent/30">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {project.nearbyEducation && (
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

              <div className="bg-card rounded-3xl p-8 card-shadow">
                <h2 className="font-heading font-bold text-3xl mb-4">Location</h2>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/30">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{project.address}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card rounded-3xl p-8 card-shadow sticky top-24">
                <h3 className="font-heading font-bold text-2xl mb-6">Interested?</h3>
                <Button onClick={() => navigate(`/download-brochure/${project.id}`)} className="w-full bg-primary mb-4" size="lg"><Download className="mr-2 h-5 w-5" />Download Brochure</Button>
                <Button onClick={() => window.open('https://wa.me/918884545404', '_blank')} variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white" size="lg">WhatsApp Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetails;
