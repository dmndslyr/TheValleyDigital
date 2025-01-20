import React, { useState, useEffect } from 'react';
import './SearchInterface.css';
import placeholderImg from '../assets/placeholder.jpg'; 
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation to access URL params

const SearchInterface = () => {
  const [articles, setArticles] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // Local search query state

  const articlesPerPage = 10;
  const location = useLocation(); // Get location (URL) object
  const navigate = useNavigate(); // To programmatically change the URL

  // Function to fetch articles based on the search query
  const fetchArticles = async (query) => {
    setLoading(true);
    setError(null);

    const url = query
      ? `http://127.0.0.1:8000/search/?query=${encodeURIComponent(query)}`
      : 'http://127.0.0.1:8000/articles/';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      console.log('Fetched articles:', data); 

      if (data && data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]); 
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when the location changes (i.e., query changes in the URL)
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query'); // Get query from URL
    if (query !== null && query !== searchQuery) {
      setSearchQuery(query); // Set searchQuery state to match the query in the URL
      setCurrentPage(1); // Reset to first page when query changes
      fetchArticles(query); // Fetch articles based on query
    }
  }, [location.search]); // Re-run when the URL search string changes

  // Handle search bar input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update local state when typing in the search bar
  };

  // Handle search on "Enter"
  const handleSearchEnter = () => {
    navigate(`/advanced-search?query=${searchQuery}`); // Update URL when user presses Enter
  };

  // Pagination Logic
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); 
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); 
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 5) {
        pageNumbers.push('...');
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className="all-article-page">
      {loading && <div>Loading articles...</div>}
      {error && <div>Error: {error}</div>}
      
      <h1 className='search-result-text'>Search Results for: {searchQuery}</h1>

      {/* Display Articles */}
      <div className="all-article-articles">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <div key={article.id || index} className="all-article">
              <img src={article.img || placeholderImg} alt="Article" className="all-article-image" />
              <div className="all-article-content">
                <div className="all-article-section">{article.category}</div>
                <h2 className="all-article-headline">{article.headline}</h2>
                <div className="all-article-metadata">
                  <div className="all-article-author">
                    <span className="all-article-author-name">{article.author}</span>
                    <span className="all-article-time">{article.time}</span>
                  </div>
                  <div className="all-article-date">{article.publication_date}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='no-results'>No articles found...</div>
        )}
      </div>

      {/* Pagination */}
      <div className="all-article-pagination">
        <button
          className="all-article-arrow prev"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers().map((number, index) => (
          <button
            key={index}
            className={`page-number ${number === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="all-article-arrow next"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SearchInterface;


