import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import placeholderImg from "../assets/placeholder.jpg"; // If NewsPage is inside 'src/pages'


function NewsPage() {
  // Article data
  const articleData = {
    currentArticles: [
      { id: 1, img: placeholderImg, headline: 'Classes suspended on April 8 due to extreme heat', author: 'Juan Dela Cruz', date: '04/07/2024', time: '09:45 AM' },
      { id: 2, img: placeholderImg, headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', author: 'Juan Dela Cruz', date: '01/17/1970', time: '08:00 AM' },
      { id: 3, img: placeholderImg, headline: 'New educational reforms are on the way', author: 'Maria Santos', date: '05/10/2024', time: '10:30 AM' },
      { id: 4, img: placeholderImg, headline: 'Local farmers adopt new techniques', author: 'Carlos Reyes', date: '06/15/2024', time: '11:00 AM' },
      { id: 5, img: placeholderImg, headline: 'City park renovation plans revealed', author: 'Ana Lopez', date: '07/01/2024', time: '09:00 AM' },
      { id: 6, img: placeholderImg, headline: 'Technology trends in 2024', author: 'John Doe', date: '08/11/2024', time: '08:45 AM' },
      { id: 7, img: placeholderImg, headline: 'Art exhibition opens downtown', author: 'Jane Smith', date: '09/05/2024', time: '09:15 AM' },
      { id: 8, img: placeholderImg, headline: 'New transportation routes announced', author: 'Peter Parker', date: '10/20/2024', time: '07:50 AM' },
      { id: 9, img: placeholderImg, headline: 'Community service opportunities', author: 'Clark Kent', date: '11/02/2024', time: '09:00 AM' },
      { id: 10, img: placeholderImg, headline: 'Local sports teams prepare for championship', author: 'Diana Prince', date: '12/25/2024', time: '10:10 AM' },
      { id: 11, img: placeholderImg, headline: 'New Art Exhibition', author: 'Clark Kent', date: '01/02/2025', time: '09:00 AM' },
      { id: 12, img: placeholderImg, headline: 'Tech Innovations', author: 'Lois Lane', date: '03/10/2025', time: '11:15 AM' },
      { id: 13, img: placeholderImg, headline: 'Classes suspended on April 8 due to extreme heat', author: 'Juan Dela Cruz', date: '04/07/2024', time: '09:45 AM' },
      { id: 14, img: placeholderImg, headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', author: 'Juan Dela Cruz', date: '01/17/1970', time: '08:00 AM' },
      { id: 15, img: placeholderImg, headline: 'New educational reforms are on the way', author: 'Maria Santos', date: '05/10/2024', time: '10:30 AM' },
      { id: 16, img: placeholderImg, headline: 'Local farmers adopt new techniques', author: 'Carlos Reyes', date: '06/15/2024', time: '11:00 AM' },
      { id: 17, img: placeholderImg, headline: 'City park renovation plans revealed', author: 'Ana Lopez', date: '07/01/2024', time: '09:00 AM' },
      { id: 18, img: placeholderImg, headline: 'Technology trends in 2024', author: 'John Doe', date: '08/11/2024', time: '08:45 AM' },
      { id: 19, img: placeholderImg, headline: 'Art exhibition opens downtown', author: 'Jane Smith', date: '09/05/2024', time: '09:15 AM' },
      { id: 20, img: placeholderImg, headline: 'New transportation routes announced', author: 'Peter Parker', date: '10/20/2024', time: '07:50 AM' },
      { id: 21, img: placeholderImg, headline: 'Community service opportunities', author: 'Clark Kent', date: '11/02/2024', time: '09:00 AM' },
    ],
  };

  // Sort articles by date (most recent first)
  const sortedArticles = articleData.currentArticles.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handle article click
  const handleArticleClick = (id) => {
    // Implement navigation functionality here if needed
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
      // If total pages are 6 or less, display all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If more than 6 pages, show the first, current, last, and ellipses
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

  return (
    <div className="news-page">
      <div className="news-title-header">
        <h1>NEWS</h1>
        <div className='header-slice'></div>
        <div className='header-slice'></div>
      </div>

      <div className="news-articles">
        {/* Conditionally render the newest and recent articles only on the first page */}
        {currentPage === 1 && (
          <>
            {/* Newest article */}
            <div className="newest-article-container">
              {currentArticles.slice(0, 1).map((article) => (
                <div key={article.id} className="news-article newest-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.img} alt="Article" className="newest-image" />
                  <div className="news-content newest-content">
                    <h2 className="news-headline newest-headline">{article.headline}</h2>
                    <div className="news-meta">
                    <div className="news-author"> 
                        <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.time}</span> 
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
                  <img src={article.img} alt="Article" className="news-image" />
                  <div className="news-content">
                    <h2 className="news-headline">{article.headline}</h2>
                    <div className="news-meta">
                      <div className="news-author"> 
                        <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.time}</span> 
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
            <img src={article.img} alt="Article" className="news-image" />
            <div className="news-content">
              <h2 className="news-headline">{article.headline}</h2>
              <div className="news-meta">
                <div className="news-author"> 
                  <span className="news-author-name">{article.author}</span> | <span className="news-time">{article.time}</span> 
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