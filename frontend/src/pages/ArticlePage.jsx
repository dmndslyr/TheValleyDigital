import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ArticlePage.css';
import placeholderImg from '../assets/placeholder.jpg';


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
  const { identifier } = useParams(); // Use `identifier` to match the URL pattern
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://54.153.133.144:8000/article/${identifier}/`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [identifier]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    navigate('/403');
  }

  const {
    image_url = '',
    caption,
    headline,
    content,
    author,
    publication_date: date,
    is_published,
    category,
    tags =[],
    slug
  } = article;

  const img = image_url ? image_url : placeholderImg;

  return (
    <div className="article-page">
      <div className="topicText">{category}</div>
      <div className="image-container">
        <img src={img} alt="Article" className="article-image" />
      </div>

      {img !== placeholderImg && (
        <p className='image-caption'>{caption}</p>
      )}

      <h1 className="article-headline">{headline}</h1>

      <div className="article-meta">
        <span className="article-author"><span className="author-name">{author}</span></span>
        <span className="article-date">{date}</span>
        {is_published && <span className="article-status">Published</span>}
      </div>
      
      <div className='article-tags'>
        <h1>Tags:</h1>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <a key={index} href={`/advanced-search?query=${tag}`} className="tag">{tag}, </a>
          ))}
        </div>
      </div>

      <div className="article-body">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="article-content">{paragraph}</p>
        ))}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <FacebookComments url={`http://54.153.133.144:8000/article/${slug}/`} />
      </div>
    </div>
  );
}

export default ArticlePage;
