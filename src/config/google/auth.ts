export const GoogleAuthConfig = {
  oauth: {
    clientId: '7646556706-vtt0slk3neadsq3550d5pd0fmtbkr91n.apps.googleusercontent.com',
    clientSecret: 'lDky1BBt8WHI-rMXluftvQPK', // Replace with actual client secret
    redirectUri: window.location.origin,
  },
  
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ],

  endpoints: {
    token: 'https://accounts.google.com/o/oauth2/v2/auth',
    userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
    tokenInfo: 'https://oauth2.googleapis.com/tokeninfo'
  },

  allowedOrigins: [
    'https://peaceful-banoffee-c59bc1.netlify.app',
    'http://localhost:5173'
  ],

  options: {
    accessType: 'offline',
    prompt: 'consent',
    responseType: 'code'
  }
} as const;