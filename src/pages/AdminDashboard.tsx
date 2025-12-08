import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  LogOut, 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  Building,
  MessageSquare,
  RefreshCw,
  Download
} from "lucide-react";
import vastvikLogo from "@/assets/vastvik-logo-new.png";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_name: string | null;
  source: string;
  message: string | null;
  created_at: string;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [referralsLoading, setReferralsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchLeads();
      fetchReferrals();
    }
  }, [user, isAdmin]);

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads data.",
        variant: "destructive",
      });
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchReferrals = async () => {
    setReferralsLoading(true);
    try {
      const { data, error } = await supabase
        .from("referrals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast({
        title: "Error",
        description: "Failed to fetch referrals data.",
        variant: "destructive",
      });
    } finally {
      setReferralsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const exportToCSV = (data: Lead[] | Referral[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No data",
        description: "There's no data to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => 
      Object.values(row).map(val => 
        typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val
      ).join(",")
    );
    const csv = [headers, ...rows].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    (lead.project_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredReferrals = referrals.filter(referral =>
    referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.phone.includes(searchTerm) ||
    referral.referral_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAdmin && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 text-center max-w-md">
          <div className="w-16 h-16 bg-destructive/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Contact the system administrator to request access.
          </p>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center p-2">
                <img src={vastvikLogo} alt="Vastvik Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-foreground mt-1">{leads.length}</p>
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Referrals</p>
                <p className="text-3xl font-bold text-foreground mt-1">{referrals.length}</p>
              </div>
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => { fetchLeads(); fetchReferrals(); }}
            variant="outline"
            size="icon"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="leads" className="data-[state=active]:bg-background">
              <Users className="w-4 h-4 mr-2" />
              Leads ({filteredLeads.length})
            </TabsTrigger>
            <TabsTrigger value="referrals" className="data-[state=active]:bg-background">
              <UserPlus className="w-4 h-4 mr-2" />
              Referrals ({filteredReferrals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => exportToCSV(filteredLeads, "leads")}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {leadsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No leads found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                                <a href={`mailto:${lead.email}`} className="hover:text-primary">
                                  {lead.email}
                                </a>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                                <a href={`tel:${lead.phone}`} className="hover:text-primary">
                                  {lead.phone}
                                </a>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Building className="w-3 h-3 mr-1 text-muted-foreground" />
                              {lead.project_name || "-"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {lead.source}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            {lead.message ? (
                              <div className="flex items-start">
                                <MessageSquare className="w-3 h-3 mr-1 mt-0.5 text-muted-foreground flex-shrink-0" />
                                <span className="truncate">{lead.message}</span>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(lead.created_at)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => exportToCSV(filteredReferrals, "referrals")}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              {referralsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : filteredReferrals.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No referrals found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Referral Code</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReferrals.map((referral) => (
                        <TableRow key={referral.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">{referral.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                                <a href={`mailto:${referral.email}`} className="hover:text-primary">
                                  {referral.email}
                                </a>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                                <a href={`tel:${referral.phone}`} className="hover:text-primary">
                                  {referral.phone}
                                </a>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono font-bold bg-green-500/10 text-green-600">
                              {referral.referral_code}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(referral.created_at)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
