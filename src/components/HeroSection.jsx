import React from 'react';
import bgMat from '../assets/portfolio/image 96 (1).webp';
import cardImg from '../assets/portfolio/Card.webp';
import berkasImg from '../assets/portfolio/Berkas.webp';
import portoFolioImg from '../assets/portfolio/PORTO FOLIO.webp';
import ellipse61Img from '../assets/portfolio/Ellipse 61.webp';
import ellipse60Img from '../assets/portfolio/Ellipse 60.webp';

export default function HeroSection({ onScrollToMore }) {
  return (
    <section
      id="hero-section"
      className="hero-section"
      style={{ backgroundImage: `url("${bgMat}")` }}
    >
      {/* Golden ring in bottom right corner */}
      <img
        src={ellipse60Img}
        alt="Rubber band ring corner"
        className="ring-accent ring-bottom-right"
        loading="eager"
        decoding="async"
        draggable={false}
      />

      {/* Subtle yellow sunlight glow at top-left edge near navbar */}
      <div className="sun-glow" aria-hidden="true" />

      {/* Main Stage Content */}
      <main className="stage-container">
        <div className="stage-content">
          {/* Golden ring locked directly behind the ID Card & Berkas overlap */}
          <img
            src={ellipse61Img}
            alt="Rubber band ring accent"
            className="ring-accent ring-center"
            loading="eager"
            decoding="async"
            draggable={false}
          />

          {/* Left ID Card with lanyard cord */}
          <div className="card-wrapper">
            <img
              src={cardImg}
              alt="ID Card Graphic Designer Muhammad Raihan Aulia Rachman"
              className="id-card-img"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />

            {/* Overlapping "PORTO FOLIO" sticker graphic */}
            <div className="sticker-wrapper">
              <img
                src={portoFolioImg}
                alt="Porto Folio Sticker"
                className="portofolio-sticker"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Dossier / Berkas */}
          <div className="berkas-wrapper">
            <img
              src={berkasImg}
              alt="Berkas Dossier Graphic Design Sedikit Tentang Saya"
              className="berkas-img"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
          </div>
        </div>
      </main>

      {/* Bottom Action Pill Button */}
      <footer className="hero-footer">
        <button
          type="button"
          className="bottom-pill-btn"
          onClick={onScrollToMore}
        >
          Lihat Lebih Banyak Dibawah
        </button>
      </footer>

      {/* Aesthetic Foreground Diagonal Shadows */}
      <div className="diagonal-shadow shadow-over-card" aria-hidden="true" />
      <div className="diagonal-shadow shadow-over-doc" aria-hidden="true" />
    </section>
  );
}

