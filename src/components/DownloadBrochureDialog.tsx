import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface DownloadBrochureDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectId: number;
}

const DownloadBrochureDialog = ({ isOpen, onClose, projectName }: DownloadBrochureDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({ fullName: "", mobileNumber: "", email: "", message: "" });
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "OTP Sent!", description: `Verification code sent to ${formData.mobileNumber}` });
    setStep("otp");
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
                    <Input id="fullName" type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="h-14 text-base" />
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Mobile Number</Label>
                    <Input id="mobileNumber" type="tel" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="h-14 text-base" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Email ID</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-14 text-base" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm uppercase tracking-wider text-muted-foreground mb-3 block">Write a Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-14 text-base" rows={1} />
                  </div>
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground h-14 px-8 text-base font-semibold uppercase tracking-wider">
                  Verify Via OTP<ArrowRight className="ml-2 h-5 w-5" />
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
