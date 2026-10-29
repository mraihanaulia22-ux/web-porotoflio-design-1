import React from 'react';

export default function CmsTopbar({ activeTab, saveNotification }) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'projects':
        return 'Koleksi Portofolio';
      case 'skills':
        return 'Daftar Skills';
      case 'certificates':
        return 'Pendidikan & Sertifikat';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="cms-topbar">
      <div className="cms-breadcrumbs">
        <span>Dashboard</span>
        <span className="sep">/</span>
        <span className="active-crumb">{getTabLabel()}</span>
      </div>

      <div className="cms-topbar-actions">
        {saveNotification && (
          <span className="save-toast-pill">
            ✓ {saveNotification}
          </span>
        )}
      </div>
    </header>
  );
}

