import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FaShieldAlt, 
  FaSun, 
  FaMoon, 
  FaBell, 
  FaBookmark, 
  FaCog, 
  FaUser,
  FaSearch,
  FaHome,
  FaFire,
  FaLayerGroup,
  FaHeart,
  FaChartLine,
  FaGlobe,
  FaLock,
  FaFlask,
  FaBuilding,
  FaNewspaper,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaEye,
  FaLaptop,
  FaMicroscope
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Shield,
  Laptop,
  Building,
  Globe,
  Microscope,
  Heart,
  Landmark,
  Trophy,
  Plane
} from 'lucide-react';
const sidebarCategories = [
  { id: 'all', label: 'All News', icon: Home, path: '/', color: 'text-white' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield, path: '/categories', color: 'text-red-400' },
  { id: 'technology', label: 'Technology', icon: Laptop, path: '/categories', color: 'text-blue-400' },
  { id: 'business', label: 'Business', icon: Building, path: '/categories', color: 'text-green-400' },
  { id: 'politics', label: 'Politics', icon: Landmark, path: '/categories', color: 'text-purple-400' },
  { id: 'science', label: 'Science', icon: Microscope, path: '/categories', color: 'text-yellow-400' },
  { id: 'health', label: 'Health', icon: Heart, path: '/categories', color: 'text-pink-400' },
  { id: 'world', label: 'World', icon: Globe, path: '/categories', color: 'text-indigo-400' },
  { id: 'sports', label: 'Sports', icon: Trophy, path: '/categories', color: 'text-orange-400' },
  { id: 'travel', label: 'Travel', icon: Plane, path: '/categories', color: 'text-teal-400' },
];

