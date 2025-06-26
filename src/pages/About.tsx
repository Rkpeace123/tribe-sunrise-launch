
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
};

export default About;
