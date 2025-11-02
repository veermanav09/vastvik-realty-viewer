import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, MessageCircle, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import vastvikLogo from "@/assets/vastvik-logo-new.png";

const Chatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello! I'm Vastvik AI assistant. I can help you with information about our projects like Element and High Rise. How can I assist you today?" }
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

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message;
      setMessage("");
      setMessages(prev => [...prev, { role: "user", content: userMessage }]);
      setIsLoading(true);

      try {
        const { data, error } = await supabase.functions.invoke('vastvik-chat', {
          body: { 
            messages: [...messages, { role: "user", content: userMessage }]
          }
        });

        if (error) {
          console.error('Error calling chat function:', error);
          throw error;
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
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[100]">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="bg-primary/90 backdrop-blur-xl text-primary-foreground hover:bg-primary hover:shadow-2xl font-medium rounded-full px-6 transition-all duration-300 border border-background/70 shadow-xl"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Chat Help</span>
            <span className="sm:hidden">Chat</span>
          </Button>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] z-[100]">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden card-shadow">
            <div className="bg-gradient-primary p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg">
                    <img 
                      src={vastvikLogo} 
                      alt="Vastvik Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Vastvik AI</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">AI-powered assistant</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 pt-0 max-h-80 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-accent/50 text-foreground'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-accent/50 p-3 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 pt-0">
              <div className="mb-4">
                <p className="font-semibold text-foreground mb-3 text-sm">Which project are you interested in?</p>
                <div className="grid grid-cols-2 gap-2">
                  {projects.map((project) => (
                    <Button
                      key={project}
                      variant={selectedProject === project ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleProjectSelect(project)}
                      className={`text-xs py-2 ${
                        selectedProject === project
                          ? "bg-gradient-primary"
                          : "border-primary/30 text-foreground hover:bg-primary/10"
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
                  className="border-primary text-primary hover:bg-primary hover:text-white text-xs"
                  onClick={() => window.location.href = 'tel:+918884545404'}
                >
                  <Phone className="w-3 h-3 mr-2" />
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white text-xs"
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

              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-primary/30 focus:border-primary rounded-full"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-primary rounded-full w-10 h-10 p-0"
                  disabled={!message.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-xs text-muted-foreground">
                  ⚡ Powered by <span className="text-primary font-semibold">Vastvik AI</span>
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
