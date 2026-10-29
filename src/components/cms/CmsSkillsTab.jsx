import React, { useState } from 'react';
import { compressImage } from '../../utils/imageCompressor';

export default function CmsSkillsTab({
  skillsList,
  onSaveSkills,
  onNotify,
}) {
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({ id: '', name: '', logo: '', level: '' });

  const handleStartAddSkill = () => {
    if (skillsList.length >= 6) {
      alert('Maksimal 6 software skill agar tampilan Section 2 tetap rapi, seimbang, dan proporsional!');
      return;
    }
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: '',
      logo: '',
      level: 'Software Specialist',
    };
    setEditingSkill(newSkill);
    setSkillForm(newSkill);
  };

  const handleStartEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({ ...skill });
  };

  const handleSkillLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressedUrl = await compressImage(file, 256, 0.9);
    setSkillForm((prev) => ({ ...prev, logo: compressedUrl }));
  };

  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name.trim()) {
      alert('Harap isi nama software!');
      return;
    }
    let updated;
    const exists = skillsList.some((s) => s.id === skillForm.id);
    if (exists) {
      updated = skillsList.map((s) => (s.id === skillForm.id ? { ...skillForm } : s));
    } else {
      updated = [...skillsList, { ...skillForm }];
    }
    onSaveSkills(updated);
    setEditingSkill(null);
    onNotify('Software Skill berhasil disimpan!');
  };

  const handleDeleteSkill = (id) => {
    if (confirm('Hapus software skill ini dari Section 2?')) {
      const updated = skillsList.filter((s) => s.id !== id);
      onSaveSkills(updated);
      onNotify('Software Skill dihapus.');
    }
  };

  return (
    <div className="cms-content-wrapper">
      <div className="cms-tab-header-row">
        <div>
          <h3 className="cms-section-heading">Kelola Software & Keahlian (Section 2)</h3>
          <p className="cms-section-desc">
            Tambahkan logo software desain dan spesialisasi keahlianmu. Maksimal 6 software agar Section 2 tampil presisi dan seimbang.
          </p>
        </div>
        {!editingSkill && (
          <button
            type="button"
            className="cms-add-btn"
            onClick={handleStartAddSkill}
            disabled={skillsList.length >= 6}
          >
            + Tambah Software Skill
          </button>
        )}
      </div>

      {/* Skill Form Editor */}
      {editingSkill && (
        <div className="cms-form-editor-view" style={{ marginBottom: '24px' }}>
          <div className="cms-form-top-nav">
            <button type="button" className="cms-btn-cancel-edit" onClick={() => setEditingSkill(null)}>
              ← Kembali
            </button>
            <h4 className="cms-form-title">
              {editingSkill.id && skillsList.some((s) => s.id === editingSkill.id)
                ? 'Edit Software Skill'
                : 'Tambah Software Baru'}
            </h4>
          </div>

          <form onSubmit={handleSaveSkill}>
            <div className="cms-form-grid-2">
              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Nama Software (misal: Blender, After Effects, InDesign)</label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="Nama software desain..."
                    required
                  />
                </div>
                <div className="cms-input-group">
                  <label>Tingkat Spesialisasi / Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                    placeholder="misal: 3D Mockup & Product Specialist"
                    required
                  />
                </div>
              </div>

              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Upload Logo / Icon Software</label>
                  <div className="cms-image-upload-box">
                    {skillForm.logo ? (
                      <div className="cms-cover-preview-wrapper" style={{ padding: '10px' }}>
                        <img
                          src={skillForm.logo}
                          alt="Logo Preview"
                          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                        />
                        <label className="cms-upload-change-btn">
                          Ganti Logo
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleSkillLogoUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="cms-upload-placeholder" style={{ padding: '20px' }}>
                        <span className="cms-upload-icon">🎨</span>
                        <span>Pilih Logo Software</span>
                        <small>Format PNG / SVG / WebP transparan disarankan</small>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleSkillLogoUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="cms-form-actions-footer">
              <button type="button" className="cms-btn-secondary" onClick={() => setEditingSkill(null)}>
                Batal
              </button>
              <button type="submit" className="cms-btn-primary">
                💾 Simpan Software Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List Grid */}
      <div className="cms-skills-grid">
        {skillsList.map((skill) => (
          <div key={skill.id} className="cms-skill-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                />
              ) : (
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    color: '#065f46',
                  }}
                >
                  {skill.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="cms-skill-name">{skill.name}</div>
                <span className="cms-skill-status">{skill.level || 'Aktif di Section 2'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
              <button
                type="button"
                className="cms-mini-add-btn"
                onClick={() => handleStartEditSkill(skill)}
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                className="cms-gallery-del-btn"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}

        {skillsList.length < 6 && !editingSkill && (
          <div className="cms-skill-box cms-skill-box-add" onClick={handleStartAddSkill}>
            <span>+ Tambah Software ({skillsList.length}/6)</span>
          </div>
        )}
      </div>
    </div>
  );
}
