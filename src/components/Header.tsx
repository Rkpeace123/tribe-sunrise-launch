
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="RunTribe Logo" 
                className="h-8 w-8 rounded"
              />
              <div className="text-lg font-bold sigma-heading text-orange-500">
                RUNTRIBE
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-orange-500 ${
                  location.pathname === '/' ? 'text-orange-500' : 'text-gray-300'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-orange-500 ${
                  location.pathname === '/about' ? 'text-orange-500' : 'text-gray-300'
                }`}
              >
                About
              </Link>
              <Link 
                to="/join" 
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-orange-500 ${
                  location.pathname === '/join' ? 'text-orange-500' : 'text-gray-300'
                }`}
              >
                Join tribe
              </Link>
            </nav>
            
            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-gray-300 text-sm">
                    Welcome!
                  </span>
                  <Button 
                    onClick={signOut}
                    variant="ghost" 
                    size="sm"
                    className="text-gray-300 hover:text-orange-500"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/join">
                    <Button size="sm" className="sigma-button">
                      Join
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black border-t border-gray-800">
              <div className="p-4 space-y-3">
                <nav className="space-y-2">
                  <Link 
                    to="/" 
                    className={`block text-sm font-medium uppercase tracking-wide py-2 ${
                      location.pathname === '/' ? 'text-orange-500' : 'text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/about" 
                    className={`block text-sm font-medium uppercase tracking-wide py-2 ${
                      location.pathname === '/about' ? 'text-orange-500' : 'text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/join" 
                    className={`block text-sm font-medium uppercase tracking-wide py-2 ${
                      location.pathname === '/join' ? 'text-orange-500' : 'text-gray-300'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join
                  </Link>
                </nav>
                
                <div className="pt-3 border-t border-gray-800 space-y-2">
                  {user ? (
                    <>
                      <div className="text-gray-300 text-sm py-2">
                        Welcome!
                      </div>
                      <Button 
                        onClick={signOut}
                        variant="ghost" 
                        size="sm"
                        className="w-full text-gray-300 hover:text-orange-500"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full text-gray-300 hover:text-orange-500">
                          Login
                        </Button>
                      </Link>
                      <Link to="/join" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button size="sm" className="w-full sigma-button">
                          Join
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
