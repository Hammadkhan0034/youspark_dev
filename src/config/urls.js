// Base URL for the application
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

// Auth callback URLs
export const AUTH_CALLBACKS = {
  discord: `${BASE_URL}/auth/discord/callback`,
  twitter: `${BASE_URL}/auth/twitter/callback`,
  // Add other social login callbacks here
};

// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';