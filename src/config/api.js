// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      VERIFY: '/api/auth/verify'
    },
    CUSTOMERS: {
      CREATE: '/api/customers',
      GET_ALL: '/api/customers',
      GET_BY_ID: (id) => `/api/customers/${id}`,
      UPDATE: (id) => `/api/customers/${id}`,
      DELETE: (id) => `/api/customers/${id}`
    }
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 