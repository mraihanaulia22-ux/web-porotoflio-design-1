import React, { useState, useEffect } from 'react';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '../data/projects';
import cuttingMatBg from '../assets/portfolio/image 96 (1).webp';

export default function FullCatalogModal({ isOpen, onClose, onSelectProject, projects }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Prevent background scroll when full page view is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allProjects = projects || PROJECTS_DATA;

  const filteredProjects = activeCategory === 'ALL'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div
      className="dedicated-page-view"
      style={{ backgroundImage: `url("${cuttingMatBg}")` }}
      role="dialog"
      aria-modal="true"
    >
      <div className="dedicated-page-inner">
        {/* Header Bar */}
        <div className="catalog-header-row">
          <button
            type="button"
            className="modal-back-btn"
            onClick={onClose}
            aria-label="Kembali ke portofolio"
          >
            ← KEMBALI KE PORTOFOLIO
          </button>

          <h2 className="catalog-title-sticker">ALL PROJECTS CATALOG</h2>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="catalog-filter-bar">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                type="button"
                key={cat}
                className={`catalog-filter-btn ${isActive ? 'catalog-filter-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid Showcase (Clean, breathing room, polished cards) */}
        <div className="catalog-grid-wrapper no-scrollbar">
          <div className="catalog-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="catalog-card-item"
                onClick={() => {
                  onSelectProject(project);
                }}
                role="button"
                tabIndex={0}
              >
                {/* Media Image with Badges */}
                <div className="catalog-card-media">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="catalog-card-img"
                    loading="lazy"
                  />
                  <div className="catalog-badges-wrap">
                    <span className="catalog-cat-badge">{project.category}</span>
                    {project.mediaFormat && (
                      <span className="catalog-format-badge">{project.mediaFormat}</span>
                    )}
                  </div>
                  <span className="catalog-gallery-badge">
                    {project.gallery?.length || 1} Gambar
                  </span>
                </div>

                {/* Content Details */}
                <div className="catalog-card-content">
                  <h4 className="catalog-card-title">{project.title}</h4>
                  <p className="catalog-card-tagline">{project.tagline}</p>

                  {/* Software Tools Row */}
                  <div className="catalog-tools-list">
                    {project.tools?.map((tool) => (
                      <span key={tool} className="catalog-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Dedicated Action Button (Lihat Detail) */}
                  <div className="catalog-card-action-bar">
                    <span className="catalog-cta-btn">
                      <span>Lihat Detail Karya</span>
                      <svg
                        className="cta-arrow-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
