
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RunnerMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFindBuddy = async () => {
    setIsLoading(true);
    
    try {
      const formData = {
        action: "find_buddy",
        timestamp: new Date().toISOString(),
        source: "runner_match_component"
      };

      await fetch("https://forzio.app.n8n.cloud/webhook/RUNTRIBE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast({
        title: "🎯 BUDDY SEARCH ACTIVATED!",
        description: "We're finding your perfect running partner right now!",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "🔥 REQUEST SUBMITTED!",
        description: "We're on it! Your perfect running buddy is coming soon.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-black via-[#111111] to-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pulse-orange"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl pulse-orange" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black sigma-heading mb-12">
            FIND YOUR RUNBUDDY 🤝
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Our <span className="text-orange-500 font-bold">ELITE</span> matching system connects you with runners who share your 
            <span className="text-orange-500 font-bold"> PACE</span>, 
            <span className="text-orange-500 font-bold"> INTERESTS</span>, and 
            <span className="text-orange-500 font-bold"> AMBITIONS</span>. Never run alone again!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="sigma-card p-12 sigma-glow">
              <h3 className="text-4xl sm:text-5xl font-black sigma-heading mb-12">HOW IT WORKS ✨</h3>
              <div className="space-y-12">
                <div className="flex items-start space-x-8">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-6 text-black font-black text-2xl sigma-heading min-w-[4rem] h-16 flex items-center justify-center shadow-2xl pulse-orange">1</div>
                  <div>
                    <h4 className="font-black sigma-heading text-white mb-4 text-xl">COMPLETE YOUR PROFILE</h4>
                    <p className="text-gray-300 font-light text-lg leading-relaxed">Tell us about your fitness level, interests, and goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-6 text-black font-black text-2xl sigma-heading min-w-[4rem] h-16 flex items-center justify-center shadow-2xl pulse-orange">2</div>
                  <div>
                    <h4 className="font-black sigma-heading text-white mb-4 text-xl">GET MATCHED</h4>
                    <p className="text-gray-300 font-light text-lg leading-relaxed">Our algorithm finds your perfect running companions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-8">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-6 text-black font-black text-2xl sigma-heading min-w-[4rem] h-16 flex items-center justify-center shadow-2xl pulse-orange">3</div>
                  <div>
                    <h4 className="font-black sigma-heading text-white mb-4 text-xl">START DOMINATING TOGETHER</h4>
                    <p className="text-gray-300 font-light text-lg leading-relaxed">Meet at the beach and build unstoppable connections</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left">
              <Button 
                onClick={handleFindBuddy}
                disabled={isLoading}
                className="sigma-button text-2xl sm:text-3xl py-12 px-16"
              >
                {isLoading ? "FINDING BUDDY..." : "REGISTER & MATCH 🎯"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="sigma-card p-10 text-center transform hover:scale-105 transition-all duration-300 sigma-glow">
              <div className="text-5xl mb-6">🎯</div>
              <h4 className="font-black sigma-heading text-white mb-4 text-lg">SIMILAR PACE</h4>
              <p className="text-gray-300 font-light">Matched by fitness level</p>
            </div>
            <div className="sigma-card p-10 text-center transform hover:scale-105 transition-all duration-300 sigma-glow">
              <div className="text-5xl mb-6">💼</div>
              <h4 className="font-black sigma-heading text-white mb-4 text-lg">SHARED INTERESTS</h4>
              <p className="text-gray-300 font-light">Common hobbies & goals</p>
            </div>
            <div className="sigma-card p-10 text-center transform hover:scale-105 transition-all duration-300 sigma-glow">
              <div className="text-5xl mb-6">📍</div>
              <h4 className="font-black sigma-heading text-white mb-4 text-lg">LOCATION</h4>
              <p className="text-gray-300 font-light">Nearby neighborhoods</p>
            </div>
            <div className="sigma-card p-10 text-center transform hover:scale-105 transition-all duration-300 sigma-glow">
              <div className="text-5xl mb-6">⏰</div>
              <h4 className="font-black sigma-heading text-white mb-4 text-lg">SCHEDULE</h4>
              <p className="text-gray-300 font-light">Preferred run times</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RunnerMatch;
