import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer-modern">
        <div className="container footer-container">
          <div className="footer-grid">

            {/* Logo & Tagline */}
            <div className="footer-section">
              <h2 className="footer-logo">Arham<span>Cake</span></h2>
              <p className="footer-text">Baking happiness into every slice — fresh, beautiful, and custom-made for every celebration.</p>
            </div>

            {/* Navigation */}
            <div className="footer-section">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/" className="special-link">Home</Link></li>
                <li><Link to="/cakes">Cakes</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/order" className="special-link">Order Now</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: hello@arhamcake.com</p>
              <p>Phone: +91 9325213064</p>
              <div className="footer-socials">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} Arham Cake. All rights reserved.
          </div>
        </div>
      </footer>

      <style>{`
        .footer-modern {
          background: linear-gradient(135deg, #fff1f2, #ffece1);
          color: #5a4c4c;
          padding: 60px 0 30px;
          font-family: 'Poppins', sans-serif;
          border-top-left-radius: 60px;
          border-top-right-radius: 60px;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.05);
        }

        .footer-container {
          max-width: 1300px;
          margin: auto;
          padding: 0 20px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }

        .footer-section h4 {
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 600;
          color: #a27867;
          letter-spacing: 0.5px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          text-decoration: none;
          color: #6e5b5b;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: #d17c6f;
          padding-left: 5px;
        }

        .footer-logo {
          font-size: 30px;
          font-weight: bold;
          color: #a55b4e;
          letter-spacing: 1px;
        }

        .footer-logo span {
          color: #e0807c;
        }

        .footer-text {
          margin-top: 12px;
          font-size: 14px;
          line-height: 1.6;
          color: #7a6c6c;
        }

        .footer-socials a {
          display: inline-block;
          background-color: #fff3f3;
          color: #a55b4e;
          margin: 8px 8px 0 0;
          padding: 10px;
          border-radius: 50%;
          font-size: 16px;
          transition: all 0.3s ease;
          border: 1px solid #e9d2d2;
        }

        .footer-socials a:hover {
          background-color: #e0807c;
          color: white;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
          color: #7e6a6a;
        }

        /* Special styling for Home and Order links */
        .special-link {
          font-weight: 600;
          color: #a55b4e !important;
          position: relative;
          font-size: 16px;
        }

        .special-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, #ff9e80, #e0807c);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .special-link:hover::after {
          transform: scaleX(1);
        }

        .special-link:hover {
          color: #e0807c !important;
        }

        @media (max-width: 600px) {
          .footer-logo {
            font-size: 26px;
          }
          .footer-section h4 {
            font-size: 16px;
          }
          .footer-text {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
