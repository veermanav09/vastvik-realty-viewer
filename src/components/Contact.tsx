import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    <section id="contact" className="py-16 bg-gradient-mesh building-3d">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground mb-8">
            CONTACT US
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto depth-layer-3 leading-relaxed">
            Ready to find your dream home? Get in touch with our expert team today.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-4 md:p-6 elevated-shadow premium-lift">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 md:mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-primary/30 focus:border-primary rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell us about your requirements..."
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border-primary/30 focus:border-primary resize-none rounded-xl"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:elevated-shadow transition-all duration-300"
                >
                  Send Message
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    const message = encodeURIComponent("Hi, I am interested to know more");
                    window.open(`https://wa.me/918884545404?text=${message}`, '_blank');
                  }}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 hover:elevated-shadow transition-all duration-300"
                >
                  <span className="hidden sm:inline">Schedule Visit via WhatsApp</span>
                  <span className="sm:hidden">WhatsApp Visit</span>
                </Button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