const quickActions = [
  { id: 'trending', label: 'Trending', icon: FaChartLine, path: '/personalized' },
  { id: 'saved', label: 'Saved Articles', icon: FaBookmark, path: '/bookmarks' },
  { id: 'settings', label: 'Settings', icon: FaCog, path: '/settings' },
];

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle search submit
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate('/search', { state: { keyword: searchTerm.trim() } });
    setSearchTerm("");
  };

  // Open search page on search bar click
  const handleSearchBarClick = () => {
    navigate('/search');
  };

  // Responsive and theme-aware background
  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'dark' : ''} theme-transition`}
      style={{ 
        backgroundColor: isDarkMode ? '#111827' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#111827'
      }}
    >
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b theme-transition ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 hover-lift">
              <img
                src="/images/lightmodelogo.png"
                alt="Phish Defense News Logo"
                className="w-2xs h-fit object-contain transition-transform duration-300"
              />
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ${
                  isActive 
                    ? `${isDarkMode ? 'text-teal-400 border-b-2 border-teal-400' : 'text-teal-600 border-b-2 border-teal-600'}` 
                    : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ${
                  isActive 
                    ? `${isDarkMode ? 'text-teal-400 border-b-2 border-teal-400' : 'text-teal-600 border-b-2 border-teal-600'}` 
                    : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/personalized"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ${
                  isActive 
                    ? `${isDarkMode ? 'text-teal-400 border-b-2 border-teal-400' : 'text-teal-600 border-b-2 border-teal-600'}` 
                    : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`
              }
            >
              Trending
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ${
                  isActive 
                    ? `${isDarkMode ? 'text-teal-400 border-b-2 border-teal-400' : 'text-teal-600 border-b-2 border-teal-600'}` 
                    : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`
              }
            >
              Saved
            </NavLink>
          </nav>

          {/* Right: Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form className="hidden sm:block relative" onSubmit={handleSearch}>
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm cursor-pointer transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`} onClick={handleSearch} />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={handleSearchBarClick}
                className={`w-64 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover-lift ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 hover-lift ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                whileTap={{ rotate: 180, scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                style={{ background: isDarkMode ? '#374151' : '#e0f7fa' }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {isDarkMode ? (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaSun className="text-yellow-500" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                    >
                      <FaMoon className="text-blue-800" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400">
                <FaBell />
              </button> */}
                {/* to="/bookmarks"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'text-teal-400 border-b-2 border-teal-400' 
                    : 'text-gray-300 hover:text-white'
                }`
              }
            >
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400">
                <FaBookmark />
              </button> 
            </NavLink> 
              <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400">
                <FaBookmark />
              </button>  */}
              <NavLink
                to="/bookmarks"
                className={`p-2 rounded-lg transition-all duration-300 hover-lift ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-teal-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'
                }`}
              >
                <FaBookmark />
              </NavLink>
              <NavLink
                to="/settings"
                className={`p-2 rounded-lg transition-all duration-300 hover-lift ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-teal-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'
                }`}
              >
                <FaCog />
              </NavLink>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  className={`p-2 rounded-full transition-all duration-300 hover-lift focus:outline-none ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-teal-400 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setShowProfileDropdown((v) => !v)}
                >
                  <FaUser />
                </button>
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg z-50 border theme-transition ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col py-2">
                        <NavLink
                          to="/login"
                          className={`px-4 py-2 rounded transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          className={`px-4 py-2 rounded transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Sign Up
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-80 border-r transform transition-all duration-300 ease-in-out theme-transition ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        } ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex flex-col h-full  overflow-y-auto custom-scrollbar">
            {/* Top Logo Section */}
            <div className="px-6 mb-6">
              <div className="flex items-center justify-end gap-2">
                
              </div>
            </div>

            {/* View All Categories Button */}
            <div className="px-6 mb-3">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg font-medium transition-all duration-300 hover-lift btn-animated ${
                  isDarkMode 
                    ? 'bg-teal-900/30 border-teal-500 text-teal-400 hover:bg-teal-900/50' 
                    : 'bg-teal-50 border-teal-300 text-teal-600 hover:bg-teal-100'
                }`}
                onClick={() => navigate('/categories')}
              >
                <div className="flex items-center gap-3">
                  {/* Custom 3x3 grid icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="5" height="5" rx="1" fill="currentColor"/>
                    <rect x="10" y="3" width="5" height="5" rx="1" fill="currentColor"/>
                    <rect x="17" y="3" width="4" height="5" rx="1" fill="currentColor"/>
                    <rect x="3" y="10" width="5" height="5" rx="1" fill="currentColor"/>
                    <rect x="10" y="10" width="5" height="5" rx="1" fill="currentColor"/>
                    <rect x="17" y="10" width="4" height="5" rx="1" fill="currentColor"/>
                    <rect x="3" y="17" width="5" height="4" rx="1" fill="currentColor"/>
                    <rect x="10" y="17" width="5" height="4" rx="1" fill="currentColor"/>
                    <rect x="17" y="17" width="4" height="4" rx="1" fill="currentColor"/>
                  </svg>
                  <span className="font-medium">View All Categories</span>
                </div>
                <FaArrowRight className="text-lg" />
              </button>
            </div>

            {/* Categories Section */}
            <div className="px-6 mb-5">
              <div className="flex items-center gap-2 ">
                <h5
                  className={`mb-4 animate-fadeIn font-semibold text-xs leading-4 tracking-wider uppercase transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Categories
                </h5>
              </div>
              
              <nav className="space-y-1">
                {sidebarCategories.map((category) => (
                  <NavLink
                    key={category.id}
                    to={category.id === 'all' ? '/' : '/search'}
                    state={category.id === 'all' ? {} : { category: category.id }}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                        isActive && category.id === 'all'
                          ? `${isDarkMode ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-800'}`
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <category.icon className={`text-xl ${isActive && category.id === 'all' ? 'text-white' : category.color}`} />
                          <span className={`font-medium text-base transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>{category.label}</span>
                        </div>
                        {isActive && category.id === 'all' && <FaArrowRight className="text-sm" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Quick Actions Section */}
            <div className="px-6 ">
              <div className="flex items-center gap-2 ">
                <h5
                  className={`mb-4 animate-fadeIn font-semibold text-xs leading-4 tracking-wider uppercase transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Quick Actions
                </h5>
              </div>
              
              <nav className="space-y-1">
                {quickActions.map((action) => (
                  <NavLink
                    key={action.id}
                    to={action.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift ${
                        isActive
                          ? `${isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`
                          : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <action.icon className={`text-lg transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <span className={`font-medium text-base transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{action.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Section */}
            
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-screen theme-transition ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}