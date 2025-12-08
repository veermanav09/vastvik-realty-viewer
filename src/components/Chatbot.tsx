import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageCircle, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import vastvikLogo from "@/assets/vastvik-logo-new.png";

// Input validation constants
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CONVERSATION_HISTORY = 20;

const Chatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello! I'm Vastvik AI assistant. I can help you with information about our projects like Element (2 & 3 BHK at Marsur Gate, starting ₹45 Lakhs) and High Rise apartments. How can I assist you today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const projects = [
    "Element - Villas",
    "High Rise Apartments",
    "Upcoming Projects",
    "Request a call"
  ];

  const handleProjectSelect = (project: string) => {
    setSelectedProject(project);
    setMessages(prev => [...prev,
      { role: "user", content: `I'm interested in ${project}` },
      { role: "assistant", content: `Great! I'd be happy to tell you more about ${project}. What would you like to know?` }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateMessage = (msg: string): { valid: boolean; error?: string } => {
    const trimmed = msg.trim();
    if (!trimmed) {
      return { valid: false, error: "Please enter a message" };
    }
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.` };
    }
    return { valid: true };
  };

  const handleSendMessage = async () => {
    const validation = validateMessage(message);
    if (!validation.valid || isLoading) {
      if (validation.error) {
        toast({
          title: "Invalid message",
          description: validation.error,
          variant: "destructive",
        });
      }
      return;
    }

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Limit conversation history sent to server
      const recentMessages = messages.slice(-MAX_CONVERSATION_HISTORY);
      
      const { data, error } = await supabase.functions.invoke('vastvik-chat', {
        body: { 
          messages: [...recentMessages, { role: "user", content: userMessage }]
        }
      });

      if (error) {
        console.error('Error calling chat function:', error);
        
        // Handle specific error status codes
        const errorMessage = error.message?.toLowerCase() || '';
        if (errorMessage.includes('429') || errorMessage.includes('too many requests') || errorMessage.includes('rate limit')) {
          toast({
            title: "Too many requests",
            description: "Please wait a moment before sending another message.",
            variant: "destructive",
          });
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "You're sending messages too quickly. Please wait a moment and try again." 
          }]);
          return;
        }
        
        if (errorMessage.includes('402') || errorMessage.includes('payment')) {
          toast({
            title: "Service unavailable",
            description: "Our AI service is temporarily unavailable.",
            variant: "destructive",
          });
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: "I'm temporarily unavailable. Please contact us directly at +91 88845 45404 for assistance." 
          }]);
          return;
        }
        
        throw error;
      }

      // Check for error in the response data
      if (data?.error) {
        console.error('API error in response:', data.error);
        throw new Error(data.error);
      }

      const aiResponse = data?.choices?.[0]?.message?.content || 
        "I'm sorry, I couldn't process that. Please try asking about our projects or contact us at +91 88845 45404.";

      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Unable to process your message. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I apologize, but I'm having trouble connecting right now. Please call us at +91 88845 45404 for immediate assistance." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className="w-14 h-14 bg-black/90 backdrop-blur-xl text-[#86A376] hover:bg-black hover:shadow-2xl rounded-full transition-all duration-300 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse shadow-lg pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75 pointer-events-none" />
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] z-50 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary/10">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl ring-2 ring-white/20 backdrop-blur-sm">
                    <img 
                      src={vastvikLogo} 
                      alt="Vastvik Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl tracking-tight">Vastvik AI</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse shadow-lg shadow-green-300/50"></div>
                      <span className="text-sm font-medium opacity-90">Online now</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2.5 transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 pt-4 max-h-80 overflow-y-auto space-y-3 mb-4 scroll-smooth">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary to-primary/90 text-white rounded-tr-sm'
                      : 'bg-gradient-to-br from-accent/60 to-accent/40 text-foreground rounded-tl-sm backdrop-blur-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-gradient-to-br from-accent/60 to-accent/40 p-4 rounded-2xl rounded-tl-sm shadow-sm backdrop-blur-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 pt-0">
              <div className="mb-4 bg-gradient-to-br from-accent/30 to-accent/10 p-4 rounded-2xl border border-primary/10">
                <p className="font-semibold text-foreground mb-3 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Quick actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {projects.map((project) => (
                    <Button
                      key={project}
                      variant={selectedProject === project ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleProjectSelect(project)}
                      className={`text-xs py-2.5 transition-all duration-300 ${
                        selectedProject === project
                          ? "bg-gradient-to-br from-primary to-primary/90 text-white shadow-md scale-[1.02]"
                          : "border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 hover:scale-[1.02]"
                      }`}
                    >
                      {project}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                  onClick={() => window.open('https://wa.me/918884545404', '_blank')}
                >
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white text-xs transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }}
                >
                  <User className="w-3 h-3 mr-2" />
                  Site Visit
                </Button>
              </div>

              <div className="flex space-x-2 bg-gradient-to-br from-accent/20 to-accent/10 p-2 rounded-full border border-primary/10">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className="flex-1 border-0 bg-white focus-visible:ring-1 focus-visible:ring-primary rounded-full shadow-sm px-4"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 rounded-full w-11 h-11 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                  disabled={!message.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center mt-4 pt-3 border-t border-primary/10">
                <p className="text-xs text-muted-foreground flex items-center justify-center">
                  <span className="inline-block w-1 h-1 bg-primary rounded-full mr-2 animate-pulse"></span>
                  Powered by <span className="text-primary font-semibold ml-1">Vastvik AI</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
