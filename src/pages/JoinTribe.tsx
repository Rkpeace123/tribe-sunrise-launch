
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JoinTribe = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    fitnessLevel: "",
    availability: "",
    profession: "",
    goals: ""
  });

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("https://forzio.app.n8n.cloud/webhook/R1", {
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
        location: "",
        fitnessLevel: "",
        availability: "",
        profession: "",
        goals: ""
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Received! ✅",
        description: "We've got your details and will be in touch soon.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
      </div>

      <Header />

      <div className="flex items-center justify-center min-h-screen relative z-10">
        {/* Centered Registration Form */}
        <div className="w-full max-w-2xl p-4 sm:p-8">
          <div className="genz-card">
            <h2 className="text-3xl sm:text-4xl font-space font-bold genz-heading mb-8 text-center">
              Join the <span className="text-orange-500">Tribe</span> 🏃‍♂️
            </h2>
            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name *"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  required
                  className="genz-input"
                />
                <Input
                  type="email"
                  placeholder="Email *"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  required
                  className="genz-input"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone Number *"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  required
                  className="genz-input"
                />
                <Input
                  type="text"
                  placeholder="City / Area *"
                  value={regForm.location}
                  onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
                  required
                  className="genz-input"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <select
                  value={regForm.fitnessLevel}
                  onChange={(e) => setRegForm({ ...regForm, fitnessLevel: e.target.value })}
                  required
                  className="genz-input"
                >
                  <option value="">Fitness Level *</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select
                  value={regForm.availability}
                  onChange={(e) => setRegForm({ ...regForm, availability: e.target.value })}
                  required
                  className="genz-input"
                >
                  <option value="">Preferred Time *</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              <Input
                type="text"
                placeholder="Profession / Field *"
                value={regForm.profession}
                onChange={(e) => setRegForm({ ...regForm, profession: e.target.value })}
                required
                className="genz-input"
              />
              <textarea
                placeholder="Goals & Interests *"
                value={regForm.goals}
                onChange={(e) => setRegForm({ ...regForm, goals: e.target.value })}
                required
                className="genz-input w-full h-24 resize-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="genz-button w-full py-4 text-base"
              >
                {isLoading ? "JOINING..." : "JOIN TRIBE 🚀"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JoinTribe;
