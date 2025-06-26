
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Hero = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinTribe = async () => {
    if (user) {
      window.location.href = '/join';
      return;
    }

    setIsLoading(true);

    try {
      await fetch("http://localhost:5678/webhook/runtribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "join_tribe_clicked",
          timestamp: new Date().toISOString(),
          source: "hero_section"
        }),
      });

      toast({
        title: "Let's get started! 🚀",
        description: "Redirecting you to join the tribe...",
      });

      setTimeout(() => {
        window.location.href = '/join';
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      window.location.href = '/join';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20 relative z-10">
        <div className="mb-12 animate-fade-up">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-space font-bold genz-heading mb-8 leading-tight text-white">
            RUN.<br/>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">VIBE.</span><br/>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">CONNECT.</span>
          </h1>
        </div>

        <div className="genz-card mb-12 max-w-3xl mx-auto animate-fade-up" style={{animationDelay: '0.2s'}}>
          <p className="text-2xl sm:text-3xl font-space font-bold genz-heading mb-6 text-white">
            Chennai's Elite Running Community ⚡
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-poppins">
            Join Chennai's most <span className="text-orange-400 font-semibold">powerful</span> running community! 
            Every Saturday at 6 AM, we gather at Thiruvanmiyur Beach for energy, motivation, and connections.
          </p>

          <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-3 rounded-xl font-semibold text-sm shadow-lg">
            <span className="mr-2">🔥</span>
            LAUNCHING SOON
            <span className="ml-2">🔥</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto animate-fade-up" style={{animationDelay: '0.4s'}}>
          <button 
            onClick={handleJoinTribe}
            disabled={isLoading}
            className="genz-button w-full sm:w-auto"
          >
            {isLoading ? "JOINING..." : "JOIN TRIBE 🚀"}
          </button>

          <Link to="/about" className="w-full sm:w-auto">
            <button className="genz-button-outline w-full">
              LEARN MORE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
