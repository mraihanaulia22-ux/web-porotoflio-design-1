import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';
import { PROJECTS_DATA } from './data/projects';
import { INITIAL_SKILLS, INITIAL_CERTIFICATES } from './data/aboutData';
import { safeGetStorage, safeSetStorage } from './utils/storage';

// Wood desk and roman pillars for Sections 2 & 3
import mejaImg from './assets/portfolio/Meja.webp';
import tiang1Img from './assets/portfolio/Tiang 1.webp';
import tiang2Img from './assets/portfolio/Tiang 2.webp';

// Essential Studio Admin & Passkey Components (Loaded directly for instant 0-blank reliability)
import CmsAdminDashboard from './components/CmsAdminDashboard';
import CmsAuthModal from './components/CmsAuthModal';

// Code-Splitting Lazy Loaded Viewer Modals
const FullCatalogModal = lazy(() => import('./components/FullCatalogModal'));
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal'));
const CertPreviewModal = lazy(() => import('./components/CertPreviewModal'));

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [showUpBtn, setShowUpBtn] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState(null);
  const [isCmsOpen, setIsCmsOpen] = useState(() => {
    return window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin');
  });
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('studio_cms_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  // Persistent CMS Projects Data
  const [projectsData, setProjectsData] = useState(() => {
    try {
      const saved = safeGetStorage('studio_cms_projects', null);
      if (saved && Array.isArray(saved) && saved.length > 0) {
        // Purge only fake mock dummy data, KEEP coffee shop / real projects!
        const dummyIds = ['gentlemen-barbershop', 'urban-apparel-streetwear'];
        let filtered = saved.filter((p) => p && typeof p === 'object' && !dummyIds.includes(p.id));

        // Ensure coffee project (titik-temu-cafe) is always restored
        const hasCoffee = filtered.some((p) => p && (p.category === 'COFFEE SHOP' || p.id === 'titik-temu-cafe'));
        if (!hasCoffee) {
          const coffeeItem = PROJECTS_DATA.find((p) => p.id === 'titik-temu-cafe');
          if (coffeeItem) {
            filtered = [...filtered, coffeeItem];
          }
        }

        const sanitized = filtered.map((p) => {
          if (!p) return null;
          const defaultItem = PROJECTS_DATA.find((d) => d.id === p.id);
          if (p.id === 'mie-ayam-kampung' && defaultItem) {
            return { ...p, coverImage: defaultItem.coverImage, gallery: defaultItem.gallery };
          }
          if (p.id === 'titik-temu-cafe' && defaultItem) {
            return { ...defaultItem, ...p, coverImage: defaultItem.coverImage, gallery: defaultItem.gallery };
          }
          if (defaultItem && (!p.coverImage || (typeof p.coverImage === 'string' && p.coverImage.includes('mie-ayam.webp')))) {
            return { ...p, coverImage: defaultItem.coverImage };
          }
          return p;
        }).filter(Boolean);

        // Immediately persist cleaned real data to client localStorage
        safeSetStorage('studio_cms_projects', sanitized);
        return sanitized;
      }
      return PROJECTS_DATA;
    } catch (err) {
      console.warn('[App] Error initializing projectsData:', err);
      return PROJECTS_DATA;
    }
  });

  const handleSaveProjects = (updated) => {
    setProjectsData(updated);
    safeSetStorage('studio_cms_projects', updated);
  };

  // Persistent Skills Data
  const [skillsData, setSkillsData] = useState(() => {
    const saved = safeGetStorage('studio_cms_skills', null);
    return (Array.isArray(saved) && saved.length > 0) ? saved : INITIAL_SKILLS;
  });

  const handleSaveSkills = (updated) => {
    setSkillsData(updated);
    safeSetStorage('studio_cms_skills', updated);
  };

  // Persistent Certificates Data
  const [certificatesData, setCertificatesData] = useState(() => {
    const saved = safeGetStorage('studio_cms_certificates', null);
    return (Array.isArray(saved) && saved.length > 0) ? saved : INITIAL_CERTIFICATES;
  });

  const handleSaveCertificates = (updated) => {
    setCertificatesData(updated);
    safeSetStorage('studio_cms_certificates', updated);
  };

  // Certificate image preview modal state
  const [activeCertPreview, setActiveCertPreview] = useState(null);

  const handleOpenCms = () => {
    setIsCmsOpen(true);
    if (!window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const handleAuthenticatedCms = () => {
    try {
      sessionStorage.setItem('studio_cms_authenticated', 'true');
    } catch (err) {
      console.error(err);
    }
    setIsCmsAuthenticated(true);
    setIsCmsOpen(true);
    if (!window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/admin');
    }
  };

  const handleCloseCms = () => {
    setIsCmsOpen(false);
    setIsCmsAuthenticated(false);
    try {
      sessionStorage.removeItem('studio_cms_authenticated');
    } catch (err) {
      console.error(err);
    }
    if (window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/');
    }
  };

  // Secret 3x click on logo to open CMS
  const logoClickRef = useRef({ count: 0, timer: null });
  const handleLogoSecretClick = () => {
    navigateToSection(0);
    logoClickRef.current.count += 1;
    if (logoClickRef.current.timer) clearTimeout(logoClickRef.current.timer);

    if (logoClickRef.current.count >= 3) {
      handleOpenCms();
      logoClickRef.current.count = 0;
    } else {
      logoClickRef.current.timer = setTimeout(() => {
        logoClickRef.current.count = 0;
      }, 1500);
    }
  };

  // Secret shortcut (Ctrl+Shift+A) to open CMS admin
  useEffect(() => {
    const handleSecretKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        handleOpenCms();
      }
    };
    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  const isGlidingRef = useRef(false);
  const sections = ['hero-section', 'about-section', 'project-section', 'contact-section'];
  const navLinks = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];
  const isNavbarVisible = activeTab === 'HOME' || activeTab === 'CONTACT';

  const navigateToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    const targetEl = document.getElementById(sections[index]);
    if (!targetEl) return;

    isGlidingRef.current = true;
    setCurrentSectionIdx(index);

    const sectionNames = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];
    if (sectionNames[index]) setActiveTab(sectionNames[index]);
    setShowUpBtn(index > 0);

    targetEl.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isGlidingRef.current = false;
    }, 800);
  };

  const isModalActive = isCatalogOpen || Boolean(selectedProjectDetail) || isCmsOpen || Boolean(activeCertPreview);

  // IntersectionObserver to sync navbar & up-button on natural scrolling (especially on mobile/tablet)
  useEffect(() => {
    const sectionEls = sections.map((id) => document.getElementById(id)).filter(Boolean);
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isGlidingRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const idx = sections.indexOf(entry.target.id);
            if (idx !== -1) {
              setCurrentSectionIdx(idx);
              setActiveTab(navLinks[idx]);
              setShowUpBtn(idx > 0);
            }
          }
        });
      },
      { threshold: [0.25, 0.5] }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth full-page gliding touch & wheel handlers for all viewports (Mobile, Tablet, Desktop)
  useEffect(() => {
    if (isModalActive) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isGlidingRef.current) return;

      if (e.deltaY > 15) {
        navigateToSection(currentSectionIdx + 1);
      } else if (e.deltaY < -15) {
        navigateToSection(currentSectionIdx - 1);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (isGlidingRef.current) return;
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      // 45px swipe threshold for clean, responsive section jump scroll
      if (diff > 45) {
        navigateToSection(currentSectionIdx + 1);
      } else if (diff < -45) {
        navigateToSection(currentSectionIdx - 1);
      }
    };

    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateToSection(currentSectionIdx + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(currentSectionIdx - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKey);
    };
  }, [currentSectionIdx, isModalActive]);

  return (
    <div className="portfolio-app">
      {/* Top Persistent Global Navbar */}
      <header className={`navbar-wrapper ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <nav className="navbar-container">
          {/* White square logo / icon button (Klik 3x rahasia untuk Studio CMS) */}
          <div
            className="nav-square-btn"
            onClick={handleLogoSecretClick}
            title="Home (Klik 3x rahasia untuk Studio CMS)"
            aria-label="Kembali ke Home"
          />

          <div className="nav-menu">
            {navLinks.map((link) => {
              const isActive = activeTab === link;
              return (
                <button
                  key={link}
                  type="button"
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  onClick={() => {
                    const idx = navLinks.indexOf(link);
                    if (idx !== -1) navigateToSection(idx);
                  }}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* SECTION 1: HERO / HOME */}
      <HeroSection onScrollToMore={() => navigateToSection(1)} />

      {/* UNIFIED WOOD DESK STAGE (Sections 2 & 3) */}
      <div className="wood-desk-stage" style={{ backgroundImage: `url("${mejaImg}")` }}>
        <img src={tiang1Img} alt="" className="pillar pillar-left" aria-hidden="true" draggable={false} loading="lazy" />
        <img src={tiang2Img} alt="" className="pillar pillar-right" aria-hidden="true" draggable={false} loading="lazy" />
        <div className="sun-glow sun-glow-section2" aria-hidden="true" />
        <div className="diagonal-shadow shadow-section2-desk" aria-hidden="true" />

        {/* SECTION 2: ABOUT ME */}
        <AboutSection
          skills={skillsData}
          certificates={certificatesData}
          onOpenCertPreview={(cert) => setActiveCertPreview(cert)}
        />

        {/* SECTION 3: PROJECT SHOWCASE (Wheel Arc) */}
        <ProjectSection
          projects={projectsData}
          onOpenFullCatalog={() => setIsCatalogOpen(true)}
          onSelectProject={(project) => setSelectedProjectDetail(project)}
          isInView={currentSectionIdx === 2}
        />
      </div>

      {/* SECTION 4: CONTACT ME */}
      <ContactSection
        onNavigate={navigateToSection}
        isInView={currentSectionIdx === 3}
      />

      {/* MODALS & CMS (Lazy Loaded with Suspense for Maximum Performance) */}
      <Suspense fallback={null}>
        {/* Full Catalog Modal */}
        <FullCatalogModal
          projects={projectsData}
          isOpen={isCatalogOpen}
          onClose={() => setIsCatalogOpen(false)}
          onSelectProject={(project) => setSelectedProjectDetail(project)}
        />

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProjectDetail}
          isOpen={Boolean(selectedProjectDetail)}
          onClose={() => setSelectedProjectDetail(null)}
        />

        {/* Scan Certificate Preview Modal */}
        {activeCertPreview && (
          <CertPreviewModal
            cert={activeCertPreview}
            onClose={() => setActiveCertPreview(null)}
          />
        )}
      </Suspense>

      {/* Direct Studio CMS & Passkey Overlay (Instant Render, Zero Blank Risk) */}
      {isCmsOpen && !isCmsAuthenticated && (
        <CmsAuthModal
          isOpen={isCmsOpen && !isCmsAuthenticated}
          onAuthenticated={handleAuthenticatedCms}
          onClose={handleCloseCms}
        />
      )}

      {isCmsOpen && isCmsAuthenticated && (
        <CmsAdminDashboard
          initialProjects={projectsData}
          onSaveProjects={handleSaveProjects}
          initialSkills={skillsData}
          onSaveSkills={handleSaveSkills}
          initialCertificates={certificatesData}
          onSaveCertificates={handleSaveCertificates}
          onClose={handleCloseCms}
        />
      )}

      {/* Persistent Floating UP Button */}
      <button
        type="button"
        className={`floating-up-btn ${showUpBtn && !isModalActive ? 'floating-up-visible' : 'floating-up-hidden'}`}
        onClick={() => navigateToSection(0)}
        title="Kembali ke atas (Home)"
        aria-label="Kembali ke atas"
      >
        <div className="floating-up-pill">
          <svg className="up-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="#123d2f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="up-btn-text">UP</span>
        </div>
      </button>
    </div>
  );
}
