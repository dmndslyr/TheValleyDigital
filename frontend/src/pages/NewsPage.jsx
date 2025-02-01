import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsPage.css';
import placeholderImg from "../assets/placeholder.jpg";
import axios from 'axios';

function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');  // State to manage sorting order (latest or oldest)
  const articlesPerPage = 10;

  // Fetch articles from the API with the selected order
  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://54.153.133.144:8000/articles/?order=${order}`);
      setArticles(response.data.filter(article => article.category === 1));  // Filter for News category
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
    <div className="news-page">
      <div className="news-title-header">
        <h1>NEWS</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="news-category">
        {/* Button to toggle between latest and oldest */}
        <button className="sort-toggle" onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}>
          {order === 'desc' ? 'SORT BY: OLDEST' : 'SORT BY: LATEST'}
        </button>
      </div>

      <div className="news-articles">
        {/* Conditionally render the newest and recent articles only on the first page */}
        {currentPage === 1 && (
          <>
            {/* Newest article */}
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="news-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="newest-image" />
                  <div className="news-content newest-content">
                    <h2 className="news-headline newest-headline">{article.headline}</h2>
                    <div className="news-meta">
                      <div className="news-author">
                        <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.publication_date}</span>
                      </div>
                      <div className="news-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent articles (second and third newest) */}
            <div className="recent-articles-container">
              {currentArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="news-article recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="news-image" />
                  <div className="news-content">
                    <h2 className="news-headline">{article.headline}</h2>
                    <div className="news-meta">
                      <div className="news-author">
                        <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.publication_date}</span>
                      </div>
                      <div className="news-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Display other articles */}
        {currentArticles.slice(currentPage === 1 ? 3 : 0).map((article) => (
          <div key={article.id} className="news-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.image_url || placeholderImg} alt="Article" className="news-image" />
            <div className="news-content">
              <h2 className="news-headline">{article.headline}</h2>
              <div className="news-meta">
                <div className="news-author">
                  <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.publication_date}</span>
                </div>
                <div className="news-date">{article.date}</div>
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

export default NewsPage;
