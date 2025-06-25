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

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left: Form Container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-black">
          <div className="bg-[#111] text-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
              Join the Run Tribe 🏃‍♂️
            </h2>
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  required
                  className="bg-black text-white border border-gray-600 placeholder-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  required
                  className="bg-black text-white border border-gray-600 placeholder-gray-400"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  placeholder="Phone Number (WhatsApp preferred)"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  required
                  className="bg-black text-white border border-gray-600 placeholder-gray-400"
                />
                <Input
                  type="text"
                  placeholder="City / Area"
                  value={regForm.location}
                  onChange={(e) => setRegForm({ ...regForm, location: e.target.value })}
                  className="bg-black text-white border border-gray-600 placeholder-gray-400"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <select
                  value={regForm.fitnessLevel}
                  onChange={(e) => setRegForm({ ...regForm, fitnessLevel: e.target.value })}
                  className="bg-black text-white border border-gray-600 px-3 py-2 rounded"
                >
                  <option value="">Running Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select
                  value={regForm.availability}
                  onChange={(e) => setRegForm({ ...regForm, availability: e.target.value })}
                  className="bg-black text-white border border-gray-600 px-3 py-2 rounded"
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
                className="bg-black text-white border border-gray-600 placeholder-gray-400"
              />
              <textarea
                placeholder="Networking Goal (e.g., Career, Business, Mentorship)"
                value={regForm.goals}
                onChange={(e) => setRegForm({ ...regForm, goals: e.target.value })}
                className="bg-black text-white border border-gray-600 placeholder-gray-400 px-3 py-2 w-full h-24 resize-none rounded"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 text-black hover:bg-orange-600 transition w-full px-8 py-3 text-lg mt-2 rounded"
              >
                {isLoading ? "JOINING..." : "JOIN THE TRIBE! 🚀"}
              </Button>
            </form>
          </div>
        </div>

        {/* Right: Visual Side */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold px-8 text-center leading-tight">
              Run Together. Grow Together.<br />
              <span className="text-orange-500">One Tribe. One Journey.</span>
            </h1>
          </div>
         
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JoinTribe;
