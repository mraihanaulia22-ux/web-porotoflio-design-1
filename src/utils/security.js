/**
 * Security utilities: Client-side Rate Limiting & Input Sanitization
 */

// Simple rate limiter for Passkey submissions
let failedAttempts = 0;
let lockoutTimer = null;

export function checkPasskeyRateLimit() {
  if (failedAttempts >= 5) {
    return {
      allowed: false,
      message: 'Terlalu banyak percobaan gagal. Akses dikunci selama 30 detik untuk keamanan.',
    };
  }
  return { allowed: true };
}

export function recordFailedPasskey() {
  failedAttempts += 1;
  if (failedAttempts >= 5 && !lockoutTimer) {
    lockoutTimer = setTimeout(() => {
      failedAttempts = 0;
      lockoutTimer = null;
    }, 30000);
  }
}

export function resetPasskeyAttempts() {
  failedAttempts = 0;
  if (lockoutTimer) {
    clearTimeout(lockoutTimer);
    lockoutTimer = null;
  }
}

export function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  return text.trim();
}
