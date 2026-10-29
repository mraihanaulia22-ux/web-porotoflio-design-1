import React, { useState } from 'react';
import '../styles/cms.css';
import CmsSidebar from './cms/CmsSidebar';
import CmsTopbar from './cms/CmsTopbar';
import CmsProjectsTab from './cms/CmsProjectsTab';
import CmsSkillsTab from './cms/CmsSkillsTab';
import CmsCertificatesTab from './cms/CmsCertificatesTab';
import { PROJECTS_DATA } from '../data/projects';
import { INITIAL_SKILLS, INITIAL_CERTIFICATES } from '../data/aboutData';

export default function CmsAdminDashboard({
  onClose,
  onSaveProjects,
  initialProjects,
  initialSkills,
  onSaveSkills,
  initialCertificates,
  onSaveCertificates,
}) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'certificates'
  const [saveNotification, setSaveNotification] = useState('');

  const handleNotify = (msg) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(''), 3000);
  };

  return (
    <div className="cms-dashboard-overlay">
      <CmsSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onExit={onClose}
      />

      <main className="cms-main-workspace">
        <CmsTopbar
          activeTab={activeTab}
          saveNotification={saveNotification}
        />

        {activeTab === 'projects' && (
          <CmsProjectsTab
            projectsList={initialProjects || PROJECTS_DATA}
            onSaveProjects={onSaveProjects}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'skills' && (
          <CmsSkillsTab
            skillsList={initialSkills || INITIAL_SKILLS}
            onSaveSkills={onSaveSkills}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'certificates' && (
          <CmsCertificatesTab
            certificatesList={initialCertificates || INITIAL_CERTIFICATES}
            onSaveCertificates={onSaveCertificates}
            onNotify={handleNotify}
          />
        )}
      </main>
    </div>
  );
}
