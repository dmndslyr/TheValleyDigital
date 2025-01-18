import React, { useState, useEffect } from 'react';
import './SearchInterface.css';
import placeholderImg from '../assets/placeholder.jpg'; // Placeholder image for articles

const SearchInterface = () => {
  const [articles, setArticles] = useState([]); // Store fetched articles
  const [currentPage, setCurrentPage] = useState(1); // Pagination page state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  const articlesPerPage = 10;

  // Function to fetch articles based on the search query
  const fetchArticles = async (query) => {
    setLoading(true);
    setError(null);

    const url = query
      ? `http://127.0.0.1:8000/search/?query=${encodeURIComponent(query)}`
      : 'http://127.0.0.1:8000/articles/'; // For no query, fetch all articles

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }

      const data = await response.json();
      console.log('Fetched articles:', data); // Debugging the response

      // Check if data contains articles and set them
      if (data && data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]); // Set empty array if no articles are found
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when search query changes
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the search query changes
    fetchArticles(searchQuery);
  }, [searchQuery]); // This effect will run every time `searchQuery` changes

  // Pagination Logic
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to the top when switching pages
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to the top when switching pages
    }
  };

  // Render page numbers for pagination
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
      {/* Loading and error states */}
      {loading && <div>Loading articles...</div>}
      {error && <div>Error: {error}</div>}

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <div className="search-input-container">
            <i className="fas fa-search search-icons"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update query when input changes
              placeholder="Search article..."
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Display Articles */}
      <div className="all-article-articles">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <div key={article.id || index} className="all-article"> {/* Use article.id, or fallback to index */}
              <img
                src={article.img || placeholderImg}
                alt="Article"
                className="all-article-image"
              />
              <div className="all-article-content">
                <div className="all-article-section">{article.section}</div>
                <h2 className="all-article-headline">{article.headline}</h2>
                <div className="all-article-metadata">
                  <div className="all-article-author">
                    <span className="all-article-author-name">{article.author}</span> |{' '}
                    <span className="all-article-time">{article.time}</span>
                  </div>
                  <div className="all-article-date">{article.publication_date}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No articles found</div>
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

