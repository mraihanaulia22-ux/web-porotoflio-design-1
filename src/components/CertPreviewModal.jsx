import React, { useEffect } from 'react';

export default function CertPreviewModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div className="cert-preview-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cert-preview-card" onClick={(e) => e.stopPropagation()}>
        <div className="cert-preview-header">
          <div>
            <h4 className="cert-preview-title">{cert.title}</h4>
            <p className="cert-preview-sub">
              {cert.issuer} {cert.year ? `• ${cert.year}` : ''}
            </p>
          </div>
          <button
            type="button"
            className="cert-preview-close"
            onClick={onClose}
            aria-label="Tutup preview"
          >
            ✕
          </button>
        </div>
        <div className="cert-preview-body">
          <img
            src={cert.image}
            alt={cert.title}
            className="cert-preview-img"
          />
        </div>
      </div>
    </div>
  );
}
