import React, { useState, useEffect } from 'react';
import cuttingMatBg from '../assets/portfolio/image 96 (1).webp';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Lock background scroll when open
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

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [project]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const galleryList = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [{ id: 'default', title: project.title, image: project.coverImage }];

  const currentImage = galleryList[selectedImageIndex]?.image || project.coverImage;

  const handleNextThumbnail = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrevThumbnail = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <div
      className="dedicated-page-view"
      style={{ backgroundImage: `url("${cuttingMatBg}")` }}
      role="dialog"
      aria-modal="true"
    >
      <div className="dedicated-page-inner no-scrollbar">
        {/* Top Header Row */}
        <div className="modal-header-row">
          <button
            type="button"
            className="modal-back-btn"
            onClick={onClose}
            aria-label="Kembali ke portofolio"
          >
            ← KEMBALI
          </button>

          <h2 className="modal-title-sticker">PROJECT DETAIL</h2>
        </div>

        {/* Modal Main Content (2 Columns fit in screen) */}
        <div className="modal-body-grid">
          {/* Left Column: Master Preview Card with 100% Auto-Fit Lock */}
          <div className="modal-preview-column">
            <div className="master-image-card">
              {/* Soft Ambient Backdrop Atmosphere */}
              <div
                className="master-backdrop-blur"
                style={{ backgroundImage: `url("${currentImage}")` }}
                aria-hidden="true"
              />
              {/* 100% Full Fit Image without any crop or distortion */}
              <img
                src={currentImage}
                alt={galleryList[selectedImageIndex]?.title || project.title}
                className="master-preview-img-contain"
              />
              <div className="preview-caption-pill">
                {galleryList[selectedImageIndex]?.title || project.title}
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Info + Interactive Thumbnail Switcher */}
          <div className="modal-info-column">
            {/* Meta Tags with Deliverable Format */}
            <div className="project-tags-row">
              <span className="project-category-badge">{project.category}</span>
              {project.mediaFormat && (
                <span className="project-format-badge">🏷️ {project.mediaFormat}</span>
              )}
              <span className="project-year-badge">{project.year}</span>
            </div>

            {/* Project Title */}
            <h3 className="project-detail-title">{project.title}</h3>

            {/* Tools Used */}
            <div className="project-tools-wrap">
              <span className="tools-label">SOFTWARE & TOOLS:</span>
              <div className="tools-badges">
                {project.tools?.map((tool) => (
                  <span key={tool} className="tool-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Client info */}
            {project.client && (
              <div className="project-client-info">
                <strong>Klien / Brand:</strong> {project.client}
              </div>
            )}

            {/* Description / Story */}
            <div className="project-description-box">
              <p className="project-description-text">{project.description}</p>
            </div>

            {/* E-Commerce Style Thumbnail Switcher */}
            <div className="thumbnail-gallery-section">
              <div className="thumbnail-header">
                <span className="thumbnail-title">
                  VARIASI DESAIN & MATERI ({selectedImageIndex + 1}/{galleryList.length})
                </span>
                <span className="thumbnail-hint">Klik gambar untuk melihat</span>
              </div>

              <div className="thumbnail-switcher-row">
                {galleryList.length > 1 && (
                  <button
                    type="button"
                    className="thumb-nav-btn prev-btn"
                    onClick={handlePrevThumbnail}
                    title="Gambar Sebelumnya"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}

                <div className="thumbnail-items-list no-scrollbar">
                  {galleryList.map((item, idx) => {
                    const isActive = idx === selectedImageIndex;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`thumb-card-btn ${isActive ? 'thumb-card-active' : ''}`}
                        onClick={() => setSelectedImageIndex(idx)}
                        title={item.title}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="thumb-card-img"
                        />
                        {isActive && <div className="thumb-active-indicator" />}
                      </button>
                    );
                  })}
                </div>

                {galleryList.length > 1 && (
                  <button
                    type="button"
                    className="thumb-nav-btn next-btn"
                    onClick={handleNextThumbnail}
                    title="Gambar Selanjutnya"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
