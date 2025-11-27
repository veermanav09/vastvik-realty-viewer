import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import referralImage from "@/assets/referral-image.jpg";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be less than 15 digits" }).regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
});

const Referral = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyCode = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({ title: "Copied!", description: "Referral code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
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
      // Generate referral code using the database function
      const { data: codeData, error: codeError } = await supabase.rpc('generate_referral_code');
      
      if (codeError) throw codeError;

      const generatedCode = codeData as string;

      // Insert referral data
      const { error: insertError } = await supabase.from("referrals").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        referral_code: generatedCode,
      });

      if (insertError) throw insertError;

      setReferralCode(generatedCode);
      
      toast({
        title: "Success!",
        description: "Your referral code has been generated.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Check if it's a rate limit error
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isRateLimit = errorMessage.includes('only create one referral') || 
                          errorMessage.includes('rate limit') ||
                          errorMessage.includes('24 hours');
      
      toast({
        title: isRateLimit ? "Referral Code Already Created" : "Submission Failed",
        description: isRateLimit 
          ? "You can only create one referral code per 24 hours. Please try again tomorrow."
          : "There was an error generating your referral code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6 text-primary border-primary">Referral Program</Badge>
            <h1 className="font-heading font-bold text-6xl md:text-7xl mb-6">Refer & Earn <span className="text-primary">Up to 2%</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-body">Share the excellence, reap the rewards. Earn up to 2% on every successful referral when you introduce friends and family to exceptional living.</p>
          </div>
          
          {/* Referral Image */}
          <div className="flex justify-center mt-16">
            <img 
              src={referralImage} 
              alt="Referral Program" 
              className="w-full max-w-2xl h-auto rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-20 mt-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-3xl p-8 md:p-12 card-shadow">
            <h3 className="font-heading font-bold text-3xl mb-10 text-center">Begin Your Referral Journey</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Your Name</Label>
                  <Input 
                    placeholder="Enter your full name" 
                    className={`h-12 ${errors.name ? "border-destructive" : ""}`}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    maxLength={100}
                    required
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    maxLength={255}
                    required
                  />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label>Phone</Label>
                <Input 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  className={`h-12 ${errors.phone ? "border-destructive" : ""}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  maxLength={15}
                  required
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>
              {referralCode && (
                <div className="bg-gradient-card rounded-2xl p-6 border border-primary/20">
                  <Label className="text-sm text-muted-foreground mb-3 block">Your Referral Code</Label>
                  <div className="flex items-center justify-between gap-4">
                    <code className="text-2xl font-bold text-primary font-mono">{referralCode}</code>
                    <Button type="button" variant="outline" size="sm" onClick={handleCopyCode}>
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Referral;
