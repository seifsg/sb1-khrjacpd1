class GBPApi {
  private tokenClient: google.accounts.oauth2.TokenClient | null = null;
  private accessToken: string | null = null;

  async init() {
    return new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: GBP_CONFIG.clientId,
          scope: GBP_CONFIG.scopes.join(' '),
          callback: (response) => {
            if (response.error) {
              throw new Error(response.error);
            }
            this.accessToken = response.access_token;
          },
        });
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  async signIn() {
    if (!this.tokenClient) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      this.tokenClient!.requestAccessToken({
        prompt: 'consent',
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }

          // Get user info using the access token
          fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              'Authorization': `Bearer ${response.access_token}`
            }
          })
          .then(res => res.json())
          .then(userInfo => {
            resolve({
              accessToken: response.access_token,
              user: {
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture
              }
            });
          })
          .catch(reject);
        }
      });
    });
  }

  async listLocations(accountId: string) {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${GBP_CONFIG.apiEndpoint}/accounts/${accountId}/locations`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }

    return response.json();
  }

  async updateLocation(locationId: string, data: any) {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${GBP_CONFIG.apiEndpoint}/locations/${locationId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update location');
    }

    return response.json();
  }
}

export const gbpApi = new GBPApi();