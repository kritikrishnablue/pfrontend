import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Filters from '../components/Filters';
import { newsAPI } from '../services/api';
import { FaSearch, FaCalendar, FaFilter, FaDatabase } from 'react-icons/fa';

export default function Search() {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(location.state?.keyword || '');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Search on mount or when keyword changes
  useEffect(() => {
    if (location.state?.keyword) {
      setSearchInput(location.state.keyword);
      handleSearch(location.state.keyword);
    }
  }, [location.state]);

  // Main search handler
  const handleSearch = async (input) => {
    if (!input || !input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await newsAPI.searchNews({ keywords: input });
      setArticles(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const clearResults = () => {
    setArticles([]);
    setError(null);
    setSearchInput('');
  };

  return (
    <motion.div 
      className={`p-4 max-w-6xl mx-auto min-h-screen transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Search News</h1>
        <p className={`${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Find news articles by entering any word, phrase, paragraph, or category below.
        </p>
      </motion.div>

      {/* Search Box */}
      <motion.form 
        onSubmit={handleFormSubmit} 
        className="mb-8 flex flex-col sm:flex-row gap-4 items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Type any word, phrase, paragraph, or category..."
          className={`flex-1 px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 text-lg transition-all duration-300 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 text-white focus:ring-teal-400' 
              : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
          }`}
        />
        <motion.button
          type="submit"
          className={`px-6 py-3 text-white rounded-lg transition-all duration-300 flex items-center gap-2 text-lg hover:scale-105 ${
            isDarkMode 
              ? 'bg-teal-500 hover:bg-teal-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch className="text-xl" />
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
        <button
          type="button"
          onClick={clearResults}
          className={`px-4 py-3 text-lg transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-300' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Clear
        </button>
      </motion.form>

      {/* Results */}
      <div>
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-2 text-gray-400">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-4">
            <p className="text-red-200">Error: {error}</p>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div>
            <motion.div 
              className={`mb-4 p-4 border rounded-lg ${
                isDarkMode 
                  ? 'bg-green-900/30 border-green-700 text-green-200' 
                  : 'bg-green-50 border-green-300 text-green-700'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-semibold mb-2">Search Results</h3>
              <p className="text-sm">
                Found {articles.length} articles matching your search.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <motion.div
                  key={article.url || article.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <NewsCard
                    article={article}
                    showStatus={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaSearch className={`text-4xl mx-auto mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>No Results Found</h3>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try a different word, phrase, or category.
            </p>
          </motion.div>
        )}
      </div>

      {/* Search Stats */}
      {!loading && !error && articles.length > 0 && (
        <motion.div 
          className={`mt-8 p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className={`font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Search Summary</h3>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <div>
              <span className="font-medium">Results:</span> {articles.length}
            </div>
            <div>
              <span className="font-medium">Keywords:</span> {searchInput || 'None'}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
