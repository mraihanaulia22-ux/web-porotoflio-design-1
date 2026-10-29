import React from 'react';
import bgMat from '../assets/portfolio/image 96 (1).webp';
import kertasImg from '../assets/portfolio/Kertas.webp';
import ellipse60Img from '../assets/portfolio/Ellipse 60.webp';
import ellipse61Img from '../assets/portfolio/Ellipse 61.webp';
import contactArrowsSvg from '../assets/portfolio/contact-arrows.svg';

const ContactSection = ({ onNavigate, isInView = true }) => {
  const navItems = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];

  // Data kontak yang bisa dikonfigurasi / diklik
  const instagramHandle = '@INSTAGRAM';
  const instagramUrl = 'https://instagram.com';
  const waNumber = '08XXXXXXXXXXXX';
  const waLink = 'https://wa.me/';

  return (
    <section
      id="contact-section"
      className={`contact-section ${isInView ? 'contact-in-view' : ''}`}
      style={{ backgroundImage: `url("${bgMat}")` }}
    >
      {/* Golden ring in bottom right corner (persis seperti di mockup) */}
      <img
        src={ellipse61Img}
        alt=""
        className="ring-accent contact-ring-bottom-right"
        aria-hidden="true"
        draggable={false}
        loading="lazy"
      />

      {/* Top Header Navbar persis mockup */}
      <header className="contact-navbar-wrapper">
        <nav className="contact-navbar-container">
          {/* White square icon logo di kiri navbar */}
          <div className="contact-navbar-logo-box" aria-hidden="true" />

          {/* Navigation Menu Buttons */}
          <div className="contact-nav-menu">
            {navItems.map((item, idx) => {
              const isActive = item === 'CONTACT';
              return (
                <button
                  key={item}
                  type="button"
                  className={`contact-nav-item ${isActive ? 'contact-nav-item-active' : ''}`}
                  onClick={() => onNavigate(idx)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content Stage */}
      <div className="contact-stage-content">
        
        {/* Golden Ring Center (berada di belakang loop panah doodle) */}
        <div className="contact-center-ring-wrapper">
          <img
            src={ellipse60Img}
            alt=""
            className="contact-ring-center"
            aria-hidden="true"
            draggable={false}
          />
        </div>

        {/* Sticker Title KIRI (CONTACT ME) */}
        <div className="contact-sticker-title contact-title-left">
          <span className="title-word-1">CONTACT</span>
          <span className="title-word-2">ME</span>
        </div>

        {/* Doodle Curly Arrows White SVG */}
        <div className="contact-arrows-container" aria-hidden="true">
          <img
            src={contactArrowsSvg}
            alt=""
            className="contact-arrows-img"
            draggable={false}
          />
        </div>

        {/* Sticker Title KANAN (CONTACT ME) */}
        <div className="contact-sticker-title contact-title-right">
          <span className="title-word-1">CONTACT</span>
          <span className="title-word-2">ME</span>
        </div>

        {/* Torn Paper Contact Cards Container */}
        <div className="contact-papers-container">
          
          {/* Card 1: Instagram Paper */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="torn-paper-card paper-instagram"
            title="Kunjungi Instagram"
          >
            <img
              src={kertasImg}
              alt="Sobekan Kertas Instagram"
              className="torn-paper-bg"
              draggable={false}
            />
            <div className="torn-paper-content">
              <span className="instagram-handle-text">{instagramHandle}</span>
            </div>
          </a>

          {/* Card 2: WhatsApp Paper */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="torn-paper-card paper-whatsapp"
            title="Hubungi via WhatsApp"
          >
            <img
              src={kertasImg}
              alt="Sobekan Kertas WhatsApp"
              className="torn-paper-bg"
              draggable={false}
            />
            <div className="torn-paper-content wa-content-row">
              {/* WhatsApp Green Icon Badge */}
              <div className="wa-icon-badge">
                <svg
                  className="wa-icon-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z"
                    fill="#25D366"
                  />
                  <path
                    d="M17.47 14.39C17.17 14.24 15.72 13.53 15.45 13.43C15.18 13.33 14.99 13.28 14.79 13.58C14.59 13.88 14.02 14.55 13.85 14.75C13.68 14.95 13.5 14.97 13.2 14.82C12.9 14.67 11.95 14.36 10.82 13.35C9.94 12.56 9.35 11.59 9.18 11.29C9.01 10.99 9.16 10.83 9.31 10.68C9.45 10.55 9.61 10.33 9.76 10.16C9.91 9.99 9.96 9.86 10.06 9.66C10.16 9.46 10.11 9.29 10.03 9.14C9.96 8.99 9.38 7.56 9.14 6.98C8.91 6.42 8.67 6.49 8.5 6.49H7.95C7.75 6.49 7.43 6.56 7.16 6.86C6.89 7.16 6.13 7.87 6.13 9.33C6.13 10.79 7.19 12.2 7.34 12.4C7.49 12.6 9.43 15.6 12.41 16.89C13.12 17.2 13.67 17.38 14.1 17.52C14.81 17.75 15.46 17.71 15.98 17.64C16.55 17.55 17.74 16.92 17.99 16.22C18.24 15.52 18.24 14.92 18.16 14.79C18.08 14.67 17.77 14.54 17.47 14.39Z"
                    fill="white"
                  />
                </svg>
              </div>
              {/* WhatsApp Phone Number */}
              <span className="wa-number-text">{waNumber}</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
