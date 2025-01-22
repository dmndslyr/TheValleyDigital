import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorialsPage.css';
import placeholderImg from '../assets/placeholder.jpg';
import axios from 'axios';

function EditorialsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState('desc');  // State to manage the sorting order
  const articlesPerPage = 10;

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/articles/?order=${order}`);
      setArticles(response.data.filter(article => article.category === 2));  // Filter for Editorial category
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
    <div className="editorials-page">
      <div className="editorials-title-header">
        <h1>EDITORIAL</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="editorials-category">
        {/* Button to toggle between latest and oldest */}
        <button className="sort-toggle" onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}>
          {order === 'desc' ? 'SORT BY: OLDEST' : 'SORT BY LATEST'}
        </button>
      </div>

      <div className="editorials-articles">
        {currentPage === 1 && (
          <>
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="editorials-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="newest-image" />
                  <div className="editorials-content newest-content">
                    <h2 className="editorials-headline newest-headline">{article.headline}</h2>
                    <div className="editorials-meta">
                      <div className="editorials-author">
                        <span className="editorials-author-name">{article.author}</span> | <span className="editorials-time">{article.publication_date}</span>
                      </div>
                      <div className="editorials-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="recent-articles-container">
              {currentArticles.slice(1, 3).map((article) => (
                <div key={article.id} className="editorials-article recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt="Article" className="editorials-image" />
                  <div className="editorials-content">
                    <h2 className="editorials-headline">{article.headline}</h2>
                    <div className="editorials-meta">
                      <div className="editorials-author">
                        <span className="editorials-author-name">{article.author}</span> | <span className="editorials-time">{article.publication_date}</span>
                      </div>
                      <div className="editorials-date">{article.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentArticles.slice(currentPage === 1 ? 3 : 0).map((article) => (
          <div key={article.id} className="editorials-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.image_url || placeholderImg} alt="Article" className="editorials-image" />
            <div className="editorials-content">
              <h2 className="editorials-headline">{article.headline}</h2>
              <div className="editorials-meta">
                <div className="editorials-author">
                  <span className="editorials-author-name">{article.author}</span> | <span className="all-article-time">{article.publication_date}</span>
                </div>
                <div className="editorials-date">{article.date}</div>
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

export default EditorialsPage;
