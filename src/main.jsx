import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('studio_cms_projects');
    localStorage.removeItem('studio_cms_skills');
    localStorage.removeItem('studio_cms_certificates');
    sessionStorage.clear();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0e2b21',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          textAlign: 'center',
        }}>
          <div style={{
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: '20px',
            padding: '32px 28px',
            maxWidth: '480px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '22px', fontWeight: 800 }}>
              Terjadi Kendala Memuat Studio
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Data sesi atau cache browser lokal perlu disegarkan. Klik tombol di bawah untuk membersihkan cache dan memuat ulang data asli portofolio.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              🔄 Bersihkan Cache & Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
