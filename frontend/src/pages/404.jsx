import React from 'react';
import './404.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/")
    };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
      <i className="fa-solid fa-face-frown notfound-icon"></i>
        <h1>404 - Page Not Found</h1>
        <p>Looks like you've wandered into the void! The page you are looking for doesn't exist.</p>
        <p>If you believe this is an error. Please contact the administrator.</p>
        <button onClick={handleSubmit}>Go Back</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
