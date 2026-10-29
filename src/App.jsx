import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectSection from './components/ProjectSection';
import FullCatalogModal from './components/FullCatalogModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import CmsAdminDashboard from './components/CmsAdminDashboard';
import ContactSection from './components/ContactSection';
import { PROJECTS_DATA } from './data/projects';
import { INITIAL_SKILLS, INITIAL_CERTIFICATES } from './data/aboutData';

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
  const [selectedProjectDetail, setSelectedProjectDetail] = useState(null);
  const [isCmsOpen, setIsCmsOpen] = useState(() => {
    return window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin');
  });

  // CMS Password Gate State
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const STUDIO_PASSWORD = 'perumahan1234'; // Default secure PIN/Password

  // LocalStorage persistence for CMS projects data (with auto-sync for default masters)
  const [projectsData, setProjectsData] = useState(() => {
    try {
      const saved = localStorage.getItem('studio_cms_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure default initial assets (like updated high-res master posters) stay synced if unmodified by custom upload
        return parsed.map((p) => {
          const defaultItem = PROJECTS_DATA.find((d) => d.id === p.id);
          if (defaultItem && (!p.coverImage || p.coverImage.includes('mie-ayam.webp'))) {
            return { ...p, coverImage: defaultItem.coverImage };
          }
          return p;
        });
      }
      return PROJECTS_DATA;
    } catch {
      return PROJECTS_DATA;
    }
  });

  const handleSaveProjects = (updated) => {
    setProjectsData(updated);
    try {
      localStorage.setItem('studio_cms_projects', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // LocalStorage persistence for Skills Data
  const [skillsData, setSkillsData] = useState(() => {
    try {
      const saved = localStorage.getItem('studio_cms_skills');
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const handleSaveSkills = (updated) => {
    setSkillsData(updated);
    try {
      localStorage.setItem('studio_cms_skills', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save skills to localStorage:', e);
    }
  };

  // LocalStorage persistence for Certificates Data
  const [certificatesData, setCertificatesData] = useState(() => {
    try {
      const saved = localStorage.getItem('studio_cms_certificates');
      return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  const handleSaveCertificates = (updated) => {
    setCertificatesData(updated);
    try {
      localStorage.setItem('studio_cms_certificates', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save certificates to localStorage:', e);
    }
  };

  // Modal preview scan sertifikat
  const [activeCertPreview, setActiveCertPreview] = useState(null);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === STUDIO_PASSWORD) {
      setIsCmsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Kata sandi salah! Akses ditolak.');
    }
  };

  const handleCloseCms = () => {
    setIsCmsOpen(false);
    setIsCmsAuthenticated(false);
    setPasswordInput('');
    setPasswordError('');
    if (window.location.pathname.includes('/keystatic') || window.location.pathname.includes('/admin')) {
      window.history.pushState({}, '', '/');
    }
  };

  // Secret shortcut (Ctrl+Shift+A) to open CMS admin
  useEffect(() => {
    const handleSecretKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        setIsCmsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  // Secret 3x click on logo to open CMS
  const logoClickRef = React.useRef({ count: 0, timer: null });
  const handleLogoSecretClick = () => {
    navigateToSection(0);
    logoClickRef.current.count += 1;
    if (logoClickRef.current.timer) clearTimeout(logoClickRef.current.timer);

    if (logoClickRef.current.count >= 3) {
      setIsCmsOpen(true);
      logoClickRef.current.count = 0;
    } else {
      logoClickRef.current.timer = setTimeout(() => {
        logoClickRef.current.count = 0;
      }, 1500);
    }
  };

  const isGlidingRef = React.useRef(false);
  const sections = ['hero-section', 'about-section', 'project-section', 'contact-section'];
  const navLinks = ['HOME', 'ABOUT ME', 'PROJECT', 'CONTACT'];

  // Track navbar visibility: visible in HOME (Section 0) & CONTACT (Section 3)
  const isNavbarVisible = activeTab === 'HOME' || activeTab === 'CONTACT';

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

  // Check if any modal or overlay is active
  const isModalActive = isCatalogOpen || Boolean(selectedProjectDetail) || isCmsOpen;

  // One-gesture Fullpage Gliding Wheel & Touch Listener with full reactivity
  useEffect(() => {
    if (isModalActive) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
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
      if (isGlidingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (diff > 50) {
        navigateToSection(currentSectionIdx + 1);
      } else if (diff < -50) {
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
      {/* Top Persistent Global Navbar: visible in HOME and CONTACT sections */}
      <header className={`navbar-wrapper ${isNavbarVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
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
                  {skillsData.map((skill) => (
                    <div
                      key={skill.id}
                      className="skill-icon-item"
                      title={`${skill.name} • ${skill.level || 'Software Specialist'}`}
                    >
                      {skill.logo ? (
                        <img src={skill.logo} alt={skill.name} className="skill-logo" />
                      ) : (
                        <div className="skill-logo-fallback">
                          {skill.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <img
                src={daun2Img}
                alt="Daun hiasan"
                className="leaf-accent leaf-right"
                draggable={false}
              />
            </div>

            {/* Section: PENDIDIKAN & SERTIFIKAT (Dynamic & Interactive with Scan Preview) */}
            <div className="about-cards-row">
              {/* Pendidikan Card */}
              <div className="info-card-column">
                <div className="sticker-tag sticker-tag-pendidikan">PENDIDIKAN</div>
                <div className="dark-info-card">
                  <div className="timeline-container">
                    {certificatesData.filter((c) => c.type === 'pendidikan').map((item, idx, arr) => (
                      <React.Fragment key={item.id}>
                        <div
                          className="timeline-item"
                          style={{ cursor: item.image ? 'pointer' : 'default' }}
                          onClick={() => item.image && setActiveCertPreview(item)}
                          title={item.image ? 'Klik untuk melihat scan ijazah/sertifikat' : item.issuer}
                        >
                          <span className={`timeline-dot ${idx % 2 === 0 ? 'dot-blue' : 'dot-teal'}`} />
                          <span className="timeline-text">
                            {item.title}
                            {item.year && <small style={{ display: 'block', fontSize: '11px', opacity: 0.75, fontWeight: 500 }}>({item.year})</small>}
                          </span>
                          {item.image && <span style={{ fontSize: '12px', marginLeft: '6px' }}>🔍</span>}
                        </div>
                        {idx < arr.length - 1 && <div className="timeline-line" />}
                      </React.Fragment>
                    ))}
                    {certificatesData.filter((c) => c.type === 'pendidikan').length === 0 && (
                      <div style={{ color: '#94a3b8', fontSize: '13px', padding: '10px' }}>Belum ada data pendidikan.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sertifikat Card */}
              <div className="info-card-column">
                <div className="sticker-tag sticker-tag-sertifikat">SERTIFIKAT</div>
                <div className="dark-info-card">
                  <div className="cert-list-container">
                    {certificatesData.filter((c) => c.type === 'sertifikat').map((cert, idx) => (
                      <div
                        key={cert.id}
                        className={`cert-item ${idx > 0 ? 'cert-item-gap' : ''}`}
                        style={{ cursor: cert.image ? 'pointer' : 'default', transition: 'transform 0.2s ease' }}
                        onClick={() => cert.image && setActiveCertPreview(cert)}
                        title={cert.image ? 'Klik untuk melihat scan sertifikat asli' : cert.issuer}
                      >
                        <span className="cert-text">
                          {cert.title}
                          {cert.issuer && (
                            <small style={{ display: 'block', fontSize: '11px', color: '#8edec6', marginTop: '2px', fontWeight: 500 }}>
                              {cert.issuer} {cert.year ? `(${cert.year})` : ''}
                            </small>
                          )}
                        </span>
                        {cert.image && <span style={{ fontSize: '14px', marginLeft: '8px' }}>📜</span>}
                      </div>
                    ))}
                    {certificatesData.filter((c) => c.type === 'sertifikat').length === 0 && (
                      <div style={{ color: '#94a3b8', fontSize: '13px', padding: '10px' }}>Belum ada data sertifikat.</div>
                    )}
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
          onSelectProject={(project) => setSelectedProjectDetail(project)}
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
          setSelectedProjectDetail(project);
        }}
      />

      {/* Project Detail Dedicated View (Root level, di luar meja kayu & z-index tertinggi) */}
      <ProjectDetailModal
        project={selectedProjectDetail}
        isOpen={Boolean(selectedProjectDetail)}
        onClose={() => setSelectedProjectDetail(null)}
      />

      {/* CMS Password Gate Modal (Studio Passkey Gate - Clean & Creative) */}
      {isCmsOpen && !isCmsAuthenticated && (
        <div className="cms-auth-overlay">
          <div className="cms-auth-card">
            <div className="cms-auth-badge">
              <span className="cms-auth-badge-dot"></span>
              STUDIO PASSKEY
            </div>

            <div className="cms-auth-icon-circle">
              <span className="cms-auth-icon-art">🔑</span>
            </div>

            <h3 className="cms-auth-title">Studio Admin Access</h3>
            <p className="cms-auth-desc">
              Masukkan passkey studio kamu untuk mengelola karya portofolio, logo skill software, dan sertifikat.
            </p>

            <form onSubmit={handlePasswordSubmit} className="cms-auth-form">
              <div className="cms-auth-input-wrapper">
                <span className="cms-auth-field-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="cms-auth-input"
                  placeholder="Ketik passkey studio..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  className="cms-auth-toggle-pwd"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Sembunyikan passkey' : 'Lihat passkey'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {passwordError && (
                <div className="cms-auth-error-msg">{passwordError}</div>
              )}

              <div className="cms-auth-btn-row">
                <button
                  type="button"
                  className="cms-auth-cancel-btn"
                  onClick={handleCloseCms}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="cms-auth-submit-btn"
                >
                  Masuk Studio ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive CMS Studio Admin Dashboard (Hanya jika lolos otentikasi) */}
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

      {/* Modal Preview Scan Sertifikat Asli */}
      {activeCertPreview && (
        <div className="cert-preview-overlay" onClick={() => setActiveCertPreview(null)}>
          <div className="cert-preview-card" onClick={(e) => e.stopPropagation()}>
            <div className="cert-preview-header">
              <div>
                <h4 className="cert-preview-title">{activeCertPreview.title}</h4>
                <p className="cert-preview-sub">{activeCertPreview.issuer} • {activeCertPreview.year}</p>
              </div>
              <button
                type="button"
                className="cert-preview-close"
                onClick={() => setActiveCertPreview(null)}
              >
                ✕
              </button>
            </div>
            <div className="cert-preview-body">
              <img
                src={activeCertPreview.image}
                alt={activeCertPreview.title}
                className="cert-preview-img"
              />
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating UP Button - Sembunyikan saat ada modal/detail aktif */}
      <button
        type="button"
        className={`floating-up-btn ${showUpBtn && !isModalActive ? 'floating-up-visible' : 'floating-up-hidden'}`}
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
