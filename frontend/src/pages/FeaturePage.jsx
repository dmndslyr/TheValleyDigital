import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturePage.css';
import placeholderImg from "../assets/placeholder.jpg"; // If FeaturePage is inside 'src/pages'
import axios from 'axios';

function FeaturePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');  // State to manage the sorting order
  const articlesPerPage = 10;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`https://api.thevalley.digital/articles/?order=${order}`);
      setArticles(response.data.filter(article => article.category === 3));  // Filter for Feature category
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [order]);  // Re-fetch articles whenever order changes

  // Sort articles by date (most recent first or oldest first based on 'order')
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const navigate = useNavigate();
  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

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
      pageNumbers.push(1); // First page
      if (currentPage > 5) {
        pageNumbers.push('...');
      }
      if (currentPage > 1 && currentPage < totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages); // Last page
    }
    return pageNumbers;
  };

  if (loading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div className="feature-page">
      <div className="feature-title-header">
        <h1>FEATURE</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="feature-category">
        {/* Button to toggle between latest and oldest */}
        <button className="sort-toggle" onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}>
          {order === 'desc' ? 'SORT BY: OLDEST' : 'SORT BY: LATES'}
        </button>
      </div>

      <div className="feature-articles">
        {currentPage === 1 && (
          <>
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="feature-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="newest-image" />
                  <div className="feature-content newest-content">
                    <h2 className="feature-headline newest-headline">{article.headline}</h2>
                    <div className="feature-meta">
                      <div className="feature-author">
                        <span className="feature-name">{article.author}</span> | <span className="feature-time">{article.publication_date}</span>
                      </div>
                      <div className="feature-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="recent-articles-container">
              {currentArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="feature-article recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="feature-image" />
                  <div className="feature-content">
                    <h2 className="feature-headline">{article.headline}</h2>
                    <div className="feature-meta">
                      <div className="feature-author">
                        <span className="feature-name">{article.author}</span> | <span className="feature-time">{article.publication_date}</span>
                      </div>
                      <div className="feature-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentArticles.slice(currentPage === 1 ? 3 : 0).map((article) => (
          <div key={article.id} className="feature-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.image_url || placeholderImg} alt="Article" className="feature-image" />
            <div className="feature-content">
              <h2 className="feature-headline">{article.headline}</h2>
              <div className="feature-meta">
                <div className="feature-author">
                  <span className="feature-name">{article.author}</span> | <span className="feature-time">{article.publication_date}</span>
                </div>
                <div className="feature-date">{article.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="all-article-pagination">
        <button className="all-article-arrow prev" onClick={prevPage} disabled={currentPage === 1}>
          &lt;
        </button>
        {renderPageNumbers().map((number, index) =>
          number === '...' ? (
            <span key={index} className="ellipsis">...</span>
          ) : (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          )
        )}
        <button className="all-article-arrow next" onClick={nextPage} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default FeaturePage;

