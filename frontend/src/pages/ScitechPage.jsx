import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScitechPage.css';
import placeholderImg from "../assets/placeholder.jpg"; // If SciTechPage is inside 'src/pages'
import axios from 'axios';

function SciTechPage() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');  // State to manage sorting order (latest or oldest)
  const articlesPerPage = 10;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`https://api.thevalley.digital/articles/?order=${order}`);
      setArticles(response.data.filter(article => article.category === "SCI-TECH")); // Filter for SciTech category
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
    <div className="scitech-page">
      <div className="scitech-title-header">
        <h1>SCI-TECH</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="scitech-category">
        {/* Button to toggle between latest and oldest */}
        <button className="sort-toggle" onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
          {order === 'asc' ? 'SORT BY: OLDEST' : 'SORT BY: LATEST'}
        </button>
      </div>

      <div className="scitech-articles">
        {/* Conditionally render the newest and recent articles only on the first page */}
        {currentPage === 1 && (
          <>
            {/* Newest article */}
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="scitech-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="newest-image" />
                  <div className="scitech-content newest-content">
                    <h2 className="scitech-headline newest-headline">{article.headline}</h2>
                    <div className="scitech-meta">
                      <div className="scitech-author">
                        <span className="scitech-author-name">{article.author}</span> | <span className="scitech-time">{article.publication_date}</span>
                      </div>
                      <div className="scitech-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent articles (second and third newest) */}
            <div className="recent-articles-container">
              {currentArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="scitech-article recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="scitech-image" />
                  <div className="scitech-content">
                    <h2 className="scitech-headline">{article.headline}</h2>
                    <div className="scitech-meta">
                      <div className="scitech-author">
                        <span className="scitech-author-name">{article.author}</span> | <span className="scitech-time">{article.publication_date}</span>
                      </div>
                      <div className="scitech-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Display other articles */}
        {currentArticles.slice(currentPage === 1 ? 3 : 0).map((article) => (
          <div key={article.id} className="scitech-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.image_url || placeholderImg} alt="Article" className="scitech-image" />
            <div className="scitech-content">
              <h2 className="scitech-headline">{article.headline}</h2>
              <div className="scitech-meta">
                <div className="scitech-author">
                  <span className="scitech-author-name">{article.author}</span> | <span className="scitech-time">{article.publication_date}</span>
                </div>
                <div className="scitech-date">{article.date}</div>
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

export default SciTechPage;

