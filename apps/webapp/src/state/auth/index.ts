import { Auth0Client, User, createAuth0Client } from '@auth0/auth0-spa-js';
import { atom } from 'signia';

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
  throw new Error('Missing Auth0 Domain or Client ID');
}

class Auth {
  loading = atom('auth.loading', true);
  user = atom<undefined | User>('auth.user', undefined);
  isAuthenticated = atom('auth.isAuthenticated', false);
  token = atom<undefined | string>('auth.token', undefined);

  // brings the user to the login page
  login(): never {
    this.client.loginWithRedirect();
    throw new Error('This function should never return');
  }

  // brings the user to the logout page
  logout() {
    this.client.logout();
  }

  constructor() {
    this.init();
  }

  private client!: Auth0Client;

  private async init() {
    // eslint-disable-next-line no-async-promise-executor
    try {
      this.client = await createAuth0Client({
        domain: AUTH0_DOMAIN,
        clientId: AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });

      const search = new URLSearchParams(window.location.search);
      if ((search.has('code') && search.has('state')) || search.has('error')) {
        await this.client.handleRedirectCallback();
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }

      const isAuthenticated = await this.client.isAuthenticated();
      this.isAuthenticated.set(isAuthenticated);
      if (isAuthenticated) {
        this.user.set(await this.client.getUser());
        this.token.set(await this.client.getTokenSilently());
      }
    } finally {
      this.loading.set(false);
    }
  }
}

const authState = new Auth();

export { authState as auth };
