import React, { useState } from 'react';
import './SearchInterface.css';
import placeholderImg from '../assets/placeholder.jpg';

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const articleData = {
    currentArticles: [
      { id: 1, img: placeholderImg, headline: 'Classes suspended on April 8 due to extreme heat', author: 'Juan Dela Cruz', date: '04/07/2024', time: '09:45 AM', section: 'news' },
      { id: 2, img: placeholderImg, headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', author: 'Juan Dela Cruz', date: '01/17/1970', time: '08:00 AM', section: 'opinion' },
      { id: 3, img: placeholderImg, headline: 'New educational reforms are on the way', author: 'Maria Santos', date: '05/10/2024', time: '10:30 AM', section: 'editorial' },
      { id: 4, img: placeholderImg, headline: 'Local farmers adopt new techniques', author: 'Carlos Reyes', date: '06/15/2024', time: '11:00 AM', section: 'feature' },
      { id: 5, img: placeholderImg, headline: 'City park renovation plans revealed', author: 'Ana Lopez', date: '07/01/2024', time: '09:00 AM', section: 'news' },
      { id: 6, img: placeholderImg, headline: 'Technology trends in 2024', author: 'John Doe', date: '08/11/2024', time: '08:45 AM', section: 'science' },
      { id: 7, img: placeholderImg, headline: 'Art exhibition opens downtown', author: 'Jane Smith', date: '09/05/2024', time: '09:15 AM', section: 'feature' },
      { id: 8, img: placeholderImg, headline: 'New transportation routes announced', author: 'Peter Parker', date: '10/20/2024', time: '07:50 AM', section: 'news' },
      { id: 9, img: placeholderImg, headline: 'Community service opportunities', author: 'Clark Kent', date: '11/02/2024', time: '09:00 AM', section: 'editorial' },
      { id: 10, img: placeholderImg, headline: 'Local sports teams prepare for championship', author: 'Diana Prince', date: '12/25/2024', time: '10:10 AM', section: 'sports' },
      { id: 11, img: placeholderImg, headline: 'New Art Exhibition', author: 'Clark Kent', date: '01/02/2025', time: '09:00 AM', section: 'feature' },
      { id: 12, img: placeholderImg, headline: 'Tech Innovations', author: 'Lois Lane', date: '03/10/2025', time: '11:15 AM', section: 'science' },
      { id: 13, img: placeholderImg, headline: 'Classes suspended on April 8 due to extreme heat', author: 'Juan Dela Cruz', date: '04/07/2024', time: '09:45 AM', section: 'news' },
      { id: 14, img: placeholderImg, headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', author: 'Juan Dela Cruz', date: '01/17/1970', time: '08:00 AM', section: 'opinion' },
      { id: 15, img: placeholderImg, headline: 'New educational reforms are on the way', author: 'Maria Santos', date: '05/10/2024', time: '10:30 AM', section: 'editorial' },
      { id: 16, img: placeholderImg, headline: 'Local farmers adopt new techniques', author: 'Carlos Reyes', date: '06/15/2024', time: '11:00 AM', section: 'feature' },
      { id: 17, img: placeholderImg, headline: 'City park renovation plans revealed', author: 'Ana Lopez', date: '07/01/2024', time: '09:00 AM', section: 'news' },
      { id: 18, img: placeholderImg, headline: 'Technology trends in 2024', author: 'John Doe', date: '08/11/2024', time: '08:45 AM', section: 'science' },
      { id: 19, img: placeholderImg, headline: 'Art exhibition opens downtown', author: 'Jane Smith', date: '09/05/2024', time: '09:15 AM', section: 'feature' },
      { id: 20, img: placeholderImg, headline: 'New transportation routes announced', author: 'Peter Parker', date: '10/20/2024', time: '07:50 AM', section: 'news' },
      { id: 21, img: placeholderImg, headline: 'Community service opportunities', author: 'Clark Kent', date: '11/02/2024', time: '09:00 AM', section: 'editorial' },
    ],
  };

  const sortedArticles = articleData.currentArticles.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
  const articlesPerPage = 10;
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleArticleClick = (id) => {
    // Implement navigation functionality here if needed
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

  const filteredArticles = currentArticles.filter((article) =>
    article.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-article-page">
      <div className="search-container">
        <div className="search-bar">
          <div className="search-input-container">
            <i className="fas fa-search search-icons"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search article..."
              className="search-input"
            />
          </div>
        </div>
        <div className="sort-options">
          <div className='filter-icon'>
            <i className="fas fa-filter sort-rectangle icon"></i>
          </div>
          <div className="sort-rectangle category">All</div>
          <div className="sort-rectangle date">&lt;10d</div>
        </div>
      </div>

      <div className="all-article-articles">
        {filteredArticles.slice(0, 1).map((article) => (
          <div key={article.id} className="all-article all-article-newest" onClick={() => handleArticleClick(article.id)}>
            <div className="all-article-section">{article.section}</div>
            <img src={article.img} alt="Article" className="all-article-newest-image" />
            <div className="all-article-content all-article-newest-content">
              <h2 className="all-article-headline all-article-newest-headline">{article.headline}</h2>
              <div className="all-article-metadata all-article-newest-metadata">
                <div className="all-article-author">
                  <span className="all-article-author-name">{article.author}</span> | <span className="all-article-time">{article.time}</span>
                </div>
                <div className="all-article-date">{article.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="all-article-articles">
        {filteredArticles.map((article) => (
          <div key={article.id} className="all-article" onClick={() => handleArticleClick(article.id)}>
            <img src={article.img} alt="Article" className="all-article-image" />
            <div className="all-article-content">
             <div className="all-article-section">{article.section}</div>
              <h2 className="all-article-headline">{article.headline}</h2>
              <div className="all-article-metadata">
                <div className="all-article-author">
                  <span className="all-article-author-name">{article.author}</span> | <span className="all-article-time">{article.time}</span>
                </div>
                <div className="all-article-date">{article.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
<div className="all-article-pagination">
  <button className="all-article-arrow prev" onClick={prevPage} disabled={currentPage === 1}>
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
  <button className="all-article-arrow next" onClick={nextPage} disabled={currentPage === totalPages}>
    &gt;
  </button>
</div>

    </div>
  );
};

export default SearchInterface;
