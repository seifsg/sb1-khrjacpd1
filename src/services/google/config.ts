export const GOOGLE_AUTH_CONFIG = {
  clientId: '7646556706-vtt0slk3neadsq3550d5pd0fmtbkr91n.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ],
  origins: [
    'https://peaceful-banoffee-c59bc1.netlify.app',
    'http://localhost:5173'
  ],
  redirectUri: window.location.origin,
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
  oauthConfig: {
    response_type: 'token',
    access_type: 'online',
    prompt: 'consent',
    include_granted_scopes: true
  },
  project: {
    name: 'GBP Monitor',
    id: 'gbp-monitor',
    number: '7646556706'
  }
} as const;