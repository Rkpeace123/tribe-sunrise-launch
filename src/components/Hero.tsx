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
        title: "Let's get started!",
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
    <section 
      className="min-h-screen flex items-center justify-center bg-black bg-[url('/images/run-bg.jpg')] bg-cover bg-center relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20 relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold sigma-heading mb-8 leading-tight text-white">
            RUN.<br/>
            <span className="text-orange-500">VIBE.</span><br/>
            <span className="text-orange-500">CONNECT.</span>
          </h1>
        </div>

        <div className="sigma-card mb-12 max-w-3xl mx-auto">
          <p className="text-2xl sm:text-3xl font-bold sigma-heading mb-6 text-white">
            CHENNAI'S ELITE RUNNING COMMUNITY
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join Chennai's most <span className="text-orange-500 font-semibold">powerful</span> running community! 
            Every Saturday at 6 AM, we gather at Thiruvanmiyur Beach for energy, motivation, and connections.
          </p>

          <div className="inline-flex items-center bg-orange-500 text-black px-8 py-3 rounded-md font-semibold text-lg">
            <span className="mr-2">🚀</span>
            FIRST SESSION LAUNCHING SOON
            <span className="ml-2">🚀</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <Button 
            onClick={handleJoinTribe}
            disabled={isLoading}
            className="sigma-button text-lg px-8 py-3 w-full sm:w-auto"
          >
            {isLoading ? "JOINING..." : "JOIN THE TRIBE 🔥"}
          </Button>

          <Link to="/about">
            <Button 
              variant="outline" 
              className="border-2 border-orange-500 bg-transparent text-white hover:bg-orange-500 hover:text-black px-8 py-3 text-lg font-semibold rounded-md transition-colors w-full sm:w-auto"
            >
              LEARN MORE
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
