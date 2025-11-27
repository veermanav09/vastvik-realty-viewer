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
          <div className="inline-block relative mb-8">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-1"></div>
            <div className="absolute inset-0 bg-primary/5 rounded-2xl -rotate-1"></div>
            <h2 className="font-heading font-bold text-5xl md:text-6xl text-foreground relative px-6 py-2">
              Let's Connect
            </h2>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto depth-layer-3 leading-relaxed font-body">
            Your dream home awaits. Reach out to our dedicated team and let's bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-4 md:p-6 elevated-shadow premium-lift">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 md:mb-6">
              Start Your Journey
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
