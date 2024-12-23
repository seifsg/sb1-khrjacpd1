export const GOOGLE_AUTH_CONFIG = {
  clientId: '57021001154-qj9ngus8cd6p8jsn5niem9mghhp2q15j.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ],
  origins: [
    'https://peaceful-banoffee-c59bc1.netlify.app',
    'http://localhost:5173'
  ],
  redirectUri: window.location.origin
};