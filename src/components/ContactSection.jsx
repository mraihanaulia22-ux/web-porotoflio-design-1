import React from 'react';
import bgMat from '../assets/portfolio/image 96 (1).webp';
import kertasImg from '../assets/portfolio/Kertas.webp';
import ellipse60Img from '../assets/portfolio/Ellipse 60.webp';
import ellipse61Img from '../assets/portfolio/Ellipse 61.webp';
import curlyArrowImg from '../assets/portfolio/panah_curly.webp';
import instagramLogo from '../assets/portfolio/instagram_logo.webp';
import whatsappLogo from '../assets/portfolio/whatsapp_logo.webp';

const ContactSection = ({ onNavigate, isInView = true }) => {
  const navItems = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];

  // Data kontak yang bisa diklik / dikonfigurasi
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
      {/* Golden ring in bottom right corner */}
      <img
        src={ellipse61Img}
        alt=""
        className="ring-accent contact-ring-bottom-right"
        aria-hidden="true"
        draggable={false}
        loading="lazy"
      />

      {/* Main Content Stage (Navbar global dikelola terpusat dari App.jsx) */}
      <div className="contact-stage-content">

        {/* Golden Ring Center (di belakang loop panah) */}
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

        {/* Panah Melengkung Asli User (Kiri) */}
        <div className="curly-arrow-wrapper arrow-left-wrapper" aria-hidden="true">
          <img
            src={curlyArrowImg}
            alt=""
            className="curly-arrow-img arrow-img-left"
            draggable={false}
          />
        </div>

        {/* Panah Melengkung Asli User (Kanan - Mirrored) */}
        <div className="curly-arrow-wrapper arrow-right-wrapper" aria-hidden="true">
          <img
            src={curlyArrowImg}
            alt=""
            className="curly-arrow-img arrow-img-right"
            draggable={false}
          />
        </div>

        {/* Sticker Title KANAN (CONTACT ME) */}
        <div className="contact-sticker-title contact-title-right">
          <span className="title-word-1">CONTACT</span>
          <span className="title-word-2">ME</span>
        </div>

        {/* Torn Paper Contact Cards Container (Ukuran Besar Proporsional seperti Section 1) */}
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
            <div className="torn-paper-content social-content-row">
              <img
                src={instagramLogo}
                alt="Instagram"
                className="social-brand-icon icon-instagram"
                draggable={false}
              />
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
            <div className="torn-paper-content social-content-row">
              <img
                src={whatsappLogo}
                alt="WhatsApp"
                className="social-brand-icon icon-whatsapp"
                draggable={false}
              />
              <span className="wa-number-text">{waNumber}</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
