import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Chatbot from "@/components/Chatbot";

const AboutPage = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default AboutPage;
