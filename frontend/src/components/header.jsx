import React from 'react';
import './header.css';
import logo from '../assets/DIGITAL_light.png'; 

const Header = () => {
  return (
    <header className='Header'>
      <img src={logo} alt="Logo" className='logo' />
      <nav>
        <ul>
          <li><a href="/">NEWS</a></li>
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
        <input type="text" placeholder='Search The Valley' />
      </div>
    </header>
  );
};

export default Header;
