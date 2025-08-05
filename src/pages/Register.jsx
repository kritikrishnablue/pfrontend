import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleOAuth } from '../services/googleOAuth';
import { appleOAuth } from '../services/appleOAuth';
import { FaGoogle, FaApple, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState({ google: false, apple: false });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register, googleOAuth: authGoogleOAuth, appleOAuth: authAppleOAuth, error } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        preferences: {
          topics: [],
          sources: [],
          countries: []
        },
        bookmarks: [],
        liked_articles: []
      });
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setOauthLoading(prev => ({ ...prev, google: true }));
    try {
      // Get Google ID token
      const idToken = await googleOAuth.signInWithIdToken();
      
      // Send to backend for verification
      await authGoogleOAuth(idToken);
      navigate('/');
    } catch (err) {
      console.error('Google OAuth error:', err);
      // You might want to show this error to the user
    } finally {
      setOauthLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleAppleSignIn = async () => {
    setOauthLoading(prev => ({ ...prev, apple: true }));
    try {
      // Get Apple ID token
      const idToken = await appleOAuth.signInWithSDK();
      
      // Send to backend for verification
      await authAppleOAuth(idToken);
      navigate('/');
    } catch (err) {
      console.error('Apple OAuth error:', err);
      // You might want to show this error to the user
    } finally {
      setOauthLoading(prev => ({ ...prev, apple: false }));
    }
  };

  return (
    <motion.div 
      className={`p-4 max-w-md mx-auto flex items-center justify-center min-h-[80vh] transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={`shadow-lg rounded-lg p-8 w-full border transition-all duration-500 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className={`text-2xl font-bold mb-6 text-center ${
          isDarkMode ? 'text-teal-400' : 'text-blue-600'
        }`}>Create an Account</h1>
        
        {/* Social Sign-in Buttons */}
        <motion.div 
          className="mb-6 space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={oauthLoading.google || oauthLoading.apple}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaGoogle className="text-red-500" />
            {oauthLoading.google ? 'Signing in...' : 'Continue with Google'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={handleAppleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={oauthLoading.apple || oauthLoading.google}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaApple />
            {oauthLoading.apple ? 'Signing in...' : 'Continue with Apple'}
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${
              isDarkMode ? 'border-gray-600' : 'border-gray-300'
            }`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-400' 
                : 'bg-white text-gray-600'
            }`}>or register with email</span>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Username Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaUser className="inline mr-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-teal-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-blue-500'
              } ${
                errors.username ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              disabled={loading}
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-teal-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-blue-500'
              } ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              }`}
              required
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaLock className="inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-teal-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-blue-500'
                } ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaLock className="inline mr-2" />
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded focus:outline-none focus:ring-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-teal-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-blue-500'
                } ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button 
            type="submit" 
            className={`w-full px-4 py-3 text-white border rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
              isDarkMode 
                ? 'bg-teal-500 border-teal-600 hover:bg-teal-600' 
                : 'bg-blue-500 border-blue-600 hover:bg-blue-600'
            }`}
            disabled={loading || oauthLoading.google || oauthLoading.apple}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>

          {/* Error Display */}
          {error && (
            <motion.div 
              className={`text-center text-sm border rounded-lg p-3 ${
                isDarkMode 
                  ? 'text-red-400 bg-red-900/20 border-red-500' 
                  : 'text-red-700 bg-red-50 border-red-300'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}
        </motion.form>

        {/* Login Link */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className={`font-semibold transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-teal-400 hover:text-teal-300' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Sign in here
            </Link>
          </p>
        </motion.div>

        {/* Terms and Privacy */}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            By creating an account, you agree to our{' '}
            <a href="#" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-teal-400 hover:text-teal-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'text-teal-400 hover:text-teal-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}>Privacy Policy</a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
