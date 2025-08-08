
/**
 * Authentication Utility Functions
 * Provides centralized authentication and authorization functionality
 */

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('from local storage Token:', token);
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };
  
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  };
  
  
  export const redirectToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  
  
  export const handleApiError = (response, errorMessage = 'Request failed') => {
    if (response.status === 401) {
      redirectToLogin();
      return true; 
    }
    
    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.status}`);
    }
    
    return false; 
  };

// Token management functions
export const tokenService = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  hasToken: () => {
    return !!localStorage.getItem('token');
  }
};

// Check if user is authenticated
export const requireAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return false;
  }
  return true;
};

// Debug function to check token (remove in production)
export const debugToken = () => {
  const token = localStorage.getItem('token');
  console.log('Current token:', token ? 'Token exists' : 'No token found');
  return token;
}; 