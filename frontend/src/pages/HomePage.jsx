import React, { useState, useEffect } from 'react';
import './HomePage.css';
import thevalley from '../assets/thevalley.png';
import placeholderImg from "../assets/placeholder.jpg"; // Sample image path
import axios from 'axios';

function HomePage() {

  const categoryMap = {
    1: 'NEWS',
    2: 'FEATURE',
    3: 'EDITORIAL',
    4: 'SCI-TECH',
    5: 'SPORTS',
    6: 'OPINION',
  
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homepageStory, setHomepageStory] = useState(null);

  const images = [thevalley, placeholderImg, placeholderImg];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [articlesResponse, homepageStoryResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/articles/'),
          axios.get('http://127.0.0.1:8000/homepage_story/')
        ]);
        setArticles(articlesResponse.data);
        setHomepageStory(homepageStoryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  // Filter and sort articles
  const sortedArticles = articles.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
  const topStory = homepageStory ? homepageStory.top_story : sortedArticles[0];
  const featuredArticles = homepageStory ? homepageStory.featured_articles : sortedArticles.filter(article => article.category === 2).slice(0, 4);  // Assuming category ID 2 is for features
  const editorials = homepageStory ? homepageStory.featured_editorial : sortedArticles.filter(article => article.category === 3).slice(0, 2);  // Assuming category ID 3 is for editorials
  const recentArticles = sortedArticles.slice(0, 6);

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
            {topStory && (
              <>
                <img className="top-story-image" src={topStory.image || placeholderImg} alt="Top Story" />
                <h2 className="top-story-headline">{topStory.headline}</h2>
                <p className="top-story-writer-date">
                  <span className="top-story-writer">{topStory.author}</span>
                  <span className="top-story-date">{topStory.publication_date}</span>
                </p>
              </>
            )}
          </div>
          <div className="featured-left">
            {featuredArticles.map((article, index) => (
              <div key={index} className="featured-article">
                <h1><span>|</span> FEATURE</h1>
                <img src={article.image || placeholderImg} alt={article.headline} className="featured-article-image" />
                <h3 className="featured-article-headline">{article.headline}</h3>
                <div className='feature-writer-date'>
                  <p className="featured-article-writer">{article.author}</p>
                  <p className="featured-article-date">{article.publication_date}</p>
                </div>
              </div>
            ))}
          </div>
          {editorials.map((editorial, index) => (
            <div className="editorial" key={index}>
              <div className="editorial-left">
                <img src={editorial.image || placeholderImg} alt={`Editorial ${index + 1}`} className="editorial-image bordered-image" />
                <div className='editorial-detail'>
                  <h2 className="editorial-feature"><span>|</span> EDITORIAL</h2>
                  <h3 className="editorial-headline">{editorial.headline}</h3>
                  <p className="editorial-article-writer">{editorial.author}</p>
                  <p className="editorial-date-time">{editorial.publication_date}</p>
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
              allowFullScreen={true}>
            </iframe>
          </div>
          <div className="recent-right">
            <span className="recent-label">RECENT</span>
            <div className="recent-articles">
              {recentArticles.map((article, index) => (
                <div key={index} className="recent-article">
                  <img src={article.image || placeholderImg} alt={article.headline} className="recent-article-image" />
                  <h2 className="category-label"><span>|</span> {categoryMap[article.category]}</h2>
                  <h4 className="recent-article-headline">{article.headline}</h4>
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
