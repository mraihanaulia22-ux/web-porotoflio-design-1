import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectSection from './components/ProjectSection';
import FullCatalogModal from './components/FullCatalogModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import CmsAdminDashboard from './components/CmsAdminDashboard';
import ContactSection from './components/ContactSection';
import { PROJECTS_DATA } from './data/projects';

// Section 1 Asset imports
import bgMat from './assets/portfolio/image 96 (1).webp';
import cardImg from './assets/portfolio/Card.webp';
import berkasImg from './assets/portfolio/Berkas.webp';
import portoFolioImg from './assets/portfolio/PORTO FOLIO.webp';
import ellipse61Img from './assets/portfolio/Ellipse 61.webp';
import ellipse60Img from './assets/portfolio/Ellipse 60.webp';

// Section 2 Asset imports
import mejaImg from './assets/portfolio/Meja.webp';
import gridHijauImg from './assets/portfolio/Grid Hijau dengan Bayangan.webp';
import tiang1Img from './assets/portfolio/Tiang 1.webp';
import tiang2Img from './assets/portfolio/Tiang 2.webp';
import daun1Img from './assets/portfolio/Daun 1.webp';
import daun2Img from './assets/portfolio/Daun 2.webp';
import illustratorImg from './assets/portfolio/Illustrator.webp';
import photoshopImg from './assets/portfolio/Photoshop.webp';
import figmaImg from './assets/portfolio/Figma.webp';
import corelImg from './assets/portfolio/Corel.webp';
import canvaImg from './assets/portfolio/Canva.webp';

