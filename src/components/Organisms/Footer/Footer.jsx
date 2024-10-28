import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import isoWhite from '../../../assets/brand/isoWhite.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-logo-container">
          <Link to="/home">
            <img src={isoWhite} alt="Logo de la marca" className="footer-logo" />
          </Link>
        </div>

        <div className="footer-newsletter">
          <h4>Suscríbete a nuestro Newsletter</h4>
          <form className="newsletter-form">
            <input type="email" placeholder="Tu correo" className="newsletter-input" />
            <button className="newsletter-button">Suscribirse</button>
          </form>
        </div>

        <div className="footer-social">
          <Link to="https://facebook.com/" aria-label="Facebook" className="social-icon">
            <FaFacebook />
          </Link>
          <Link to="https://instagram.com/" aria-label="Instagram" className="social-icon">
            <FaInstagram />
          </Link>
          <Link to="https://linkedin.com/" aria-label="LinkedIn" className="social-icon">
            <FaLinkedin />
          </Link>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Royal Ride. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
