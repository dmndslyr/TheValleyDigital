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
              <li><a href="/news">News</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/feature">Feature</a></li>
            </ul>
            <ul className="second-section-links">
                <li><a href="/sci-tech">Sci-Tech</a></li>
              <li><a href="/sports">Sports</a></li>
              <li><a href="/opinion">Opinion</a></li>
            </ul>
          </div>
          <h3><a href='/print-issue'>READ PRINT ISSUE ONLINE</a></h3>
        </div>

        <div className="footer-contact">
          <h4>CONTACT US</h4>
          <p><a href='https://www.facebook.com/TheValleyDAPSNHS'>Facebook</a></p>
          <a href="mailto:sample@email.com"><p>sample@email.com</p></a>
          <p>09123456789</p>
        </div>
    </footer>
  );
};

export default Footer;
