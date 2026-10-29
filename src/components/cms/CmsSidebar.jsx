import React from 'react';

export default function CmsSidebar({ activeTab, onSelectTab, onExit }) {
  return (
    <aside className="cms-sidebar">
      <div className="cms-brand-box">
        <div className="cms-logo-badge">PORTFOLIO CMS</div>
        <h2 className="cms-admin-title">Studio Admin</h2>
        <p className="cms-admin-sub">Muhammad Raihan</p>
      </div>

      <nav className="cms-nav-menu">
        <button
          type="button"
          className={`cms-nav-item ${activeTab === 'projects' ? 'cms-nav-active' : ''}`}
          onClick={() => onSelectTab('projects')}
        >
          <span className="cms-nav-icon">📁</span>
          <span>Projects (Section 3)</span>
        </button>

        <button
          type="button"
          className={`cms-nav-item ${activeTab === 'skills' ? 'cms-nav-active' : ''}`}
          onClick={() => onSelectTab('skills')}
        >
          <span className="cms-nav-icon">🎨</span>
          <span>Skills & Specialist</span>
        </button>

        <button
          type="button"
          className={`cms-nav-item ${activeTab === 'certificates' ? 'cms-nav-active' : ''}`}
          onClick={() => onSelectTab('certificates')}
        >
          <span className="cms-nav-icon">📜</span>
          <span>Pendidikan & Sertifikat</span>
        </button>
      </nav>

      <div className="cms-sidebar-footer">
        <button
          type="button"
          className="cms-exit-live-btn"
          onClick={onExit}
        >
          ← Kembali ke Web Live
        </button>
      </div>
    </aside>
  );
}

