import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ArrowRight, Home, Users, Building2, BookOpen, Mail, Gift } from "lucide-react";

const Overview = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "home",
      title: "Home",
      subtitle: "Where Dreams Find Home",
      description: "Explore our architectural masterpieces",
      icon: Home,
      color: "from-primary/20 to-secondary/20",
      size: "lg:col-span-2 lg:row-span-2",
      route: "/",
    },
    {
      id: "about",
      title: "About Us",
      subtitle: "Our Philosophy",
      description: "Building legacies, creating sanctuaries",
      icon: Users,
      color: "from-accent/30 to-primary/10",
      size: "lg:col-span-1",
      route: "/about",
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "Element & High Rise",
      description: "Meticulously crafted residences",
      icon: Building2,
      color: "from-secondary/20 to-accent/30",
      size: "lg:col-span-2",
      route: "/projects",
    },
    {
      id: "blogs",
      title: "Expert Insights",
      subtitle: "Industry Intelligence",
      description: "Market wisdom and trends",
      icon: BookOpen,
      color: "from-primary/10 to-secondary/30",
      size: "lg:col-span-1",
      route: "/blogs",
    },
    {
      id: "referral",
      title: "Referral Program",
      subtitle: "Earn Up to 2%",
      description: "Share excellence, reap rewards",
      icon: Gift,
      color: "from-accent/20 to-primary/20",
      size: "lg:col-span-1 lg:row-span-1",
      route: "/referral",
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Reach Out",
      description: "Begin your journey today",
      icon: Mail,
      color: "from-secondary/30 to-primary/10",
      size: "lg:col-span-1",
      route: "/contact",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d2e] via-[#4a1942] to-[#c2185b] animate-gradient-shift opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#334155] mix-blend-overlay animate-gradient-slow opacity-60"></div>
      </div>

      {/* Animated gradient styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-5%, 5%) scale(1.1);
          }
          50% {
            transform: translate(5%, -5%) scale(1.05);
          }
          75% {
            transform: translate(-3%, 3%) scale(1.08);
          }
        }
        
        @keyframes gradient-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(3%, 3%) rotate(2deg);
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 30s ease-in-out infinite;
        }
      `}</style>

      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6">
              Site Overview
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-body max-w-3xl mx-auto">
              Navigate through every corner of Vastvik Realty
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  onClick={() => navigate(section.route)}
                  className={`${section.size} group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} backdrop-blur-xl`}></div>
                  
                  {/* Glass Effect Border */}
                  <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <ArrowRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <h3 className="font-heading font-bold text-3xl text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-white/80 text-lg font-semibold mb-3">
                        {section.subtitle}
                      </p>
                      <p className="text-white/60 text-sm font-body">
                        {section.description}
                      </p>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Overview;
