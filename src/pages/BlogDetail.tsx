import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogData: Record<string, any> = {
    "1": {
      title: "Top 10 Tips for First-Time Home Buyers in Bangalore",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
      category: "Buying Guide",
      author: "Vastvik Team",
      date: "Oct 1, 2025",
      readTime: "5 min",
      content: `
        <h2>Introduction</h2>
        <p>Buying your first home is an exciting milestone, but it can also be overwhelming. The Bangalore real estate market is dynamic and competitive, making it essential to be well-prepared. Here are our top 10 tips to help you navigate this journey successfully.</p>

        <h2>1. Set a Realistic Budget</h2>
        <p>Before you start house hunting, determine how much you can afford. Consider not just the property price, but also registration costs, stamp duty, maintenance charges, and furnishing expenses. A general rule is that your EMI should not exceed 40% of your monthly income.</p>

        <h2>2. Check Your Credit Score</h2>
        <p>A good credit score (750 or above) can help you secure better home loan interest rates. Review your credit report and rectify any errors well in advance of applying for a loan.</p>

        <h2>3. Research the Location Thoroughly</h2>
        <p>Bangalore's infrastructure is constantly evolving. Look for areas with good connectivity, proximity to workplaces, schools, hospitals, and entertainment hubs. Consider future development plans that might affect property values.</p>

        <h2>4. Verify Legal Documents</h2>
        <p>Always verify the property's legal documents including title deeds, encumbrance certificates, and RERA registration. Hire a lawyer to ensure there are no legal disputes or hidden liabilities.</p>

        <h2>5. Compare Home Loan Options</h2>
        <p>Don't settle for the first loan offer you receive. Compare interest rates, processing fees, and prepayment charges across multiple banks and financial institutions to find the best deal.</p>

        <h2>6. Inspect the Property Personally</h2>
        <p>Always visit the property multiple times at different hours. Check for structural issues, water supply, drainage, ventilation, and overall build quality. If buying a resale property, inquire about the building's maintenance history.</p>

        <h2>7. Understand RERA Guidelines</h2>
        <p>All real estate projects must be registered under RERA. Check the RERA registration number and project details on the official RERA website to ensure transparency and accountability.</p>

        <h2>8. Factor in Hidden Costs</h2>
        <p>Beyond the property price, budget for registration charges (approximately 7-8% in Karnataka), stamp duty, GST (if applicable), parking charges, and initial maintenance deposits.</p>

        <h2>9. Don't Skip Home Insurance</h2>
        <p>Protect your investment with comprehensive home insurance. It covers damages from natural disasters, theft, and other unforeseen events, giving you peace of mind.</p>

        <h2>10. Take Your Time</h2>
        <p>Don't rush into a decision due to pressure tactics. Take your time to evaluate all options, compare properties, and make an informed choice that aligns with your long-term goals.</p>

        <h2>Conclusion</h2>
        <p>Buying your first home in Bangalore doesn't have to be stressful. With proper research, financial planning, and expert guidance, you can find the perfect property that meets your needs and budget. At Vastvik, we're committed to making your home-buying journey smooth and successful.</p>
      `,
      externalLink: "https://example.com/full-article-first-time-buyers"
    },
    "2": {
      title: "Understanding Real Estate Investment Returns",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
      category: "Investment",
      author: "Vastvik Team",
      date: "Sep 28, 2025",
      readTime: "7 min",
      content: `
        <h2>Introduction</h2>
        <p>Real estate has long been considered one of the most reliable investment avenues in India. However, understanding how to calculate and maximize your returns is crucial for making informed investment decisions. This guide will walk you through the key metrics and strategies.</p>

        <h2>Key Metrics for Measuring Returns</h2>
        
        <h3>1. Capital Appreciation</h3>
        <p>This is the increase in property value over time. Bangalore has historically seen an average appreciation rate of 8-12% annually in prime locations. Factors affecting appreciation include infrastructure development, connectivity, and neighborhood growth.</p>

        <h3>2. Rental Yield</h3>
        <p>Rental yield is calculated as (Annual Rent / Property Value) × 100. In Bangalore, typical rental yields range from 2-4%. Areas near IT corridors and educational institutions often command higher yields.</p>

        <h3>3. Return on Investment (ROI)</h3>
        <p>ROI considers both rental income and capital appreciation. A healthy ROI in Bangalore's real estate market typically ranges from 10-15% annually when both factors are combined.</p>

        <h2>Factors Affecting Real Estate Returns</h2>
        
        <h3>Location and Infrastructure</h3>
        <p>Properties near upcoming metro lines, tech parks, and major roads tend to appreciate faster. The Bangalore Metro expansion has significantly boosted property values in areas like Whitefield, Electronic City, and Yeshwantpur.</p>

        <h3>Property Type</h3>
        <p>Residential properties offer steady returns through rentals, while commercial properties can provide higher yields but come with different risks and tenant dynamics.</p>

        <h3>Market Timing</h3>
        <p>Real estate markets are cyclical. Buying during market corrections and holding for the long term typically yields better returns than trying to time the market perfectly.</p>

        <h2>Tax Implications</h2>
        <p>Understanding tax benefits can significantly improve your net returns. Home loan interest (up to ₹2 lakhs) and principal repayment (up to ₹1.5 lakhs) are tax-deductible under Sections 24(b) and 80C respectively.</p>

        <h2>Strategies to Maximize Returns</h2>
        
        <h3>1. Buy in Emerging Locations</h3>
        <p>Areas undergoing infrastructure development offer higher appreciation potential. Research upcoming projects and government initiatives in your target area.</p>

        <h3>2. Focus on Rental Demand</h3>
        <p>Properties near IT hubs, universities, and hospitals have consistent rental demand, ensuring steady cash flow while you benefit from long-term appreciation.</p>

        <h3>3. Maintain Your Property</h3>
        <p>Well-maintained properties command better rents and higher resale values. Regular upkeep and timely renovations can significantly boost returns.</p>

        <h3>4. Leverage Smartly</h3>
        <p>Using home loans wisely can amplify returns through leverage while providing tax benefits. However, ensure your rental income covers a significant portion of the EMI.</p>

        <h2>Conclusion</h2>
        <p>Real estate investment in Bangalore offers compelling returns when approached strategically. By understanding key metrics, choosing the right location, and maintaining a long-term perspective, investors can build substantial wealth through property investments.</p>
      `,
      externalLink: "https://example.com/full-article-investment-returns"
    },
    "3": {
      title: "The Future of Sustainable Living in Urban Areas",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
      category: "Lifestyle",
      author: "Vastvik Team",
      date: "Sep 25, 2025",
      readTime: "6 min",
      content: `
        <h2>Introduction</h2>
        <p>As cities grow denser and environmental concerns intensify, sustainable living is no longer a luxury—it's a necessity. Modern urban apartments in Bangalore are increasingly incorporating eco-friendly features that benefit both residents and the planet.</p>

        <h2>Key Sustainable Features in Modern Apartments</h2>
        
        <h3>1. Energy-Efficient Design</h3>
        <p>Modern buildings are incorporating passive cooling techniques, energy-efficient lighting, and smart building management systems that can reduce energy consumption by up to 40%.</p>

        <h3>2. Solar Power Integration</h3>
        <p>Rooftop solar panels are becoming standard in premium residential projects. They not only reduce electricity bills but also decrease the building's carbon footprint significantly.</p>

        <h3>3. Rainwater Harvesting</h3>
        <p>With Bangalore facing water scarcity issues, rainwater harvesting systems are now mandatory in all new constructions. These systems can reduce dependency on municipal water supply by 30-50%.</p>

        <h3>4. Waste Management Systems</h3>
        <p>Advanced composting units, segregation facilities, and waste-to-energy systems are being implemented to achieve zero-waste communities.</p>

        <h3>5. Green Spaces and Vertical Gardens</h3>
        <p>Incorporating green spaces, terrace gardens, and vertical greening not only improves air quality but also provides residents with calming, nature-connected environments.</p>

        <h2>Benefits of Sustainable Living</h2>
        
        <h3>Financial Savings</h3>
        <p>Sustainable features lead to significant savings on utility bills. Solar power, rainwater harvesting, and energy-efficient appliances can reduce monthly expenses by 20-30%.</p>

        <h3>Health and Wellbeing</h3>
        <p>Better air quality, natural lighting, and green spaces contribute to improved physical and mental health for residents.</p>

        <h3>Higher Property Values</h3>
        <p>Green-certified buildings command premium prices and have better resale value. Properties with sustainability certifications appreciate 5-7% faster than conventional buildings.</p>

        <h2>Technology Driving Sustainable Living</h2>
        
        <h3>Smart Home Systems</h3>
        <p>IoT-enabled devices optimize energy usage by automatically adjusting lighting, temperature, and appliances based on occupancy and preferences.</p>

        <h3>Water Management Technologies</h3>
        <p>Advanced sensors and treatment systems ensure efficient water usage and recycling, crucial in water-stressed cities like Bangalore.</p>

        <h3>Building Materials</h3>
        <p>Use of recycled materials, low-VOC paints, and sustainable construction methods reduce environmental impact during and after construction.</p>

        <h2>Government Initiatives</h2>
        <p>The Karnataka government has introduced various incentives for green buildings, including reduced property tax rates and expedited approval processes for projects meeting sustainability standards.</p>

        <h2>The Road Ahead</h2>
        <p>The future of urban living in Bangalore lies in creating communities that balance modern amenities with environmental responsibility. As awareness grows and technology advances, sustainable features will become standard rather than premium offerings.</p>

        <h2>Conclusion</h2>
        <p>Sustainable living is not just about saving the environment—it's about creating healthier, more economical, and future-ready homes. At Vastvik, we're committed to developing properties that embrace these principles, ensuring our residents enjoy the best of modern living while contributing to a sustainable future.</p>
      `,
      externalLink: "https://example.com/full-article-sustainable-living"
    }
  };

  const blog = blogData[id || "1"];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
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
            onClick={() => navigate('/blogs')}
            className="mb-8 -ml-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Button>

          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{blog.category}</Badge>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-foreground">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
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
          <div className="relative h-[400px] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          {/* SECURITY NOTE: dangerouslySetInnerHTML is safe here because blog.content 
              is hardcoded in this component, not user-generated. If this ever changes 
              to load from a database with user input, you MUST sanitize with DOMPurify */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              color: 'hsl(var(--foreground))',
            }}
          />

          {/* Read in Detail Link */}
          <div className="border-t border-border pt-8">
            <Button
              onClick={() => window.open(blog.externalLink, '_blank')}
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              Read in Detail
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
