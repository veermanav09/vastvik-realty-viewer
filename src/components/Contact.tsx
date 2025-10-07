import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-mesh building-3d">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-6 text-primary border-primary">
            Get In Touch
          </Badge>
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-8">
            CONTACT US
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto depth-layer-3 leading-relaxed">
            Ready to find your dream home? Get in touch with our expert team today.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-card rounded-3xl p-12 elevated-shadow premium-lift">
              <h3 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-16">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-primary/30 focus:border-primary py-6 text-lg rounded-2xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-primary/30 focus:border-primary py-6 text-lg rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary py-6 text-lg rounded-2xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary resize-none text-lg rounded-2xl"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:elevated-shadow transition-all duration-300 py-7 text-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card rounded-3xl p-10 elevated-shadow sticky top-24">
              <h3 className="font-heading font-bold text-3xl text-foreground mb-8">
                Let's Connect
              </h3>

              <div className="flex items-start space-x-6 p-8 rounded-3xl bg-gradient-card">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-3 text-xl">Office Hours</h4>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const message = encodeURIComponent("Hi, I am interested to know more");
                      window.open(`https://wa.me/918884545404?text=${message}`, '_blank');
                    }}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Schedule Visit via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
