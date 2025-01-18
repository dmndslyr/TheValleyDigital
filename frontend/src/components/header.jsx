import React, { useState } from 'react';
import './header.css';
import logo from '../assets/DIGITAL_light.png'; 
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useNavigate and useSearchParams

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/advanced-search?query=${searchQuery}`);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <header className='Header'>
      <a href="/"><img src={logo} alt="Logo" className='logo' /></a>
      <nav>
        <ul className={clicked ? 'navMenu active' : 'navMenu'}>
          <li><a href="/news">NEWS</a></li>
          <li><a href="/editorial">EDITORIAL</a></li>
          <li><a href="/feature">FEATURE</a></li>
          <li><a href="/sci-tech">SCI-TECH</a></li>
          <li><a href="/sports">SPORTS</a></li>
          <li><a href="/opinion">OPINION</a></li>
          <li><a href="/about-us">ABOUT US</a></li>
        </ul>
      </nav>
      <div className="search-box">
        <i className="fas fa-search search-icon"></i> {/* Font Awesome search icon */}
        <input 
          type="text" 
          placeholder='Search The Valley' 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          onKeyDown={handleSearch} 
        />
      </div>
      <div className='menu-icon' onClick={handleClick} style={{width: '50px', color: 'white'}}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </header>
  );
};

export default Header;


