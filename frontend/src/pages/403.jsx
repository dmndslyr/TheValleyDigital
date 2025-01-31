import React from 'react';
import './403.css';
import { useNavigate } from 'react-router-dom';

const PageForbidden = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/")
    };

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
      <i className="fa-solid fa-face-frown forbidden-icon"></i>
        <h1>403 - Forbidden</h1>
        <p>You are not allowed to view this article.</p>
        <p>If you believe this is a mistake, please contact the administrator.</p>
        <button onClick={handleSubmit}>Go Back</button>
      </div>
    </div>
  );
};

export default PageForbidden;
