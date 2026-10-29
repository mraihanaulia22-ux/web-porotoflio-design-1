import React from 'react';
import gridHijauImg from '../assets/portfolio/Grid Hijau dengan Bayangan.webp';
import ellipse61Img from '../assets/portfolio/Ellipse 61.webp';
import daun1Img from '../assets/portfolio/Daun 1.webp';
import daun2Img from '../assets/portfolio/Daun 2.webp';

export default function AboutSection({ skills, certificates, onOpenCertPreview }) {
  const safeCerts = Array.isArray(certificates) ? certificates : [];
  const safeSkills = Array.isArray(skills) ? skills : [];
  const pendidikanList = safeCerts.filter((c) => c && c.type === 'pendidikan');
  const sertifikatList = safeCerts.filter((c) => c && c.type === 'sertifikat');

  return (
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
              {safeSkills.map((skill) => (
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
                {pendidikanList.map((item, idx, arr) => (
                  <React.Fragment key={item.id}>
                    <div
                      className="timeline-item"
                      style={{ cursor: item.image ? 'pointer' : 'default' }}
                      onClick={() => item.image && onOpenCertPreview(item)}
                      title={item.image ? 'Klik untuk melihat scan ijazah/sertifikat' : item.issuer}
                    >
                      <span className={`timeline-dot ${idx % 2 === 0 ? 'dot-blue' : 'dot-teal'}`} />
                      <span className="timeline-text">
                        {item.title}
                        {item.year && (
                          <small style={{ display: 'block', fontSize: '11px', opacity: 0.75, fontWeight: 500 }}>
                            ({item.year})
                          </small>
                        )}
                      </span>
                      {item.image && <span style={{ fontSize: '12px', marginLeft: '6px' }}>🔍</span>}
                    </div>
                    {idx < arr.length - 1 && <div className="timeline-line" />}
                  </React.Fragment>
                ))}
                {pendidikanList.length === 0 && (
                  <div style={{ color: '#94a3b8', fontSize: '13px', padding: '10px' }}>
                    Belum ada data pendidikan.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sertifikat Card */}
          <div className="info-card-column">
            <div className="sticker-tag sticker-tag-sertifikat">SERTIFIKAT</div>
            <div className="dark-info-card">
              <div className="cert-list-container">
                {sertifikatList.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className={`cert-item ${idx > 0 ? 'cert-item-gap' : ''}`}
                    style={{ cursor: cert.image ? 'pointer' : 'default', transition: 'transform 0.2s ease' }}
                    onClick={() => cert.image && onOpenCertPreview(cert)}
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
                {sertifikatList.length === 0 && (
                  <div style={{ color: '#94a3b8', fontSize: '13px', padding: '10px' }}>
                    Belum ada data sertifikat.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

