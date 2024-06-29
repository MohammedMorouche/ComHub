// src/authorizedUsers.js
export const authorizedUsers = JSON.parse(import.meta.env.VITE_AUTHORIZED_USERS || '[]');

// You might want to add some error handling here in case the JSON is invalid