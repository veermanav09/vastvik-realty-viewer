import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogFullArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogData: Record<string, any> = {
    "4": {
      title: "Real Estate Investment in 2025 — A Smart Guide for Home Buyers & Investors",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=600&fit=crop",
      category: "Investment Guide",
      author: "Vastvik Team",
      date: "Dec 27, 2025",
      readTime: "10 min",
      content: `
        <p class="lead">The real estate market in 2025 is evolving into a more mature, transparent, and infrastructure-driven investment ecosystem. For home buyers and investors, real estate is no longer just about owning land or a home; it's about identifying growth pockets that will shape the next decade.</p>

        <h2>Why Real Estate Still Matters</h2>
        <p>Real estate is one of the few asset classes that:</p>
        <ul>
          <li>Protects wealth against inflation</li>
          <li>Generates rental income that increases annually</li>
          <li>Offers resale liquidity when located strategically</li>
          <li>Allows leverage through home loans</li>
          <li>Benefits from infrastructure announcements</li>
          <li>Provides tangible ownership, unlike digital assets</li>
        </ul>

        <h2>Bangalore's Investment Strength</h2>
        <p>Bangalore remains one of India's strongest real estate markets due to:</p>
        <ul>
          <li>Expansion of IT parks and startup ecosystem</li>
          <li>Continuous influx of skilled professionals</li>
          <li>Growing demand for residential and commercial assets</li>
          <li>Strong rental market</li>
          <li>Limited land availability in city center pushing outward expansion</li>
          <li>Infrastructure-led price momentum</li>
        </ul>

        <h2>Shift Toward South Bangalore</h2>
        <p>South Bangalore is outperforming expectations due to:</p>
        <ul>
          <li>Proximity to Electronic City — a massive IT employment hub</li>
          <li>Industrial migration southward</li>
          <li>Affordable pricing compared to North Bangalore</li>
          <li>Planned metro expansions</li>
          <li>New expressway and ring road ecosystems (SRR & ORR)</li>
          <li>Improved highway networks like Hosur Road</li>
          <li>Rising investor interest in micro-markets like the Marsur-Chandapura belt</li>
        </ul>

        <h2>Investment Strategy Checklist 2025</h2>
        <p>To invest smart, buyers must evaluate:</p>
        <table class="investment-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Importance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Builder credibility</td>
              <td>Ensures project reliability and resale confidence</td>
            </tr>
            <tr>
              <td>Legal compliance (RERA, land approvals)</td>
              <td>Protects buyer investment</td>
            </tr>
            <tr>
              <td>Infrastructure adjacency</td>
              <td>Drives appreciation and rental demand</td>
            </tr>
            <tr>
              <td>Pricing entry point</td>
              <td>Early entry = higher appreciation %</td>
            </tr>
            <tr>
              <td>Rental viability</td>
              <td>Ensures cash flow during holding period</td>
            </tr>
            <tr>
              <td>Resale liquidity</td>
              <td>Demand confidence improves resale cycles</td>
            </tr>
          </tbody>
        </table>

        <h2>Audience Relevance</h2>
        <p>Elements fit every audience segment:</p>
        <ul>
          <li><strong>Families & End-users</strong> → Liveability + future commute reliability</li>
          <li><strong>Rental Investors</strong> → Growing workforce housing demand</li>
          <li><strong>ROI Investors</strong> → Positioned before price cycle surge</li>
          <li><strong>Young professionals</strong> → South Bangalore adjacency benefits</li>
          <li><strong>General market readers</strong> → Growth narrative + smart investment thesis</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Real estate investment in 2025 favours buyers who think beyond today's market into tomorrow's infrastructure ecosystem. Bangalore, especially the southern corridor, is absorbing demand rapidly. Projects like <strong>Elements by Vastvik Realty</strong> near Marsur Gate, Chandapura offer a rare mix of affordability, credibility, and future growth relevance — making it one of the smartest early-stage investments for 2025 and beyond.</p>
      `
    }
  };

  const blog = blogData[id || ""];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blogs')}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(`/blog/${id}`)}
            className="mb-8 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Summary
          </Button>

          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{blog.category}</Badge>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-foreground">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
              <span>{blog.readTime} read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[300px] md:h-[400px] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-8 blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              color: 'hsl(var(--foreground))',
            }}
          />
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogFullArticle;
