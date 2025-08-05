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
      className={`min-h-screen ${isDarkMode ? 'dark' : 'light'} bg-gray-50 dark:bg-[#111827] transition-colors duration-500`}
      style={{ backgroundColor: isDarkMode ? '#111827' : '#f8fafc' }}
    >
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 style={{ backgroundColor: '#111827' }} backdrop-blur-md border-b border-gray-700">
      <motion.header 
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-900/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button> */}
            
            {/* <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <span className="font-bold text-xl text-white">phish defense.</span>
            </div>
          </div> */}
<div className="flex items-center gap-3">
  <img
    src="/images/lightmodelogo.png"
    alt="Phish Defense News Logo"
    className="w-2xs h-fit object-contain"
  />
</div>
</div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? isDarkMode 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? isDarkMode 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/personalized"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? isDarkMode 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Trending
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? isDarkMode 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
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
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm cursor-pointer" onClick={handleSearch} />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={handleSearchBarClick}
                className={`w-64 pl-10 pr-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-teal-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
                }`}
              />
            </form>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                whileTap={{ rotate: 180, scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
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
                      transition={{ duration: 0.3 }}
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
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaBookmark />
              </NavLink>
              <NavLink
                to="/settings"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaCog />
              </NavLink>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  className={`p-2 rounded-full transition-all duration-300 focus:outline-none ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
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
                      className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg z-50 border ${
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
                              ? 'text-gray-200 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          className={`px-4 py-2 rounded transition-all duration-300 ${
                            isDarkMode 
                              ? 'text-gray-200 hover:bg-gray-700' 
                              : 'text-gray-700 hover:bg-gray-100'
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
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
          className={`fixed lg:static inset-y-0 left-0 z-40 w-80 border-r transform transition-all duration-500 ease-in-out ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col h-full  overflow-y-auto custom-scrollbar">
            {/* Top Logo Section */}
            <div className="px-6 mb-6">
              <div className="flex items-center justify-end gap-2">
                
              </div>
            </div>

            {/* View All Categories Button */}
            <div className="px-6 mb-3">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-teal-900/30 border-teal-500 text-teal-400 hover:bg-teal-900/50' 
                    : 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100'
                }`}
                onClick={() => navigate('/categories')}
              >
                <div className="flex items-center gap-3">
                  {/* Custom 3x3 grid icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="5" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="10" y="3" width="5" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="17" y="3" width="4" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="3" y="10" width="5" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="10" y="10" width="5" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="17" y="10" width="4" height="5" rx="1" fill="#14b8a6"/>
                    <rect x="3" y="17" width="5" height="4" rx="1" fill="#14b8a6"/>
                    <rect x="10" y="17" width="5" height="4" rx="1" fill="#14b8a6"/>
                    <rect x="17" y="17" width="4" height="4" rx="1" fill="#14b8a6"/>
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
                  className={`mb-4 animate-fadeIn font-semibold text-xs tracking-wider uppercase ${
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
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center justify-between px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isActive && category.id === window.sessionStorage.getItem('selectedCategory')
                          ? isDarkMode 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-blue-500 text-white'
                          : isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                    onClick={() => {
                      setSidebarOpen(false);
                      window.sessionStorage.setItem('selectedCategory', category.id);
                      window.dispatchEvent(new CustomEvent('categoryChanged', { detail: category.id }));
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <category.icon className={`text-xl ${isActive && category.id === 'all' ? 'text-white' : category.color}`} />
                          <span className={`font-medium text-base ${
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
                  className={`mb-4 animate-fadeIn font-semibold text-xs tracking-wider uppercase ${
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
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? isDarkMode 
                            ? 'bg-teal-500/20 text-teal-400' 
                            : 'bg-blue-100 text-blue-600'
                          : isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <action.icon className={`text-lg ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <span className={`font-medium text-base ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{action.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bottom Section */}
            
          </div>
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <motion.main 
          className={`flex-1 min-h-screen transition-all duration-500 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}