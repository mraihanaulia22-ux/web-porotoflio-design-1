import React, { useState } from 'react';
import { PROJECT_CATEGORIES, DESIGN_FORMAT_TYPES } from '../../data/projects';
import { compressImage } from '../../utils/imageCompressor';

export default function CmsProjectsTab({
  projectsList,
  onSaveProjects,
  onNotify,
}) {
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'UMKM BRAND',
    mediaFormat: 'Poster & Feed Sosmed',
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

  const handleStartNew = () => {
    const newProj = {
      id: `project-${Date.now()}`,
      title: '',
      category: 'UMKM BRAND',
      mediaFormat: 'Spanduk & Banner Promosi',
      tagline: '',
      tools: ['Adobe Illustrator', 'Adobe Photoshop'],
      client: '',
      year: new Date().getFullYear().toString(),
      description: '',
      coverImage: projectsList[0]?.coverImage || '',
      gallery: [],
    };
    setEditingProject(newProj);
    setFormData(newProj);
  };

  const handleStartEdit = (project) => {
    setEditingProject(project);
    setFormData({
      ...project,
      mediaFormat: project.mediaFormat || 'Poster & Feed Sosmed',
      tools: [...(project.tools || [])],
      gallery: [...(project.gallery || [])],
    });
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressedUrl = await compressImage(file, 1080, 0.88);
    setFormData((prev) => ({
      ...prev,
      coverImage: compressedUrl,
    }));
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = await Promise.all(
      files.map(async (file, idx) => {
        const compressedUrl = await compressImage(file, 900, 0.85);
        return {
          id: `thumb-${Date.now()}-${idx}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          image: compressedUrl,
        };
      })
    );

    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...newItems],
    }));
  };

  const handleRemoveGalleryItem = (idToRemove) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== idToRemove),
    }));
  };

  const handleUpdateGalleryTitle = (id, newTitle) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((item) => (item.id === id ? { ...item, title: newTitle } : item)),
    }));
  };

  const handleToggleTool = (tool) => {
    const current = formData.tools || [];
    if (current.includes(tool)) {
      setFormData({ ...formData, tools: current.filter((t) => t !== tool) });
    } else {
      setFormData({ ...formData, tools: [...current, tool] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Judul proyek tidak boleh kosong!');
      return;
    }

    const isNew = !projectsList.some((p) => p.id === formData.id);
    let updated;
    if (isNew) {
      updated = [formData, ...projectsList];
    } else {
      updated = projectsList.map((p) => (p.id === formData.id ? { ...formData } : p));
    }

    onSaveProjects(updated);
    setEditingProject(null);
    onNotify('Proyek berhasil disimpan & live!');
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus karya proyek ini dari portofolio?')) {
      const updated = projectsList.filter((p) => p.id !== id);
      onSaveProjects(updated);
      onNotify('Proyek berhasil dihapus.');
    }
  };

  return (
    <div className="cms-content-wrapper">
      {!editingProject ? (
        <>
          <div className="cms-tab-header-row">
            <div>
              <h3 className="cms-section-heading">Koleksi Portofolio Desain Grafis</h3>
              <p className="cms-section-desc">
                Total ada {projectsList.length} karya yang aktif ditampilkan di carousel setir dan katalog.
              </p>
            </div>
            <button type="button" className="cms-add-btn" onClick={handleStartNew}>
              + Tambah Proyek Baru
            </button>
          </div>

          <div className="cms-cards-grid">
            {projectsList.map((project) => (
              <div key={project.id} className="cms-project-card">
                <div className="cms-card-img-wrap">
                  <img src={project.coverImage} alt={project.title} className="cms-card-thumb" />
                  <span className="cms-badge-category">{project.category}</span>
                  {project.mediaFormat && (
                    <span className="cms-badge-format">{project.mediaFormat}</span>
                  )}
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
                    onClick={() => handleDelete(project.id)}
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="cms-form-editor-view">
          <div className="cms-form-top-nav">
            <button
              type="button"
              className="cms-btn-cancel-edit"
              onClick={() => setEditingProject(null)}
            >
              ← Batal & Kembali
            </button>
            <h4 className="cms-form-title">
              {projectsList.some((p) => p.id === formData.id) ? 'Edit Karya Portofolio' : 'Tambah Karya Baru'}
            </h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="cms-form-grid-2">
              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Judul Proyek Desain</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="misal: Verde Harvest - Glow Immune Poster"
                    required
                  />
                </div>

                <div className="cms-form-row-2">
                  <div className="cms-input-group">
                    <label>Kategori Industri</label>
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
                    <label>Format Media Deliverables</label>
                    <select
                      value={formData.mediaFormat}
                      onChange={(e) => setFormData({ ...formData, mediaFormat: e.target.value })}
                    >
                      {DESIGN_FORMAT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cms-input-group">
                  <label>Tagline / Headline Desain</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="misal: Segarkan Tubuhmu Dari Dalam"
                  />
                </div>

                <div className="cms-form-row-2">
                  <div className="cms-input-group">
                    <label>Klien / Brand</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="misal: Verde Harvest Beverages"
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
                  <label>Software & Tools yang Digunakan</label>
                  <div className="cms-tools-selector">
                    {availableTools.map((tool) => {
                      const selected = (formData.tools || []).includes(tool);
                      return (
                        <button
                          type="button"
                          key={tool}
                          className={`tool-select-chip ${selected ? 'chip-selected' : ''}`}
                          onClick={() => handleToggleTool(tool)}
                        >
                          {tool} {selected ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Foto Cover Utama (Carousel Setir & Depan)</label>
                  <div className="cms-image-upload-box">
                    {formData.coverImage ? (
                      <div className="cms-cover-preview-wrapper">
                        <img
                          src={formData.coverImage}
                          alt="Cover Preview"
                          className="cms-cover-large-preview"
                        />
                        <label className="cms-upload-change-btn">
                          Ganti Cover Gambar
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleCoverUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="cms-upload-placeholder">
                        <span className="cms-upload-icon">📷</span>
                        <span>Klik untuk Unggah Cover Gambar</span>
                        <small>Format JPG / PNG / WebP</small>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleCoverUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="cms-input-group">
                  <div className="cms-label-with-action">
                    <label>Foto Galeri & Mockup Tambahan ({formData.gallery?.length || 0})</label>
                    <label className="cms-mini-add-btn">
                      + Tambah Foto
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleGalleryUpload}
                      />
                    </label>
                  </div>
                  <p className="cms-field-hint">
                    Foto ini bisa diklik oleh pengunjung di halaman detail karya untuk berganti tampilan secara interaktif.
                  </p>

                  <div className="cms-gallery-cards-grid">
                    {formData.gallery?.map((item) => (
                      <div key={item.id} className="cms-gallery-editor-card">
                        <img src={item.image} alt={item.title} className="cms-gallery-card-thumb" />
                        <div className="cms-gallery-card-info">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateGalleryTitle(item.id, e.target.value)}
                            placeholder="Nama variasi desain"
                            className="cms-gallery-title-input"
                          />
                          <button
                            type="button"
                            className="cms-gallery-del-btn"
                            onClick={() => handleRemoveGalleryItem(item.id)}
                            title="Hapus foto ini"
                          >
                            ✕ Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!formData.gallery || formData.gallery.length === 0) && (
                      <div className="cms-gallery-empty-prompt">
                        Belum ada foto variasi. Klik tombol "+ Tambah Foto" untuk mengunggah mockup lainnya.
                      </div>
                    )}
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
  );
}
