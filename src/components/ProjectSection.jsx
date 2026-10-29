import React, { useState, useRef, useEffect } from 'react';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '../data/projects';

export default function ProjectSection({ onOpenFullCatalog, isInView, projects, onSelectProject }) {
  // Default to UMKM BRAND or ALL
  const [selectedCategory, setSelectedCategory] = useState('UMKM BRAND');
  const [currentIndex, setCurrentIndex] = useState(0);

  const allProjects = projects || PROJECTS_DATA;

  // Filtered projects
  const filteredProjects = selectedCategory === 'ALL'
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const total = filteredProjects.length;

  const handleNext = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch & Drag Handling for Steering Wheel Feeling
  const dragStartX = useRef(null);
  const dragDist = useRef(0);

  const onTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    dragDist.current = 0;
  };

  const onTouchMove = (e) => {
    if (dragStartX.current === null) return;
    dragDist.current = e.touches[0].clientX - dragStartX.current;
  };

  const onTouchEnd = () => {
    if (dragDist.current > 45) {
      handlePrev();
    } else if (dragDist.current < -45) {
      handleNext();
    }
    dragStartX.current = null;
    dragDist.current = 0;
  };

  const onMouseDown = (e) => {
    dragStartX.current = e.clientX;
    dragDist.current = 0;
  };

  const onMouseMove = (e) => {
    if (dragStartX.current === null) return;
    dragDist.current = e.clientX - dragStartX.current;
  };

  const onMouseUp = () => {
    if (dragDist.current > 45) {
      handlePrev();
    } else if (dragDist.current < -45) {
      handleNext();
    }
    dragStartX.current = null;
    dragDist.current = 0;
  };

  // Keyboard navigation when user hovers or interacts
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      id="project-section"
      className={`project-section ${isInView ? 'section-in-view' : ''}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Section Portofolio Proyek"
    >
      <div className="project-container">
        {/* Top Header: Title Sticker + Button "Lihat Lebih Lanjut" */}
        <div className="project-top-header">
          <div className="project-title-center">
            <h2 className="project-title-sticker">PROJECT</h2>
          </div>
          <button
            type="button"
            className="see-more-pill-btn"
            onClick={onOpenFullCatalog}
            title="Buka katalog galeri semua karya proyek"
          >
            Lihat Lebih Lanjut
          </button>
        </div>

        {/* Filter Navigation Bar */}
        <div className="project-filter-wrapper">
          <div className="filter-badge-tab">FILTER</div>
          <div className="filter-menu-bar">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  className={`filter-item-btn ${isActive ? 'filter-item-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Wheel / Steering Arc Showcase Carousel */}
        <div
          className="wheel-showcase-stage"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Left Arrow Button (Clean White Minimalist Arrow) */}
          <button
            type="button"
            className="wheel-nav-arrow arrow-left"
            onClick={handlePrev}
            aria-label="Proyek sebelumnya"
            title="Sebelumnya"
          >
            <svg viewBox="0 0 54 24" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="50" y1="12" x2="6" y2="12" />
              <polyline points="18 4 6 12 18 20" />
            </svg>
          </button>

          {/* Cards Track (Wheel / Arc Calculation with Fade-Up on Category Change) */}
          <div key={selectedCategory} className="wheel-cards-track category-fade-up">
            {filteredProjects.map((project, idx) => {
              // Calculate offset relative to currentIndex
              let offset = idx - currentIndex;
              
              // Handle wrap-around distance for shortest loop if multiple
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              // Arc Wheel Math - Prominent Hero Proportion (Spacious & Bold)
              const rotateDeg = offset * 8; // Steering rotation
              const translateY = Math.pow(Math.abs(offset), 1.25) * 16; // Gentle curve
              const translateX = offset * 255; // Horizontal spread matched with wider cards
              const scale = isCenter ? 1.0 : Math.max(0.82, 1 - Math.abs(offset) * 0.12);
              const zIndex = 50 - Math.abs(offset) * 10;
              const opacity = isVisible ? (isCenter ? 1 : Math.max(0.55, 1 - Math.abs(offset) * 0.22)) : 0;

              return (
                <div
                  key={project.id}
                  className={`wheel-card-anchor ${isCenter ? 'card-is-center' : ''}`}
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  onClick={() => {
                    if (isCenter) {
                      if (onSelectProject) onSelectProject(project);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                >
                  <div className="wheel-card-inner">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="wheel-card-img"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Clean White Minimalist Arrow) */}
          <button
            type="button"
            className="wheel-nav-arrow arrow-right"
            onClick={handleNext}
            aria-label="Proyek selanjutnya"
            title="Selanjutnya"
          >
            <svg viewBox="0 0 54 24" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="48" y2="12" />
              <polyline points="36 4 48 12 36 20" />
            </svg>
          </button>
        </div>

        {/* Micro-hint and Counter */}
        <div className="wheel-bottom-controls">
          <div className="wheel-swipe-pill">
            <span className="swipe-icon">⇄</span>
            <span>PUTAR SETIR / GESER • KLIK KARYA UNTUK DETAIL ({currentIndex + 1} / {total})</span>
          </div>
        </div>
      </div>
    </section>
  );
}
