import React, { useEffect, useState } from 'react';
import './ArticlePage.css';
import placeholderImg from '../assets/placeholder.jpg'; 


function ArticlePage() {
   // Placeholder data for now
   const placeholderData = {
    img: placeholderImg,
    caption: 'This is a placeholder for the caption content. It will be dynamically loaded from the backend.',
    headline: 'This is a placeholder headline',
    headlineArticle: 'This is a placeholder for the headline article.',
    content: 'This is a placeholder for the article content. It will be dynamically loaded from the backend.',
    author: 'Jose Rizal',
    date: 'October 18, 2024',
    time: '2:30 PM',
    topicText: 'NEWS'
  };

  const [imagePresent, setImagePresent] = useState(false)

  useEffect(() => {
    const checkImage = async (e) => {
      if (placeholderData.img){
        setImagePresent(true);
      }
      else{
        setImagePresent(false)
      }
    };
    checkImage();
  }, []);

  return (
    <div className="article-page">
      <div className="topicText">{placeholderData.topicText}</div>
      <div className="image-container">
        <img src={placeholderData.img} alt="Article placeholder" className="article-image" />
      </div>

      {imagePresent ? (
        <p className='image-caption'>{placeholderData.caption}</p>
      ) : (
        null
      )}
      <h1 className="article-headline">{placeholderData.headline}</h1>
      
      <div className="article-meta">
        <span className="article-author"><span className="author-name">{placeholderData.author}</span></span>
         <span className="article-date">{placeholderData.date}</span>
         <span className="article-time">{placeholderData.time}</span>
      </div>

      <div className="article-body">
         <h4 className="headline-content">{placeholderData.headlineArticle}</h4>
         <p className="article-content">{placeholderData.content}</p>
     </div>
    </div>
  );
    

  
}

export default ArticlePage;