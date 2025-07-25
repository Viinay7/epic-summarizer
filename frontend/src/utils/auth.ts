// Authentication utility functions

export interface User {
  email: string;
  name?: string;
  loginTime: string;
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Get JWT token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get user information from localStorage
export const getUser = (): User | null => {
  const email = localStorage.getItem('userEmail');
  const name = localStorage.getItem('userName');
  const loginTime = localStorage.getItem('loginTime');
  
  if (!email || !loginTime) {
    return null;
  }
  
  return {
    email,
    name: name || undefined,
    loginTime
  };
};

// Logout function - clears all auth data
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('loginTime');
};

// Set auth data (for when you implement real backend)
export const setAuthData = (token: string, email: string, name?: string): void => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userEmail', email);
  if (name) {
    localStorage.setItem('userName', name);
  }
  localStorage.setItem('loginTime', new Date().toISOString());
};

// Get Authorization header for API calls
export const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check if token is expired (basic check - in real app you'd decode JWT)
export const isTokenExpired = (): boolean => {
  const loginTime = localStorage.getItem('loginTime');
  if (!loginTime) return true;
  
  const loginDate = new Date(loginTime);
  const now = new Date();
  const diffInHours = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
  
  // Consider token expired after 24 hours (adjust as needed)
  return diffInHours > 24;
};