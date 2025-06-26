
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-space font-bold genz-heading">
              Run<span className="text-orange-500">Tribe</span>
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                isActive('/') ? 'text-orange-500' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                isActive('/about') ? 'text-orange-500' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link to="/join">
              <button className="genz-button text-xs py-2 px-4">
                Join Tribe
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
