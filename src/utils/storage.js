/**
 * Safe LocalStorage Helper with error handling and fallback support
 */
export function safeGetStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[safeGetStorage] Error reading key "${key}":`, error);
    return fallback;
  }
}

export function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[safeSetStorage] Error writing key "${key}":`, error);
    return false;
  }
}
