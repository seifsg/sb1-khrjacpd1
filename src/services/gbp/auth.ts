import { GBP_CONFIG } from './config';

export class GBPAuth {
  private static instance: GBPAuth;
  private initialized = false;

  private constructor() {}

  static getInstance(): GBPAuth {
    if (!GBPAuth.instance) {
      GBPAuth.instance = new GBPAuth();
    }
    return GBPAuth.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: GBP_CONFIG.apiKey,
            clientId: GBP_CONFIG.clientId,
            scope: GBP_CONFIG.scopes.join(' '),
            discoveryDocs: GBP_CONFIG.discoveryDocs
          });
          
          this.initialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async signIn() {
    if (!this.initialized) {
      await this.init();
    }

    const googleAuth = gapi.auth2.getAuthInstance();
    const user = await googleAuth.signIn();
    const authResponse = user.getAuthResponse(true);

    return {
      accessToken: authResponse.access_token,
      idToken: authResponse.id_token,
      expiresAt: authResponse.expires_at,
      user: {
        id: user.getId(),
        email: user.getBasicProfile().getEmail(),
        name: user.getBasicProfile().getName(),
        picture: user.getBasicProfile().getImageUrl()
      }
    };
  }

  async signOut() {
    if (!this.initialized) return;
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
  }

  isSignedIn(): boolean {
    if (!this.initialized) return false;
    const googleAuth = gapi.auth2.getAuthInstance();
    return googleAuth.isSignedIn.get();
  }

  getCurrentUser() {
    if (!this.isSignedIn()) return null;
    
    const googleAuth = gapi.auth2.getAuthInstance();
    const user = googleAuth.currentUser.get();
    
    return {
      id: user.getId(),
      email: user.getBasicProfile().getEmail(),
      name: user.getBasicProfile().getName(),
      picture: user.getBasicProfile().getImageUrl()
    };
  }
}

export const gbpAuth = GBPAuth.getInstance();