import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Referral = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = "VASTVIK2024";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({ title: "Copied!", description: "Referral code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-6 text-primary border-primary">Referral Program</Badge>
            <h1 className="font-heading font-bold text-6xl md:text-7xl mb-6">Refer & Earn <span className="text-primary">Up to 2%</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">Invite friends and earn up to 2% on every successful booking</p>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-3xl p-8 md:p-12 card-shadow">
            <h3 className="font-heading font-bold text-3xl mb-10 text-center">Start Referring Today</h3>
            <form className="space-y-6">
              <div><Label>Your Name</Label><Input placeholder="Enter your full name" className="h-12" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="your.email@example.com" className="h-12" /></div>
              <div><Label>Phone</Label><Input type="tel" placeholder="+91 98765 43210" className="h-12" /></div>
              <div className="bg-gradient-card rounded-2xl p-6 border border-primary/20">
                <Label className="text-sm text-muted-foreground mb-3 block">Your Referral Code</Label>
                <div className="flex items-center justify-between gap-4">
                  <code className="text-2xl font-bold text-primary font-mono">{referralCode}</code>
                  <Button type="button" variant="outline" size="sm" onClick={handleCopyCode}>{copied ? <><Check className="w-4 h-4" />Copied</> : <><Copy className="w-4 h-4" />Copy</>}</Button>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary text-lg py-6">Get Started</Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Referral;
