import React, { useState } from 'react';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '../data/projects';

export default function CmsAdminDashboard({ onClose, onSaveProjects, initialProjects }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'certificates'
  const [projectsList, setProjectsList] = useState(initialProjects || PROJECTS_DATA);
  const [editingProject, setEditingProject] = useState(null); // null = view list, object = editing/new
  const [saveNotification, setSaveNotification] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'UMKM BRAND',
    tagline: '',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    client: '',
    year: '2024',
    description: '',
    coverImage: '',
    gallery: [],
  });

  const availableTools = [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Figma',
    'CorelDRAW',
    'Canva',
    'Blender 3D',
    'After Effects',
  ];

  const handleStartEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      tools: [...(project.tools || [])],
      gallery: [...(project.gallery || [])],
    });
  };

  const handleStartNew = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      title: '',
      category: 'UMKM BRAND',
      tagline: '',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      client: '',
      year: new Date().getFullYear().toString(),
      description: '',
      coverImage: projectsList[0]?.coverImage || '',
      gallery: [
        {
          id: `g-${Date.now()}-1`,
          title: 'Materi Feed Utama',
          image: projectsList[0]?.coverImage || '',
        },
      ],
    };
    setEditingProject(newProj);
    setFormData(newProj);
  };

  const handleToggleTool = (toolName) => {
    setFormData((prev) => {
      const exists = prev.tools.includes(toolName);
      if (exists) {
        return { ...prev, tools: prev.tools.filter((t) => t !== toolName) };
      } else {
        return { ...prev, tools: [...prev.tools, toolName] };
      }
    });
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Mohon isi Judul Proyek terlebih dahulu!');
      return;
    }

    setProjectsList((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === formData.id);
      let updated;
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = { ...formData };
      } else {
        updated = [formData, ...prev];
      }
      if (onSaveProjects) onSaveProjects(updated);
      return updated;
    });

    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (confirm('Yakin ingin menghapus karya proyek ini dari portofolio?')) {
      setProjectsList((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        if (onSaveProjects) onSaveProjects(updated);
        return updated;
      });
    }
  };

  return (
    <div className="cms-dashboard-overlay">
      {/* Sidebar Navigation */}
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
            onClick={() => {
              setActiveTab('projects');
              setEditingProject(null);
            }}
          >
            <span className="cms-nav-icon">📁</span>
            <span>Projects (Section 3)</span>
          </button>

          <button
            type="button"
            className={`cms-nav-item ${activeTab === 'skills' ? 'cms-nav-active' : ''}`}
            onClick={() => {
              setActiveTab('skills');
              setEditingProject(null);
            }}
          >
            <span className="cms-nav-icon">🎨</span>
            <span>Skills & Specialist</span>
          </button>

          <button
            type="button"
            className={`cms-nav-item ${activeTab === 'certificates' ? 'cms-nav-active' : ''}`}
            onClick={() => {
              setActiveTab('certificates');
              setEditingProject(null);
            }}
          >
            <span className="cms-nav-icon">📜</span>
            <span>Pendidikan & Sertifikat</span>
          </button>
        </nav>

        <div className="cms-sidebar-footer">
          <button type="button" className="cms-exit-live-btn" onClick={onClose}>
            ← Kembali ke Web Live
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="cms-main-workspace no-scrollbar">
        {/* Top Bar */}
        <header className="cms-topbar">
          <div className="cms-breadcrumbs">
            <span>Dashboard</span>
            <span className="sep">/</span>
            <strong className="active-crumb">
              {activeTab === 'projects' && (editingProject ? 'Edit Proyek' : 'Koleksi Portofolio')}
              {activeTab === 'skills' && 'Daftar Skills'}
              {activeTab === 'certificates' && 'Sertifikat'}
            </strong>
          </div>

          <div className="cms-topbar-actions">
            {saveNotification && (
              <span className="save-toast-pill">✓ Perubahan Berhasil Disimpan!</span>
            )}
            {activeTab === 'projects' && !editingProject && (
              <button type="button" className="cms-add-btn" onClick={handleStartNew}>
                + Tambah Proyek Baru
              </button>
            )}
          </div>
        </header>

        {/* Tab 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="cms-content-wrapper">
            {!editingProject ? (
              /* Projects List View */
              <div className="cms-projects-list-view">
                <div className="cms-list-header">
                  <div>
                    <h3 className="cms-section-heading">Koleksi Portofolio Desain Grafis</h3>
                    <p className="cms-section-desc">
                      Total ada <strong>{projectsList.length} karya</strong> yang aktif ditampilkan di carousel setir dan katalog.
                    </p>
                  </div>
                </div>

                <div className="cms-cards-grid">
                  {projectsList.map((project) => (
                    <div key={project.id} className="cms-project-card">
                      <div className="cms-card-img-wrap">
                        <img src={project.coverImage} alt={project.title} className="cms-card-thumb" />
                        <span className="cms-badge-category">{project.category}</span>
                      </div>

                      <div className="cms-card-details">
                        <h4 className="cms-project-title">{project.title}</h4>
                        <p className="cms-project-tagline">{project.tagline}</p>
                        <div className="cms-tools-row">
                          {project.tools?.map((tool) => (
                            <span key={tool} className="cms-tool-pill">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="cms-card-actions-bar">
                        <button
                          type="button"
                          className="cms-btn-edit"
                          onClick={() => handleStartEdit(project)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          className="cms-btn-delete"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Form Editor View */
              <div className="cms-form-editor-view">
                <div className="cms-form-top-nav">
                  <button
                    type="button"
                    className="cms-btn-cancel-edit"
                    onClick={() => setEditingProject(null)}
                  >
                    ← Batal & Kembali ke Daftar
                  </button>
                  <h3 className="cms-form-title">
                    {editingProject.id.startsWith('project-') ? 'Buat Karya Baru' : `Edit: ${formData.title}`}
                  </h3>
                </div>

                <form onSubmit={handleSaveForm} className="cms-editor-form">
                  <div className="cms-form-grid-2">
                    {/* Left Form Inputs */}
                    <div className="cms-form-col">
                      <div className="cms-input-group">
                        <label>Judul Proyek / Brand</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Misal: Verde Harvest - Glow Immune"
                          required
                        />
                      </div>

                      <div className="cms-input-group">
                        <label>Kategori Karya</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          {PROJECT_CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="cms-input-group">
                        <label>Tagline / Headline Singkat</label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                          placeholder="Misal: Segarkan Tubuhmu Dari Dalam"
                        />
                      </div>

                      <div className="cms-form-row-2">
                        <div className="cms-input-group">
                          <label>Nama Klien / Perusahaan</label>
                          <input
                            type="text"
                            value={formData.client}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            placeholder="Misal: Verde Harvest Beverages"
                          />
                        </div>
                        <div className="cms-input-group">
                          <label>Tahun Pembuatan</label>
                          <input
                            type="text"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            placeholder="2024"
                          />
                        </div>
                      </div>

                      <div className="cms-input-group">
                        <label>Software & Tools yang Dipakai (Klik untuk Pilih)</label>
                        <div className="cms-tools-selector">
                          {availableTools.map((tool) => {
                            const isSelected = formData.tools.includes(tool);
                            return (
                              <button
                                type="button"
                                key={tool}
                                className={`tool-select-chip ${isSelected ? 'chip-selected' : ''}`}
                                onClick={() => handleToggleTool(tool)}
                              >
                                {isSelected ? '✓ ' : '+ '} {tool}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Form Inputs: Cover, Gallery, Description */}
                    <div className="cms-form-col">
                      <div className="cms-input-group">
                        <label>Preview Gambar Sampul Utama</label>
                        <div className="cms-image-upload-preview">
                          <img src={formData.coverImage} alt="Cover Preview" className="cms-preview-img" />
                          <div className="cms-img-prompt">
                            <span>Gambar Utama Tampil di Carousel Setir</span>
                          </div>
                        </div>
                      </div>

                      <div className="cms-input-group">
                        <label>Galeri Variasi Desain (Untuk Thumbnail Switcher)</label>
                        <div className="cms-gallery-manager">
                          {formData.gallery?.map((item, idx) => (
                            <div key={item.id || idx} className="cms-gallery-item-chip">
                              <img src={item.image} alt={item.title} className="cms-gallery-mini-thumb" />
                              <span className="cms-gallery-item-title">{item.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="cms-input-group">
                        <label>Deskripsi Konsep & Strategi Desain</label>
                        <textarea
                          rows="4"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Ceritakan latar belakang desain, target audiens, dan solusi visual yang kamu buat..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Footer Action */}
                  <div className="cms-form-actions-footer">
                    <button
                      type="button"
                      className="cms-btn-secondary"
                      onClick={() => setEditingProject(null)}
                    >
                      Batal
                    </button>
                    <button type="submit" className="cms-btn-primary">
                      💾 Simpan & Update Portofolio
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: SKILLS MANAGEMENT */}
        {activeTab === 'skills' && (
          <div className="cms-content-wrapper">
            <h3 className="cms-section-heading">Kelola Software & Keahlian (Section 2)</h3>
            <p className="cms-section-desc">
              Di sini kamu bisa menambah logo software baru (misal: Blender, After Effects, InDesign) tanpa mengubah kode React.
            </p>
            <div className="cms-skills-grid">
              {['Illustrator', 'Photoshop', 'Figma', 'CorelDRAW', 'Canva'].map((software) => (
                <div key={software} className="cms-skill-box">
                  <div className="cms-skill-name">{software}</div>
                  <span className="cms-skill-status">Aktif di Section 2</span>
                </div>
              ))}
              <div className="cms-skill-box cms-skill-box-add">
                <span>+ Tambah Software Baru</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CERTIFICATES MANAGEMENT */}
        {activeTab === 'certificates' && (
          <div className="cms-content-wrapper">
            <h3 className="cms-section-heading">Kelola Sertifikat & Pendidikan (Section 2)</h3>
            <p className="cms-section-desc">
              Tambah sertifikat kursus, sertifikasi BNSP/Adobe, atau riwayat pendidikan.
            </p>
            <div className="cms-cert-list">
              <div className="cms-cert-card">
                <strong>SMK DESAIN KOMUNIKASI VISUAL</strong>
                <span>Pendidikan Formal (DKV)</span>
              </div>
              <div className="cms-cert-card">
                <strong>S1 TEKNIK INFORMATIKA</strong>
                <span>Pendidikan Formal (S1)</span>
              </div>
              <div className="cms-cert-card cms-cert-card-add">
                <span>+ Tambah Sertifikat Baru (Bisa upload gambar PDF credential)</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

