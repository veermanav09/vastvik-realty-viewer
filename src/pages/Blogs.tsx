import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogs = [
  { id: 17, title: "The Importance of Amenities in Modern Residential Projects", excerpt: "Today's homebuyers expect more than four walls. Amenities like swimming pools, gyms, parks, and community halls define lifestyle quality and influence buying decisions.", image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&h=600&fit=crop", category: "Lifestyle", author: "Vastvik Team", date: "Mar 27, 2026", readTime: "7 min" },
  { id: 16, title: "Tax Benefits of Buying Your First Home in India", excerpt: "First-time homebuyers in India enjoy significant tax deductions under Sections 80C, 24(b), and 80EEA. Understanding these benefits can save you lakhs annually.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop", category: "Buying Guide", author: "Vastvik Team", date: "Mar 21, 2026", readTime: "6 min" },
  { id: 15, title: "Why Electronic City Corridor is Bangalore's Fastest Growing Belt", excerpt: "Electronic City and its surrounding corridors are witnessing unprecedented growth driven by IT expansion, metro planning, and new residential developments.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", category: "Location Guide", author: "Vastvik Team", date: "Mar 15, 2026", readTime: "8 min" },
  { id: 14, title: "Rental Income vs Capital Appreciation: What Matters More?", excerpt: "Investors often debate between rental yield and capital gains. Understanding both metrics helps you build a balanced real estate portfolio.", image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&h=600&fit=crop", category: "Investment", author: "Vastvik Team", date: "Mar 9, 2026", readTime: "7 min" },
  { id: 13, title: "Smart Home Features Every Modern Apartment Should Have", excerpt: "From automated lighting to smart security systems, modern apartments are integrating technology to enhance convenience, safety, and energy efficiency.", image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop", category: "Lifestyle", author: "Vastvik Team", date: "Mar 3, 2026", readTime: "6 min" },
  { id: 12, title: "How Infrastructure Development Impacts Real Estate Prices", excerpt: "New metro lines, ring roads, and expressways can transform property values overnight. Learn how to identify infrastructure-driven investment opportunities.", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop", category: "Investment Guide", author: "Vastvik Team", date: "Feb 25, 2026", readTime: "8 min" },
  { id: 11, title: "The Rise of 2 & 3 BHK Apartments in Bangalore's Suburban Growth", excerpt: "Suburban Bangalore is seeing massive demand for 2 and 3 BHK apartments as young professionals and families seek affordable yet well-connected homes.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop", category: "Market Trends", author: "Vastvik Team", date: "Feb 19, 2026", readTime: "7 min" },
  { id: 10, title: "Why Location Near IT Hubs Drives Property Value in Bangalore", excerpt: "Proximity to tech parks like Electronic City, Whitefield, and Manyata drives both rental demand and capital appreciation in Bangalore's property market.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop", category: "Investment", author: "Vastvik Team", date: "Feb 13, 2026", readTime: "7 min" },
  { id: 9, title: "Understanding Home Loan Interest Rates in 2026", excerpt: "With RBI policy changes and competitive lending, understanding home loan rates is crucial for maximizing your purchasing power in today's market.", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop", category: "Home Loans", author: "Vastvik Team", date: "Feb 7, 2026", readTime: "6 min" },
  { id: 8, title: "5 Reasons Gated Communities Are the Future of Urban Living", excerpt: "Gated communities offer security, amenities, and community living that standalone apartments cannot match. Here's why they're becoming the preferred choice.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", category: "Lifestyle", author: "Vastvik Team", date: "Feb 1, 2026", readTime: "6 min" },
  { id: 7, title: "RERA: How It Protects Home Buyers in Karnataka", excerpt: "The Real Estate Regulatory Authority has transformed property buying in Karnataka. Learn how RERA safeguards your investment and ensures builder accountability.", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop", category: "Buying Guide", author: "Vastvik Team", date: "Jan 26, 2026", readTime: "7 min" },
  { id: 6, title: "How South Bangalore is Emerging as the Next Real Estate Hotspot", excerpt: "With Electronic City expansion, new metro routes, and affordable pricing, South Bangalore is rapidly becoming the most sought-after real estate destination.", image: "https://images.unsplash.com/photo-1582407947092-5e132efc909f?w=800&h=600&fit=crop", category: "Location Guide", author: "Vastvik Team", date: "Jan 20, 2026", readTime: "8 min" },
  { id: 5, title: "Why Real Estate is the Best Inflation-Beating Asset in 2025", excerpt: "Inflation has been consistently eroding savings, increasing costs across essential sectors. Unlike traditional savings instruments, real estate grows alongside inflation, protecting capital and generating income.", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop", category: "Investment", author: "Vastvik Team", date: "Jan 15, 2026", readTime: "8 min" },
  { id: 4, title: "Real Estate Investment in 2025 — A Smart Guide for Home Buyers & Investors", excerpt: "Real estate remains one of the safest and most rewarding asset classes in 2025. Unlike volatile markets, property investment offers stability, rental income, and long-term appreciation.", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop", category: "Investment Guide", author: "Vastvik Team", date: "Dec 27, 2025", readTime: "10 min" },
  { id: 1, title: "Top 10 Tips for First-Time Home Buyers", excerpt: "Essential tips for smooth home buying.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", category: "Buying Guide", author: "Vastvik Team", date: "Oct 1, 2025", readTime: "5 min" },
  { id: 2, title: "Understanding Real Estate Investment Returns", excerpt: "Calculate and maximize your returns.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop", category: "Investment", author: "Vastvik Team", date: "Sep 28, 2025", readTime: "7 min" },
  { id: 3, title: "The Future of Sustainable Living in Urban Areas", excerpt: "Modern urban apartments are incorporating eco-friendly features that benefit both residents and the planet.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", category: "Lifestyle", author: "Vastvik Team", date: "Sep 25, 2025", readTime: "6 min" }
];

const Blogs = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogs.map((b) => b.category)));
    return ["All", ...cats];
  }, []);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-heading font-bold text-5xl md:text-6xl mb-6">Real Estate Blog</h1>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="bg-card rounded-3xl overflow-hidden card-shadow hover:shadow-3d transition-all cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                <div className="relative h-56"><img src={blog.image} alt={blog.title} className="w-full h-full object-cover" /></div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs text-primary border-primary/30">{blog.category}</Badge>
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

          {filteredBlogs.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No articles found in this category.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
