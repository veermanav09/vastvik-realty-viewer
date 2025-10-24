import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blogs = () => {
  const navigate = useNavigate();
  const blogs = [
    { id: 1, title: "Top 10 Tips for First-Time Home Buyers", excerpt: "Essential tips for smooth home buying.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", category: "Buying Guide", author: "Vastvik Team", date: "Oct 1, 2025", readTime: "5 min" },
    { id: 2, title: "Understanding Real Estate Investment Returns", excerpt: "Calculate and maximize your returns.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", category: "Investment", author: "Vastvik Team", date: "Sep 28, 2025", readTime: "7 min" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">Real Estate Blog</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-card rounded-3xl overflow-hidden card-shadow hover:shadow-3d transition-all cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                <div className="relative h-56"><img src={blog.image} alt={blog.title} className="w-full h-full object-cover" /></div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{blog.date}</div>
                    <div className="flex items-center"><User className="w-4 h-4 mr-1" />{blog.author}</div>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">{blog.title}</h3>
                  <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
