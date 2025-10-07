import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const DownloadBrochure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [otp, setOtp] = useState("");

  const projects = [{ id: 1, name: "ELEMENT" }, { id: 2, name: "HIGH RISE" }];
  const project = projects.find(p => p.id === parseInt(id || "1"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "OTP Sent!", description: "Please check your phone" });
    setStep("otp");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-16 bg-gradient-subtle min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <Button onClick={() => navigate(-1)} variant="ghost" className="mb-8"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
          <div className="bg-card rounded-3xl p-8 md:p-12 card-shadow">
            <div className="text-center mb-8">
              <Download className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="font-heading font-bold text-4xl mb-2">Download Brochure</h1>
              <p className="text-muted-foreground text-lg">{project?.name} Project Brochure</p>
            </div>
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><Label>Full Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12" /></div>
                <div><Label>Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12" /></div>
                <div><Label>Phone</Label><Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12" /></div>
                <Button type="submit" className="w-full bg-primary h-12" size="lg">Send OTP</Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center"><InputOTP maxLength={6} value={otp} onChange={setOtp}><InputOTPGroup>{[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup></InputOTP></div>
                <Button onClick={() => toast({ title: "Download Started" })} className="w-full bg-primary h-12" disabled={otp.length !== 6}>Verify & Download</Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DownloadBrochure;
