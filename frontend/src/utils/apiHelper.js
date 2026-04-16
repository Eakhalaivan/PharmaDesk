// API Helper utility to handle development vs production mode
export const isDevelopmentMode = () => {
  const token = localStorage.getItem('token');
  return token?.includes('mock') || !token || window.location.hostname === 'localhost';
};

export const makeApiCall = async (url, options = {}) => {
  if (isDevelopmentMode()) {
    console.log(`Development mode: Skipping API call to ${url}`);
    return { ok: false, status: 0, json: () => Promise.resolve({}) };
  }
  
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.warn(`API call failed for ${url}:`, error.message);
    return { ok: false, status: 0, json: () => Promise.resolve({}) };
  }
};

export const safeApiCall = async (url, options = {}, fallbackData = null) => {
  const response = await makeApiCall(url, options);
  
  if (!response.ok) {
    console.warn(`API call failed, using fallback data for ${url}`);
    return fallbackData;
  }
  
  try {
    return await response.json();
  } catch (error) {
    console.warn(`Failed to parse response for ${url}:`, error.message);
    return fallbackData;
  }
};
