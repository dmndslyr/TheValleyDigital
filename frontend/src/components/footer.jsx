import React from 'react';
import './footer.css'; 
import footerLogo from '../assets/footerlogo.jpeg'

const Footer = () => {
  return (
    <footer className="footer">
      <img src={footerLogo} alt="The Valley Logo" className='footer-logo' />

      <div className="footer-sections">
          <h4>SECTIONS</h4>
          <div className="section-links">
            <ul className="first-section-links">
              <li><a href="#">News</a></li>
              <li><a href="#">Editorial</a></li>
              <li><a href="#">Feature</a></li>
            </ul>
            <ul className="second-section-links">
              <li><a href="#">Sci-Tech</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <h3>READ PRINT ISSUE ONLINE</h3>
        </div>

        <div className="footer-contact">
          <h4>CONTACT US</h4>
          <p>Facebook</p>
          <p>sample@email.com</p>
          <p>09123456789</p>
        </div>
    </footer>
  );
};

export default Footer;
