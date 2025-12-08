import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  mobileNumber: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number must be less than 15 digits" }).regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  message: z.string().trim().max(1000, { message: "Message must be less than 1000 characters" }).optional(),
});

interface DownloadBrochureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectId: number;
}

const DownloadBrochureDialog = ({ isOpen, onClose, projectName, projectId }: DownloadBrochureDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", email: "", message: "" });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.mobileNumber.trim(),
        message: formData.message.trim() || null,
        project_name: projectName,
        project_id: projectId.toString(),
        source: "brochure_download",
      });

      if (error) throw error;

      toast({ title: "OTP Sent!", description: `Verification code sent to ${formData.mobileNumber}` });
      setStep("otp");
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
          ? "You've submitted too many forms recently. Please try again in an hour."
          : "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = () => {
    toast({ title: "Success!", description: "Downloading brochure..." });
    setTimeout(() => {
      setStep("form");
      setFormData({ fullName: "", mobileNumber: "", email: "", message: "" });
      setOtp("");
      onClose();
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <div className="p-8 md:p-12">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-4xl md:text-5xl mb-3">Download Brochure</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">Please share your basic details to download the file.</DialogDescription>
          </DialogHeader>

          <div className="mt-10">
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Full Name</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      value={formData.fullName} 
                      onChange={(e) => handleChange("fullName", e.target.value)} 
                      className={`h-14 text-base ${errors.fullName ? "border-destructive" : ""}`}
                      maxLength={100}
                      required
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Mobile Number</Label>
                    <Input 
                      id="mobileNumber" 
                      type="tel" 
                      value={formData.mobileNumber} 
                      onChange={(e) => handleChange("mobileNumber", e.target.value)} 
                      className={`h-14 text-base ${errors.mobileNumber ? "border-destructive" : ""}`}
                      maxLength={15}
                      required
                    />
                    {errors.mobileNumber && <p className="text-sm text-destructive mt-1">{errors.mobileNumber}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Email ID</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => handleChange("email", e.target.value)} 
                      className={`h-14 text-base ${errors.email ? "border-destructive" : ""}`}
                      maxLength={255}
                      required
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Write a Message</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message} 
                      onChange={(e) => handleChange("message", e.target.value)} 
                      className={`min-h-14 text-base ${errors.message ? "border-destructive" : ""}`}
                      rows={1}
                      maxLength={1000}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="bg-primary text-primary-foreground h-14 px-8 text-base font-semibold uppercase tracking-wider"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Verify Via OTP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <Download className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg mb-2">We've sent a 6-digit verification code to</p>
                  <p className="font-semibold text-foreground text-xl">{formData.mobileNumber}</p>
                </div>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className="w-14 h-14 text-xl" />)}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button onClick={handleVerifyOTP} className="w-full bg-primary h-14 text-base font-semibold uppercase tracking-wider" disabled={otp.length !== 6}>
                  Verify & Download<ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadBrochureDialog;
