import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SportsPage.css';
import placeholderImg from "../assets/placeholder.jpg"; // If SportsPage is inside 'src/pages'
import axios from 'axios';

function SportsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');  // State to manage sorting order (latest or oldest)
  const articlesPerPage = 10;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/articles/?order=${order}`);
      setArticles(response.data.filter(article => article.category === 5)); // Filter for Sports category
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [order]);  // Re-fetch articles when the order changes

  // Sort articles by date based on the 'order' state
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

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // Render page numbers with ellipses
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
    <div className="sports-page">
      <div className="sports-title-header">
        <h1>SPORTS</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="sports-category">
        {/* Button to toggle between latest and oldest */}
        <button className="sort-toggle" onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}>
          {order === 'desc' ? 'SORT BY: OLDEST' : 'SORT BY: LATEST'}
        </button>
      </div>

      <div className="sports-articles">
        {/* Conditionally render the newest and recent articles only on the first page */}
        {currentPage === 1 && (
          <>
            {/* Newest article */}
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="sports-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="newest-image" />
                  <div className="sports-content newest-content">
                    <h2 className="sports-headline newest-headline">{article.headline}</h2>
                    <div className="sports-meta">
                      <div className="sports-author">
                        <span className="sports-author-name">{article.author}</span> | <span className="sports-time">{article.time}</span>
                      </div>
                      <div className="sports-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent articles (second and third newest) */}
            <div className="recent-articles-container">
              {currentArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="sports-article recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="sports-image" />
                  <div className="sports-content">
                    <h2 className="sports-headline">{article.headline}</h2>
                    <div className="sports-meta">
                      <div className="sports-author">
                        <span className="sports-author-name">{article.author}</span> | <span className="sports-time">{article.time}</span>
                      </div>
                      <div className="sports-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Display other articles */}
        {currentArticles.slice(currentPage === 1 ? 3 : 0).map((article) => (
          <div key={article.id} className="sports-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.image_url || placeholderImg} alt="Article" className="sports-image" />
            <div className="sports-content">
              <h2 className="sports-headline">{article.headline}</h2>
              <div className="sports-meta">
                <div className="sports-author">
                  <span className="sports-author-name">{article.author}</span> | <span className="sports-time">{article.time}</span>
                </div>
                <div className="sports-date">{article.date}</div>
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

export default SportsPage;

