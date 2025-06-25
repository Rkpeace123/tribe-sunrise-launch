import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JoinTribe = () => {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Registration form state
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    fitnessLevel: "",
    goals: "",
    availability: ""
  });

  // Find Tribe Bro form state  
  const [buddyForm, setBuddyForm] = useState({
    name: "",
    email: "",
    age: "",
    fitnessLevel: "",
    preferredPace: "",
    interests: "",
    goals: ""
  });

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await fetch("https://forzio.app.n8n.cloud/webhook-test/RUNTRIBE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "registration",
          ...regForm,
          timestamp: new Date().toISOString()
        }),
      });

      toast({
        title: "🚀 WELCOME TO THE TRIBE!",
        description: "Registration successful! We'll contact you soon with meetup details.",
      });
      
      setRegForm({
        name: "",
        email: "",
        phone: "",
        fitnessLevel: "",
        goals: "",
        availability: ""
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Received!",
        description: "We've got your details and will be in touch soon.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuddySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await fetch("http://localhost:5678/webhook/runtribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "find_buddy",
          ...buddyForm,
          timestamp: new Date().toISOString()
        }),
      });

      toast({
        title: "🤝 TRIBE BRO SEARCH ACTIVATED!",
        description: "We'll match you with compatible running partners soon!",
      });
      
      setBuddyForm({
        name: "",
        email: "",
        age: "",
        fitnessLevel: "",
        preferredPace: "",
        interests: "",
        goals: ""
      });
    } catch (error) {
      console.error("Find buddy error:", error);
      toast({
        title: "Buddy Search Submitted!",
        description: "We'll find you the perfect running partner.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold sigma-heading mb-12 leading-tight">
            JOIN.<br/>
            <span className="text-orange-500">THE TRIBE.</span>
          </h1>
          
          {/* Toggle Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 max-w-lg mx-auto">
            <Button
              onClick={() => setIsRegistering(true)}
              className={`sigma-button px-6 py-2 text-base w-full sm:w-auto ${
                isRegistering ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
            >
              JOIN TRIBE 🚀
            </Button>
            <Button
              onClick={() => setIsRegistering(false)}
              className={`sigma-button px-6 py-2 text-base w-full sm:w-auto ${
                !isRegistering ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
            >
              FIND TRIBE BRO 🤝
            </Button>
          </div>

          {/* Registration Form */}
          {isRegistering && (
            <div className="sigma-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold sigma-heading mb-6 text-orange-500">
                BECOME A TRIBE MEMBER
              </h2>
              
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      FULL NAME *
                    </label>
                    <Input
                      type="text"
                      value={regForm.name}
                      onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                      className="sigma-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      EMAIL *
                    </label>
                    <Input
                      type="email"
                      value={regForm.email}
                      onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                      className="sigma-input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      PHONE NUMBER *
                    </label>
                    <Input
                      type="tel"
                      value={regForm.phone}
                      onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                      className="sigma-input"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      FITNESS LEVEL
                    </label>
                    <select
                      value={regForm.fitnessLevel}
                      onChange={(e) => setRegForm({...regForm, fitnessLevel: e.target.value})}
                      className="sigma-input w-full"
                    >
                      <option value="">Select level</option>
                      <option value="beginner">BEGINNER</option>
                      <option value="intermediate">INTERMEDIATE</option>
                      <option value="advanced">ADVANCED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                    RUNNING GOALS
                  </label>
                  <textarea
                    value={regForm.goals}
                    onChange={(e) => setRegForm({...regForm, goals: e.target.value})}
                    className="sigma-input w-full h-20 resize-none"
                    placeholder="What do you want to achieve?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="sigma-button w-full px-8 py-3 text-lg"
                >
                  {isLoading ? "JOINING..." : "JOIN THE TRIBE! 🚀"}
                </Button>
              </form>
            </div>
          )}

          {/* Find Tribe Bro Form */}
          {!isRegistering && (
            <div className="sigma-card max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold sigma-heading mb-4 text-orange-500">
                FIND YOUR TRIBE BRO
              </h2>
              <p className="text-gray-300 mb-6">
                Get matched with compatible running partners
              </p>
              
              <form onSubmit={handleBuddySubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      FULL NAME *
                    </label>
                    <Input
                      type="text"
                      value={buddyForm.name}
                      onChange={(e) => setBuddyForm({...buddyForm, name: e.target.value})}
                      className="sigma-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      EMAIL *
                    </label>
                    <Input
                      type="email"
                      value={buddyForm.email}
                      onChange={(e) => setBuddyForm({...buddyForm, email: e.target.value})}
                      className="sigma-input"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      AGE RANGE
                    </label>
                    <select
                      value={buddyForm.age}
                      onChange={(e) => setBuddyForm({...buddyForm, age: e.target.value})}
                      className="sigma-input w-full"
                    >
                      <option value="">Select age range</option>
                      <option value="18-25">18-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-45">36-45</option>
                      <option value="45+">45+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                      FITNESS LEVEL
                    </label>
                    <select
                      value={buddyForm.fitnessLevel}
                      onChange={(e) => setBuddyForm({...buddyForm, fitnessLevel: e.target.value})}
                      className="sigma-input w-full"
                    >
                      <option value="">Select level</option>
                      <option value="beginner">BEGINNER</option>
                      <option value="intermediate">INTERMEDIATE</option>
                      <option value="advanced">ADVANCED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                    PREFERRED PACE
                  </label>
                  <select
                    value={buddyForm.preferredPace}
                    onChange={(e) => setBuddyForm({...buddyForm, preferredPace: e.target.value})}
                    className="sigma-input w-full"
                  >
                    <option value="">Select pace</option>
                    <option value="slow">SLOW & STEADY</option>
                    <option value="moderate">MODERATE</option>
                    <option value="fast">FAST & FURIOUS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-1 sigma-heading text-sm">
                    INTERESTS & GOALS
                  </label>
                  <textarea
                    value={buddyForm.goals}
                    onChange={(e) => setBuddyForm({...buddyForm, goals: e.target.value})}
                    className="sigma-input w-full h-20 resize-none"
                    placeholder="What are you looking for in a running partner?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="sigma-button w-full px-8 py-3 text-lg"
                >
                  {isLoading ? "FINDING..." : "FIND MY TRIBE BRO! 🤝"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinTribe;
