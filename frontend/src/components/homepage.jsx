import React, { useState } from 'react';
import './HomePage.css';
import placeholderImg from "../assets/placeholder.jpg"; // Sample image path
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Arrow icons

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [placeholderImg, placeholderImg, placeholderImg];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const homepageData = {
    topStory: {
      img: placeholderImg,
      title: 'Classes suspended on April 8 due to extreme heat',
      writer: 'John Doe',
      date: '04/07/2024',
      time: '10:00 AM',
    },
    featuredArticles: [
      { img: placeholderImg, title: 'Feature Article 1', writer: 'By Jane Doe', date: 'January 1, 2025' },
      { img: placeholderImg, title: 'Feature Article 2', writer: 'By Alex Smith', date: 'January 2, 2025' },
      { img: placeholderImg, title: 'Feature Article 3', writer: 'By Sam Smith', date: 'January 3, 2025' },
      { img: placeholderImg, title: 'Feature Article 4', writer: 'By Steve Doe', date: 'January 4, 2025' },
    ],
    editorial: [
      { img: placeholderImg, title: 'MATATAG Curriculum Unveiled', writer: 'By Tech Expert', date: '06/01/25', time: '12:00 PM' },
      { img: placeholderImg, title: 'MATATAG Curriculum Unveiled', writer: 'By Author Placeholder', date: '06/02/25', time: '1:00 PM' },
    ],
    recentArticles: [
      { img: placeholderImg, title: 'Classes suspended on April 8 due to extreme heat' },
      { img: placeholderImg, title: 'Futsaleras Grab First Place in District Meet' },
      { img: placeholderImg, title: 'Mayor Danny Uy Leads the School Supplies Distribution' },
      { img: placeholderImg, title: 'Anti-Illegal Drug Symposium, Isinagawa!' },
      { img: placeholderImg, title: 'How do Drugs Impede Academic Progress?' },
    ],
  };

  return (
    <div className="home-page">
      {/* Slideshow */}
      <div className="slideshow">
        <button className="arrow left" onClick={prevSlide}><FaArrowLeft /></button>
        <img className="slideshow-image" src={images[currentSlide]} alt="Slideshow" />
        <button className="arrow right" onClick={nextSlide}><FaArrowRight /></button>
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Top Story */}
      <div className="top-story">
        <div className="top-story-left">
          <span className="top-story-label">Top Story</span>
          <img className="top-story-image" src={homepageData.topStory.img} alt="Top Story" />
          <h2 className="top-story-title">{homepageData.topStory.title}</h2>
          <p className="top-story-writer-date">
            <span className="top-story-writer">{homepageData.topStory.writer}</span>
            <span className="top-story-date">{homepageData.topStory.date} {homepageData.topStory.time}</span>
          </p>
        </div>
        <div className="facebook-embed">
          <iframe
            title="The Valley Facebook"
            width="300"
            height="400"
            src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/TheValleyDAPSNHS&tabs=timeline&width=300&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="featured-articles">
        <div className="featured-left">
          {homepageData.featuredArticles.map((article, index) => (
            <div key={index} className="featured-article">
              <img src={article.img} alt={article.title} className="featured-article-image" />
              <h3 className="featured-article-title">{article.title}</h3>
            </div>
          ))}
        </div>
        <div className="recent-right">
          <span className="recent-label">Recent</span>
          <div className="recent-articles">
            {homepageData.recentArticles.map((article, index) => (
              <div key={index} className="recent-article">
                <img src={article.img} alt={article.title} className="recent-article-image" />
                <p className="editorial-feature">| EDITORIAL</p>
                <h4 className="recent-article-title">{article.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Section */}
      {homepageData.editorial.map((editorial, index) => (
        <div className="editorial" key={index}>
          <div className="editorial-left">
            <img src={editorial.img} alt={`Editorial ${index + 1}`} className="editorial-image bordered-image" />
            <h2 className="editorial-feature">| EDITORIAL</h2>
            <h3 className="editorial-title">{editorial.title}</h3>
            <p className="editorial-date-time">{editorial.date} {editorial.time}</p>
          </div>
          <div className="editorial-right">
            {/* Empty */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
