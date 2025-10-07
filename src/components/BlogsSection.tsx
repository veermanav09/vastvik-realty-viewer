import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogsSection = () => {
  const navigate = useNavigate();

  const featuredBlogs = [
    {
      id: 1,
      title: "Top 10 Tips for First-Time Home Buyers in Bangalore",
      excerpt: "Buying your first home can be overwhelming. Here are essential tips to make your journey smooth and successful.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      category: "Buying Guide",
      date: "Oct 1, 2025",
    },
    {
      id: 2,
      title: "Understanding Real Estate Investment Returns",
      excerpt: "Learn how to calculate and maximize your returns on real estate investments in the current market.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      category: "Investment",
      date: "Sep 28, 2025",
    },
    {
      id: 3,
      title: "The Future of Sustainable Living in Urban Areas",
      excerpt: "Explore how modern apartments are incorporating eco-friendly features for sustainable living.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      category: "Lifestyle",
      date: "Sep 25, 2025",
    },
  ];

  return (
    <section id="blogs" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-primary border-primary">
            Latest Insights
          </Badge>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-8">
            Real Estate Insights
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Expert knowledge and industry trends to help you make informed decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-card rounded-3xl overflow-hidden card-shadow hover:shadow-3d transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-white">
                    {blog.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {blog.date}
                </div>

                <h3 className="font-heading font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <Button variant="ghost" size="sm" className="group-hover:text-primary p-0">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/blogs')}
            size="lg"
            className="bg-primary text-primary-foreground px-16 py-6 text-xl minimal-shadow hover:elevated-shadow transition-all duration-300"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
