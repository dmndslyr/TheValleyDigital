import React, { useState } from 'react';
import './HomePage.css';
import thevalley from '../assets/thevalley.png'
import placeholderImg from "../assets/test.jpg"; // Sample image path

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [thevalley, placeholderImg, placeholderImg];

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
      { img: placeholderImg, title: '‘MATATAG’ Curriculum Unveiled – A Game-Changer for Filipino Education', writer: 'By Tech Expert', date: '06/01/25', time: '12:00 PM' },
      { img: placeholderImg, title: '‘MATATAG’ Curriculum Unveiled – A Game-Changer for Filipino Education', writer: 'By Author Placeholder', date: '06/02/25', time: '1:00 PM' },
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
        <button className="arrow left" onClick={prevSlide}><i className="fa-solid fa-arrow-left"></i></button>
        <img className="slideshow-image" src={images[currentSlide]} alt="Slideshow" />
        <button className="arrow right" onClick={nextSlide}><i className="fa-solid fa-arrow-right"></i></button>
        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>

      <div className='homepage-bottom'>
        <div className='left-story'>
          <div className="top-story-left">
            <span className="top-story-label">TOP STORY</span>
            <img className="top-story-image" src={homepageData.topStory.img} alt="Top Story" />
            <h2 className="top-story-title">{homepageData.topStory.title}</h2>
            <p className="top-story-writer-date">
              <span className="top-story-writer">{homepageData.topStory.writer}</span>
              <span className="top-story-date">{homepageData.topStory.date} {homepageData.topStory.time}</span>
            </p>
          </div>
          <div className="featured-left">
            {homepageData.featuredArticles.map((article, index) => (
              <div key={index} className="featured-article">
                <h1><span>|</span> FEATURE</h1>
                <img src={article.img} alt={article.title} className="featured-article-image" />
                <h3 className="featured-article-title">{article.title}</h3>
                <div className='feature-writer-date'>
                  <p className="featured-article-writer">{article.writer}</p>
                  <p className="featured-article-date">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
          {homepageData.editorial.map((editorial, index) => (
            <div className="editorial" key={index}>
              <div className="editorial-left">
                <img src={editorial.img} alt={`Editorial ${index + 1}`} className="editorial-image bordered-image" />
                <div className='editorial-detail'>
                  <h2 className="editorial-feature"><span>|</span> EDITORIAL</h2>
                  <h3 className="editorial-title">{editorial.title}</h3>
                  <p className="editorial-date-time">{editorial.date} {editorial.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="right-story">
          <div className="facebook-embed">
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTheValleyDAPSNHS&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
              width="500" 
              height="500" 
              style={{border:'none', overflow:'hidden'}} 
              allowfullscreen={true}>
            </iframe>
          </div>
          <div className="recent-right">
            <span className="recent-label">RECENT</span>
            <div className="recent-articles">
              {homepageData.recentArticles.map((article, index) => (
                <div key={index} className="recent-article">
                  <img src={article.img} alt={article.title} className="recent-article-image" />
                  <p className="editorial-feature"><span>|</span> EDITORIAL</p>
                  <h4 className="recent-article-title">{article.title}</h4>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomePage;