function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [showUpBtn, setShowUpBtn] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedCatalogProject, setSelectedCatalogProject] = useState(null);
  const [isCmsOpen, setIsCmsOpen] = useState(() => {
    return window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin');
  });
  const [projectsData, setProjectsData] = useState(PROJECTS_DATA);

  const isGlidingRef = React.useRef(false);
  const sections = ['hero-section', 'about-section', 'project-section', 'contact-section'];
  const navLinks = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];

  // Track if we are in Section Home (Section 1)
  const isHome = activeTab === 'HOME';

  // Smooth Direct Gliding from Section to Section
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

  // One-gesture Fullpage Gliding Wheel & Touch Listener
  useEffect(() => {
    if (isCatalogOpen || selectedCatalogProject || isCmsOpen) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (isCatalogOpen || selectedCatalogProject || isCmsOpen) return;

      // Prevent slow pixel-by-pixel scrolling
      e.preventDefault();

      if (isGlidingRef.current) return;

      if (e.deltaY > 15) {
        // Meluncur langsung ke section bawahnya
        navigateToSection(currentSectionIdx + 1);
      } else if (e.deltaY < -15) {
        // Meluncur langsung ke section atasnya
        navigateToSection(currentSectionIdx - 1);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isGlidingRef.current || isCatalogOpen || selectedCatalogProject) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (diff > 50) {
        navigateToSection(currentSectionIdx + 1);
      } else if (diff < -50) {
        navigateToSection(currentSectionIdx - 1);
      }
    };

    const handleKey = (e) => {
      if (isCatalogOpen || selectedCatalogProject) return;
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
  }, [currentSectionIdx, isCatalogOpen, selectedCatalogProject]);

  const handleNavClick = (link) => {
    if (link === 'HOME') {
      navigateToSection(0);
    } else if (link === 'ABOUT ME') {
      navigateToSection(1);
    } else if (link === 'PROJECT') {
      navigateToSection(2);
    } else if (link === 'CONTACT') {
      navigateToSection(3);
    }
  };

  const scrollToMore = () => {
    navigateToSection(1);
  };

  const scrollToTop = () => {
    navigateToSection(0);
  };

  return (
    <div className="portfolio-app">
      {/* Top Navbar: only visible when in Home section, hides when in other sections */}
      <header className={`navbar-wrapper ${isHome ? 'navbar-visible' : 'navbar-hidden'}`}>
        <nav className="navbar-container">
          {/* Nav Menu Links */}
          <div className="nav-menu">
            {navLinks.map((link) => {
              const isActive = activeTab === link;
              return (
                <button
                  key={link}
                  type="button"
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                  onClick={() => handleNavClick(link)}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* SECTION 1: HERO / HOME */}
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
            onClick={scrollToMore}
          >
            Lihat Lebih Banyak Dibawah
          </button>
        </footer>

        {/* Aesthetic Foreground Diagonal Shadows (Figma: over card & over document, 40% opacity, blur 80px, z-index top) */}
        <div className="diagonal-shadow shadow-over-card" aria-hidden="true" />
        <div className="diagonal-shadow shadow-over-doc" aria-hidden="true" />
      </section>

      {/* UNIFIED WOOD DESK STAGE (Section 2 & Section 3 seamless without cut lines) */}
      <div className="wood-desk-stage" style={{ backgroundImage: `url("${mejaImg}")` }}>
        {/* Roman Columns flanking left and right sides (continuous throughout all desk sections) */}
        <img
          src={tiang1Img}
          alt=""
          className="pillar pillar-left"
          aria-hidden="true"
          draggable={false}
          loading="lazy"
        />
        <img
          src={tiang2Img}
          alt=""
          className="pillar pillar-right"
          aria-hidden="true"
          draggable={false}
          loading="lazy"
        />

        {/* Ambient Sunlight & Shadows over the wood stage */}
        <div className="sun-glow sun-glow-section2" aria-hidden="true" />
        <div className="diagonal-shadow shadow-section2-desk" aria-hidden="true" />

        {/* SECTION 2: ABOUT ME */}
        <section id="about-section" className="about-section">
          {/* Top Connecting Green Mat with Drop Shadow */}
          <div className="about-top-grid-wrapper">
            <img
              src={gridHijauImg}
              alt=""
              className="about-top-grid-img"
              aria-hidden="true"
              draggable={false}
            />
            <h2 className="about-title-sticker">ABOUT ME</h2>
          </div>

          {/* Stage Content */}
          <div className="about-content-container">

            {/* Card 1: TENTANG SAYA */}
            <div className="tentang-wrapper">
              <div className="sticker-tag sticker-tag-tentang">TENTANG SAYA</div>

              {/* Golden ring behind top-right corner of card */}
              <img
                src={ellipse61Img}
                alt=""
                className="ring-accent ring-tentang"
                aria-hidden="true"
                draggable={false}
              />

              <div className="tentang-card">
                <p className="tentang-text">
                  Desainer grafis berlatar belakang DKV dan Teknik Informatika. Fokus pada identitas merek, promosi komersial UMKM, dan materi siap cetak presisi tinggi.
                </p>
              </div>
            </div>

            {/* Section: SKILL & SPESIALIST */}
            <div className="skills-wrapper">
              <img
                src={daun1Img}
                alt="Daun hiasan"
                className="leaf-accent leaf-left"
                draggable={false}
              />

              <div className="skills-center-content">
                <h3 className="skills-title-sticker">SKILL & SPESIALIST</h3>
                <div className="skill-icons-row">
                  <div className="skill-icon-item" title="Adobe Illustrator">
                    <img src={illustratorImg} alt="Adobe Illustrator" className="skill-logo logo-illustrator" />
                  </div>
                  <div className="skill-icon-item" title="Adobe Photoshop">
                    <img src={photoshopImg} alt="Adobe Photoshop" className="skill-logo logo-photoshop" />
                  </div>
                  <div className="skill-icon-item" title="Figma">
                    <img src={figmaImg} alt="Figma" className="skill-logo logo-figma" />
                  </div>
                  <div className="skill-icon-item" title="CorelDRAW">
                    <img src={corelImg} alt="CorelDRAW" className="skill-logo logo-corel" />
                  </div>
                  <div className="skill-icon-item" title="Canva">
                    <img src={canvaImg} alt="Canva" className="skill-logo logo-canva" />
                  </div>
                </div>
              </div>

              <img
                src={daun2Img}
                alt="Daun hiasan"
                className="leaf-accent leaf-right"
                draggable={false}
              />
            </div>

            {/* Section: PENDIDIKAN & SERTIFIKAT */}
            <div className="about-cards-row">
              {/* Pendidikan Card */}
              <div className="info-card-column">
                <div className="sticker-tag sticker-tag-pendidikan">PENDIDIKAN</div>
                <div className="dark-info-card">
                  <div className="timeline-container">
                    <div className="timeline-item">
                      <span className="timeline-dot dot-blue" />
                      <span className="timeline-text">
                        SMK DESAIN KOMUNIKASI<br />VISUAL
                      </span>
                    </div>
                    <div className="timeline-line" />
                    <div className="timeline-item">
                      <span className="timeline-dot dot-teal" />
                      <span className="timeline-text">
                        S1 TEKNIK INFORMATIKA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sertifikat Card */}
              <div className="info-card-column">
                <div className="sticker-tag sticker-tag-sertifikat">SERTIFIKAT</div>
                <div className="dark-info-card">
                  <div className="cert-list-container">
                    <div className="cert-item">
                      <span className="cert-text">
                        SMK DESAIN KOMUNIKASI<br />VISUAL
                      </span>
                    </div>
                    <div className="cert-item cert-item-gap">
                      <span className="cert-text">
                        S1 TEKNIK INFORMATIKA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: PROJECT SHOWCASE (Flows seamlessly on the same wood desk with Fade Up) */}
        <ProjectSection
          projects={projectsData}
          onOpenFullCatalog={() => setIsCatalogOpen(true)}
          isInView={currentSectionIdx === 2}
        />
      </div>

      {/* SECTION 4: CONTACT ME (Mockup with cutting mat, stickers, curly arrows & torn papers) */}
      <ContactSection
        onNavigate={navigateToSection}
        isInView={currentSectionIdx === 3}
      />

      {/* Full Catalog Modal (Opsi 2: Grid Semua Portofolio) */}
      <FullCatalogModal
        projects={projectsData}
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectProject={(project) => {
          setSelectedCatalogProject(project);
        }}
      />

      {/* Detail Modal opened directly from Full Catalog */}
      <ProjectDetailModal
        project={selectedCatalogProject}
        isOpen={Boolean(selectedCatalogProject)}
        onClose={() => setSelectedCatalogProject(null)}
      />

      {/* Interactive CMS Studio Admin Dashboard */}
      {isCmsOpen && (
        <CmsAdminDashboard
          initialProjects={projectsData}
          onSaveProjects={(updated) => setProjectsData(updated)}
          onClose={() => {
            setIsCmsOpen(false);
            if (window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin')) {
              window.history.pushState({}, '', '/');
            }
          }}
        />
      )}

      {/* Floating Quick CMS Access Button in Live Web */}
      <button
        type="button"
        className="cms-quick-access-btn"
        onClick={() => setIsCmsOpen(true)}
        title="Buka Studio CMS Admin (Kelola Portofolio, Skill & Sertifikat)"
      >
        <span>⚙️</span>
        <span>STUDIO CMS</span>
      </button>

      {/* Persistent Floating UP Button - Follows user across all lower sections, hides in Home */}
      <button
        type="button"
        className={`floating-up-btn ${showUpBtn ? 'floating-up-visible' : 'floating-up-hidden'}`}
        onClick={scrollToTop}
        title="Kembali ke atas (Home)"
        aria-label="Kembali ke atas"
      >
        <div className="floating-up-pill">
          <svg
            className="up-chevron-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#123d2f"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="up-btn-text">UP</span>
        </div>
      </button>

    </div>
  );
}

export default App;
