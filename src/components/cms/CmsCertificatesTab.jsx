import React, { useState } from 'react';
import { compressImage } from '../../utils/imageCompressor';

export default function CmsCertificatesTab({
  certificatesList,
  onSaveCertificates,
  onNotify,
}) {
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({
    id: '',
    title: '',
    issuer: '',
    year: '',
    type: 'sertifikat',
    image: '',
  });

  const handleStartAddCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      type: 'sertifikat',
      image: '',
    };
    setEditingCert(newCert);
    setCertForm(newCert);
  };

  const handleStartEditCert = (cert) => {
    setEditingCert(cert);
    setCertForm({ ...cert });
  };

  const handleCertImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressedUrl = await compressImage(file, 1200, 0.85);
    setCertForm((prev) => ({ ...prev, image: compressedUrl }));
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title.trim()) {
      alert('Harap isi nama sertifikat / pendidikan!');
      return;
    }
    let updated;
    const exists = certificatesList.some((c) => c.id === certForm.id);
    if (exists) {
      updated = certificatesList.map((c) => (c.id === certForm.id ? { ...certForm } : c));
    } else {
      updated = [...certificatesList, { ...certForm }];
    }
    onSaveCertificates(updated);
    setEditingCert(null);
    onNotify('Sertifikat berhasil disimpan!');
  };

  const handleDeleteCert = (id) => {
    if (confirm('Hapus data sertifikat/pendidikan ini?')) {
      const updated = certificatesList.filter((c) => c.id !== id);
      onSaveCertificates(updated);
      onNotify('Sertifikat berhasil dihapus.');
    }
  };

  return (
    <div className="cms-content-wrapper">
      <div className="cms-tab-header-row">
        <div>
          <h3 className="cms-section-heading">Kelola Riwayat Pendidikan & Sertifikat (Section 2)</h3>
          <p className="cms-section-desc">
            Tambahkan sertifikasi keahlian (Adobe, BNSP, Kursus) atau riwayat pendidikan formal. Pengunjung bisa mengeklik sertifikat di About Me untuk melihat bukti kredensial aslinya.
          </p>
        </div>
        {!editingCert && (
          <button type="button" className="cms-add-btn" onClick={handleStartAddCert}>
            + Tambah Sertifikat Baru
          </button>
        )}
      </div>

      {/* Certificate Form Editor */}
      {editingCert && (
        <div className="cms-form-editor-view" style={{ marginBottom: '24px' }}>
          <div className="cms-form-top-nav">
            <button type="button" className="cms-btn-cancel-edit" onClick={() => setEditingCert(null)}>
              ← Kembali
            </button>
            <h4 className="cms-form-title">
              {editingCert.id && certificatesList.some((c) => c.id === editingCert.id)
                ? 'Edit Sertifikat / Pendidikan'
                : 'Tambah Sertifikat Baru'}
            </h4>
          </div>

          <form onSubmit={handleSaveCert}>
            <div className="cms-form-grid-2">
              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Judul Sertifikat / Nama Pendidikan</label>
                  <input
                    type="text"
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    placeholder="misal: Adobe Certified Professional atau S1 DKV"
                    required
                  />
                </div>

                <div className="cms-input-group">
                  <label>Penerbit / Instansi / Penyelenggara</label>
                  <input
                    type="text"
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    placeholder="misal: Certiport / Universitas / Kemendikbud"
                    required
                  />
                </div>

                <div className="cms-form-row-2">
                  <div className="cms-input-group">
                    <label>Tahun Perolehan</label>
                    <input
                      type="text"
                      value={certForm.year}
                      onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                      placeholder="misal: 2024"
                    />
                  </div>
                  <div className="cms-input-group">
                    <label>Jenis Kategori</label>
                    <select
                      value={certForm.type}
                      onChange={(e) => setCertForm({ ...certForm, type: e.target.value })}
                    >
                      <option value="sertifikat">Sertifikat Keahlian</option>
                      <option value="pendidikan">Pendidikan Formal</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="cms-form-col">
                <div className="cms-input-group">
                  <label>Upload Foto Scan Sertifikat (Opsional)</label>
                  <div className="cms-image-upload-box">
                    {certForm.image ? (
                      <div className="cms-cover-preview-wrapper">
                        <img
                          src={certForm.image}
                          alt="Cert Preview"
                          style={{ width: '100%', maxHeight: '160px', objectFit: 'contain' }}
                        />
                        <label className="cms-upload-change-btn">
                          Ganti Scan Sertifikat
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleCertImageUpload}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="cms-upload-placeholder">
                        <span className="cms-upload-icon">📜</span>
                        <span>Pilih File Scan Sertifikat</span>
                        <small>Format JPG / PNG / WebP</small>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleCertImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="cms-form-actions-footer">
              <button type="button" className="cms-btn-secondary" onClick={() => setEditingCert(null)}>
                Batal
              </button>
              <button type="submit" className="cms-btn-primary">
                💾 Simpan Data Sertifikat
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates List */}
      <div className="cms-cert-list">
        {certificatesList.map((cert) => (
          <div key={cert.id} className="cms-cert-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              ) : (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  {cert.type === 'pendidikan' ? '🎓' : '🏆'}
                </div>
              )}
              <div>
                <strong style={{ fontSize: '15px', color: '#0f172a' }}>{cert.title}</strong>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  {cert.issuer} • <span style={{ fontWeight: '700', color: '#059669' }}>{cert.year}</span> ({cert.type === 'pendidikan' ? 'Pendidikan' : 'Sertifikasi'})
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="cms-mini-add-btn"
                onClick={() => handleStartEditCert(cert)}
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                className="cms-gallery-del-btn"
                onClick={() => handleDeleteCert(cert.id)}
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        ))}

        {!editingCert && (
          <div className="cms-cert-card cms-cert-card-add" onClick={handleStartAddCert} style={{ padding: '16px' }}>
            <span>+ Tambah Riwayat Sertifikat / Pendidikan Baru</span>
          </div>
        )}
      </div>
    </div>
  );
}

