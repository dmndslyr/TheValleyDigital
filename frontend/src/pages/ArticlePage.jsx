import React, { useEffect, useState } from 'react';
import './ArticlePage.css';
import placeholderImg from '../assets/placeholder.jpg';
import axios from 'axios';

const categoryMap = {
  1: 'NEWS',
  2: 'Feature',
  3: 'Editorial',
  4: 'Opinion',
  5: 'Science and Technology',
  6: 'Sports',
};

function FacebookComments({ url }) {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
      script.async = true;
      script.defer = true;
      script.onload = () => window.FB.XFBML.parse();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="fb-comments"
      data-href={url}
      data-width="100%"
      data-numposts="5"
    ></div>
  );
}

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/');
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article data:', error);
        setLoading(false);
      }
    };

    fetchArticleData();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div className="article-page">
      {articles.length === 0 ? (
        <div>No articles found.</div>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="article">
            <div className="topicText">{categoryMap[article.category] || 'Unknown Category'}</div>
            <div className="image-container">
              <img src={article.image_url ? article.image_url : placeholderImg} alt={article.headline || 'Article placeholder'} className="article-image" />
            </div>
            {article.image_url && article.caption && (
              <p className='image-caption'>{article.caption}</p>
            )}
            <h1 className="article-headline">{article.headline}</h1>
            <div className="article-meta">
              <span className="article-author"><span className="author-name">{article.author}</span></span>
              <span className="article-date"> 
                {article.publication_date ? new Date(article.publication_date).toLocaleDateString() : 'Loading date...'}
              </span>
            </div>
            <div className="article-body">
              <h4 className="headline-content">{article.headlineArticle}</h4>
              <p className="article-content">{article.content}</p>
            </div>
            <div className="comments-section">
              <h3>Comments</h3>
              <FacebookComments url={window.location.href} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ArticlePage;
