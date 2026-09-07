/**
 * VORTEX AI — Upstox OAuth 2.0 Authentication Service
 * Keeps all client secrets and authorization tokens strictly server-side.
 */

interface UpstoxSession {
  accessToken: string | null;
  tokenType: string | null;
  expiresAt: number | null;
  userName: string | null;
  userId: string | null;
}

// In-memory server session store (can also be seeded from UPSTOX_ACCESS_TOKEN env var)
let currentSession: UpstoxSession = {
  accessToken: process.env.UPSTOX_ACCESS_TOKEN || null,
  tokenType: 'Bearer',
  expiresAt: process.env.UPSTOX_ACCESS_TOKEN ? Date.now() + 86400000 : null,
  userName: null,
  userId: null
};

export function getUpstoxConfig() {
  const clientId = process.env.UPSTOX_CLIENT_ID || '';
  const clientSecret = process.env.UPSTOX_CLIENT_SECRET || '';
  const redirectUri = process.env.UPSTOX_REDIRECT_URI || `${process.env.APP_URL || 'http://localhost:3000'}/api/upstox/callback`;

  return {
    clientId,
    clientSecret,
    redirectUri,
    hasCredentials: Boolean(clientId && clientSecret),
    hasToken: Boolean(currentSession.accessToken)
  };
}

export function getAuthorizationUrl(): { url: string | null; error?: string } {
  const { clientId, redirectUri, hasCredentials } = getUpstoxConfig();
  if (!clientId) {
    return {
      url: null,
      error: 'UPSTOX_CLIENT_ID is not configured in server environment variables.'
    };
  }

  const authUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

  return { url: authUrl };
}

export async function exchangeCodeForToken(code: string): Promise<{ success: boolean; message: string; data?: any }> {
  const { clientId, clientSecret, redirectUri } = getUpstoxConfig();

  if (!clientId || !clientSecret) {
    return {
      success: false,
      message: 'Missing UPSTOX_CLIENT_ID or UPSTOX_CLIENT_SECRET in server environment variables.'
    };
  }

  try {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('redirect_uri', redirectUri);
    params.append('grant_type', 'authorization_code');

    const response = await fetch('https://api.upstox.com/v2/login/authorization/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        success: false,
        message: `Upstox token exchange failed (status ${response.status}): ${errText}`
      };
    }

    const payload = await response.json();
    if (payload && payload.access_token) {
      currentSession = {
        accessToken: payload.access_token,
        tokenType: payload.token_type || 'Bearer',
        expiresAt: Date.now() + (payload.expires_in || 86400) * 1000,
        userName: payload.user_name || 'Upstox Investor',
        userId: payload.user_id || null
      };

      return {
        success: true,
        message: 'Successfully authenticated with Upstox API V3.',
        data: {
          userName: currentSession.userName,
          userId: currentSession.userId
        }
      };
    }

    return {
      success: false,
      message: 'Upstox response did not include a valid access_token.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Network error exchanging Upstox authorization code: ${err.message}`
    };
  }
}

export function getActiveAccessToken(): string | null {
  return currentSession.accessToken || process.env.UPSTOX_ACCESS_TOKEN || null;
}

export function clearUpstoxSession(): void {
  currentSession = {
    accessToken: null,
    tokenType: null,
    expiresAt: null,
    userName: null,
    userId: null
  };
}

export function getUpstoxStatus() {
  const config = getUpstoxConfig();
  const token = getActiveAccessToken();
  const isConnected = Boolean(token);

  let clientIdMasked = 'Not Configured';
  if (config.clientId) {
    clientIdMasked = config.clientId.length > 6 
      ? `${config.clientId.slice(0, 3)}••••${config.clientId.slice(-3)}`
      : '••••••';
  }

  return {
    hasCredentials: config.hasCredentials,
    isConnected,
    mode: isConnected ? 'LIVE' : 'DEMO',
    clientIdMasked,
    redirectUri: config.redirectUri,
    userName: currentSession.userName,
    tokenExpiry: currentSession.expiresAt ? new Date(currentSession.expiresAt).toISOString() : undefined
  };
}
