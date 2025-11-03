import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

const ContactPage = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ContactPage;
