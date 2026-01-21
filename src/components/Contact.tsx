import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be less than 15 digits" }).regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  message: z.string().trim().max(1000, { message: "Message must be less than 1000 characters" }).optional(),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim() || null,
        project_name: null,
        project_id: null,
        source: "contact",
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Check if it's a rate limit error
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isRateLimit = errorMessage.includes('Rate limit exceeded') || 
                          errorMessage.includes('rate limit') ||
                          errorMessage.includes('too many requests');
      
      toast({
        title: isRateLimit ? "Too Many Submissions" : "Submission Failed",
        description: isRateLimit 
          ? "You've submitted too many forms recently. Please try again later."
          : "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="flex justify-center">
          <div className="w-full md:max-w-2xl lg:max-w-3xl">
          <div className="bg-card rounded-3xl p-5 md:p-8 elevated-shadow premium-lift">
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
                    className={`border-primary/30 focus:border-primary rounded-xl ${errors.name ? "border-destructive" : ""}`}
                    maxLength={100}
                    required
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`border-primary/30 focus:border-primary rounded-xl ${errors.phone ? "border-destructive" : ""}`}
                    maxLength={15}
                    required
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
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
                  className={`border-primary/30 focus:border-primary rounded-xl ${errors.email ? "border-destructive" : ""}`}
                  maxLength={255}
                  required
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
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
                  className={`border-primary/30 focus:border-primary resize-none rounded-xl ${errors.message ? "border-destructive" : ""}`}
                  maxLength={1000}
                />
                {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:elevated-shadow transition-all duration-300 py-4 sm:py-3 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={() => {
                    const message = encodeURIComponent("Hi, I am interested to know more");
                    window.open(`https://wa.me/918884545404?text=${message}`, '_blank');
                  }}
                  className="flex-1 bg-green-600 text-white hover:bg-green-700 hover:elevated-shadow transition-all duration-300 py-4 sm:py-3 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Schedule Visit via WhatsApp</span>
                  <span className="sm:hidden">WhatsApp</span>
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
