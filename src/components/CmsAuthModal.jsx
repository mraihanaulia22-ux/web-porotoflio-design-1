import React, { useState } from 'react';
import { checkPasskeyRateLimit, recordFailedPasskey, resetPasskeyAttempts } from '../utils/security';

export default function CmsAuthModal({ isOpen, onAuthenticated, onClose }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Secure Vite environment passkey fallback
  const STUDIO_PASSWORD = import.meta.env.VITE_STUDIO_PASSKEY || 'perumahan1234';

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check rate limit
    const limitCheck = checkPasskeyRateLimit();
    if (!limitCheck.allowed) {
      setPasswordError(limitCheck.message);
      return;
    }

    if (passwordInput.trim() === STUDIO_PASSWORD) {
      resetPasskeyAttempts();
      setPasswordError('');
      setPasswordInput('');
      onAuthenticated();
    } else {
      recordFailedPasskey();
      setPasswordError('Passkey studio salah! Akses ditolak.');
    }
  };

  return (
    <div className="cms-auth-overlay" role="dialog" aria-modal="true">
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

        <form onSubmit={handleSubmit} className="cms-auth-form">
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
              onClick={onClose}
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
  );
}
