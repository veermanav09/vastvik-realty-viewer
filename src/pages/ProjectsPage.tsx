import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Chatbot from "@/components/Chatbot";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="pt-24">
        <Projects />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ProjectsPage;
