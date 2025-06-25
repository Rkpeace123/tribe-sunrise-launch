
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const { signIn, signUp, user, session } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(type !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle email verification redirect
  useEffect(() => {
    if (session && user?.email_confirmed_at) {
      navigate("/");
    }
  }, [session, user, navigate]);

  const handleRegistration = async (userData: any) => {
    try {
      const response = await fetch("https://forzio.app.n8n.cloud/webhook/RUNTRIBE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          form_type: "auth_registration",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook failed');
      }

      toast({
        title: "🚀 WELCOME TO THE TRIBE!",
        description: "Your registration has been submitted successfully. Check your email to verify your account!",
      });
    } catch (error) {
      console.error("Webhook error:", error);
      toast({
        title: "Registration Submitted",
        description: "Your account has been created. Please check your email for verification.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "WELCOME BACK! 🔥",
          description: "You're now logged in. Let's get running!",
        });
        
        navigate('/');
      } else {
        const { error } = await signUp(email, password, { name });
        if (error) throw error;

        // Send registration data to webhook
        await handleRegistration({
          name,
          email,
          registration_type: 'signup'
        });
        
        navigate('/success');
      }
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-orange-500 transition-colors p-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          BACK TO HOME
        </Button>

        <div className="sigma-card p-12 space-y-8 sigma-glow">
          {/* Logo and Title */}
          <div className="text-center space-y-6">
            <img 
              src="/logo.png" 
              alt="RunTribe Logo" 
              className="w-20 h-20 mx-auto rounded-2xl shadow-2xl pulse-orange"
            />
            <div>
              <h1 className="text-4xl sm:text-5xl sigma-heading mb-4">
                {isLogin ? 'WELCOME BACK' : 'JOIN THE TRIBE'}
              </h1>
              <p className="text-gray-400 text-lg font-light">
                {isLogin 
                  ? 'Ready to conquer your next run?' 
                  : 'Transform your mornings, expand your network'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white font-bold uppercase tracking-wider text-sm">
                  FULL NAME
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="sigma-input h-14 text-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="email" className="text-white font-bold uppercase tracking-wider text-sm">
                EMAIL ADDRESS
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sigma-input h-14 text-lg"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-white font-bold uppercase tracking-wider text-sm">
                PASSWORD
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="sigma-input h-14 text-lg pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sigma-button text-xl py-8 mt-8"
            >
              {isLoading 
                ? (isLogin ? "SIGNING IN..." : "JOINING TRIBE...") 
                : (isLogin ? "SIGN IN 🚀" : "JOIN RUNTRIBE 🔥")
              }
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center pt-6 border-t border-gray-800">
            <p className="text-gray-400 mb-4">
              {isLogin ? "New to RunTribe?" : "Already part of the tribe?"}
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 hover:text-orange-400 font-bold uppercase tracking-wider hover:bg-orange-500/10 transition-all duration-300"
            >
              {isLogin ? "CREATE ACCOUNT" : "SIGN IN"}
            </Button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          By joining, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default Auth;
