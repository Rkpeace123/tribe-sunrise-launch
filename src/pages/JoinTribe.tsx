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
        title: "Registration Received!",
        description: "We've got your details and will be in touch soon.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            JOIN THE <span className="text-orange-500">RUN TRIBE</span>
          </h1>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Discover a community where fitness meets friendship. Network, grow, and jog together.
          </p>
        </div>

        {/* Flow Chart */}
        <div className="bg-gray-900 rounded-2xl p-6 sm:p-10 mb-16 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-orange-400 mb-6">How It Works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center text-sm text-white">
            <div className="flex flex-col items-center">
              <span className="text-2xl">👋</span>
              <p className="mt-2">You Join</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🏃‍♂️</span>
              <p className="mt-2">You Jog</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🤝</span>
              <p className="mt-2">You Connect</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🫂</span>
              <p className="mt-2">You Bond</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">📚</span>
              <p className="mt-2">You Learn</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🚀</span>
              <p className="mt-2">You Grow</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
            Register to Join the Tribe
          </h2>
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={regForm.email}
                onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                required
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="tel"
                placeholder="Phone Number (WhatsApp preferred)"
                value={regForm.phone}
                onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="City / Area"
                value={regForm.location}
                onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <select
                value={regForm.fitnessLevel}
                onChange={(e) => setRegForm({ ...regForm, fitnessLevel: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Running Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                value={regForm.availability}
                onChange={(e) => setRegForm({ ...regForm, availability: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Preferred Running Time</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <Input
              type="text"
              placeholder="Profession / Field"
              value={regForm.profession}
              onChange={(e) => setRegForm({ ...regForm, profession: e.target.value })}
            />
            <textarea
              placeholder="Networking Goal (e.g., Career, Business, Mentorship)"
              value={regForm.goals}
              onChange={(e) => setRegForm({ ...regForm, goals: e.target.value })}
              className="border rounded px-3 py-2 w-full h-24 resize-none"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="sigma-button w-full px-8 py-3 text-lg mt-2"
            >
              {isLoading ? "JOINING..." : "JOIN THE TRIBE! 🚀"}
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinTribe;
