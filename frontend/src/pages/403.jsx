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
        <p>This Article doesn't exist.</p>
        <button onClick={handleSubmit}>Go Back</button>
      </div>
    </div>
  );
};

export default PageForbidden;
