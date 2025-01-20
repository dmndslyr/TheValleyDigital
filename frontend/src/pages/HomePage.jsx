import React, { useState, useEffect } from 'react';
import './HomePage.css';
import thevalley1 from '../assets/thevalley1.png';
import thevalley1a from '../assets/thevalley1a.jpg';
import thevalley2 from '../assets/thevalley2.png';
import placeholderImg from "../assets/placeholder.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  
  const categoryMap = {
    1: 'NEWS',
    2: 'EDITORIAL',
    3: 'FEATURE',
    4: 'SCI-TECH',
    5: 'SPORTS',
    6: 'OPINION',
  };
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [articles, setArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const images = [thevalley1, thevalley1a, thevalley2];
  
  const navigate = useNavigate();
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Separate click event handlers
  const handleArticleClick = (id) => { 
    navigate(`/article/${id}`); 
  };

  const handleFeatureClick = (id) => { 
    navigate(`/article/${id}`); 
  };

  const handleEditorialClick = (id) => { 
    navigate(`/article/${id}`); 
  };

  const handleTopStoryClick = (id) => {
    navigate(`/article/${id}`);
  }
  
  useEffect(() => {
    const fetchHomepageStories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/homepage-stories/');
        setArticles(response.data.homepage_stories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching homepage stories:', error);
        setLoading(false);
      }
    };
    
    const fetchRecentArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        setRecentArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
        setLoading(false);
      }
    };
    
    fetchHomepageStories();
    fetchRecentArticles();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Move to next slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);
  
  if (loading) {
    return <div>Loading articles...</div>;
  }
  
  // Filter and sort articles
  const sortedArticles = articles.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const topStory = sortedArticles[0]?.top_story;
  const featuredEditorial = sortedArticles[0]?.featured_editorial;
  const featuredFeature = sortedArticles[0]?.featured_feature;
  const featuredArticles = sortedArticles[0]?.featured_articles?.slice(0, 4) || [];
  const sortedRecentArticles = recentArticles.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date)).slice(0, 5);

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
          <div className="top-story-left" onClick={() => handleTopStoryClick(topStory?.id)}>
            <span className="top-story-label">TOP STORY</span>
            {topStory && (
              <>
                <img className="top-story-image" src={topStory.image_url || placeholderImg} alt="Top Story" />
                <h2 className="top-story-headline">{topStory?.headline}</h2>
              </>
            )}
          </div>
          <div className="featured-left">
            {featuredArticles.map((headline, index) => (
              <div key={index} className="featured-article" onClick={() => handleFeatureClick(headline.id)}>
                <h1><span>|</span> FEATURED ARTICLE</h1>
                <img src={headline.image_url || placeholderImg} alt={headline} className="featured-article-image" />
                <h3 className="featured-article-headline">{headline.headline}</h3>
              </div>
            ))}
          </div>
          {featuredEditorial && (
            <div className="editorial" onClick={() => handleEditorialClick(featuredEditorial?.id)}>
              <div className="editorial-left">
                <img src={featuredEditorial.image_url || placeholderImg} alt="Editorial" className="editorial-image bordered-image" />
                <div className='editorial-detail'>
                  <h2 className="editorial-feature"><span>|</span> EDITORIAL</h2>
                  <h3 className="editorial-headline">{featuredEditorial?.headline}</h3>
                </div>
              </div>
            </div>
          )}
          {featuredFeature && (
            <div className="editorial" onClick={() => handleFeatureClick(featuredFeature?.id)}>
              <div className="editorial-left">
                <img src={featuredFeature.image_url || placeholderImg} alt="Feature" className="editorial-image bordered-image" />
                <div className='editorial-detail'>
                  <h2 className="editorial-feature"><span>|</span> FEATURE</h2>
                  <h3 className="editorial-headline">{featuredFeature?.headline}</h3>
                </div>
              </div>
            </div>
          )}
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
              {sortedRecentArticles.map((article, index) => (
                <div key={index} className="recent-article" onClick={() => handleArticleClick(article.id)}>
                  <img src={article.image_url || placeholderImg} alt={article.headline} className="recent-article-image" />
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