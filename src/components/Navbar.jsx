import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/authUtils';
import { Menu, X } from 'lucide-react';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm border border-secondary shadow-md">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-blue-600 font-bold text-lg sm:text-xl flex items-center">
              <img className='w-8 mt-2' src={assets.logo1} alt="" />
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hidden sm:inline">
                TECH HAVC SOLUTIONS
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent sm:hidden">
                TECH
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Desktop User Menu */}
            {currentUser && (
              <>
                <div className="text-gray-600">
                  <span>Welcome, </span>
                  <span className="font-semibold text-blue-600">{currentUser.name}</span>
                </div>
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                      {currentUser.name.charAt(0)}
                    </div>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg py-1 z-10 hidden group-hover:block border border-blue-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-4">
              {/* WhatsApp Contact Button Mobile */}
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-sm font-medium">Contact Support</span>
              </a>

              {/* Mobile User Section */}
              {currentUser && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md mr-3">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">Welcome,</div>
                      <div className="text-sm font-semibold text-blue-600">{currentUser.name}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors rounded-lg mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
