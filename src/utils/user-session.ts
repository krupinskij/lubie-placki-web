import jwt_decode from 'jwt-decode';
import cookies from 'js-cookie';

import config from '../config';

interface AuthTokenPayload {
  _id: string;
  username: string;
}

export class UserSession {
  public static get isActive(): boolean {
    return !!UserSession.userId;
  }

  public static get userId(): string {
    const token = UserSession.decodedToken;

    if (!token) {
      return '';
    }

    return token._id;
  }

  public static get username(): string {
    const token = UserSession.decodedToken;

    if (!token) {
      return '';
    }

    return token.username;
  }

  public static saveToken(token: string): void {
    cookies.set(config.TOKEN_KEY, token);
  }

  public static saveRefreshToken(refreshToken: string): void {
    cookies.set(config.REFRESH_TOKEN_KEY, refreshToken);
  }

  public static removeToken(): void {
    cookies.remove(config.TOKEN_KEY);
    window.location.reload();
  }

  public static getToken(): string | undefined {
    return cookies.get(config.TOKEN_KEY);
  }

  public static getRefreshToken(): string | undefined {
    return cookies.get(config.REFRESH_TOKEN_KEY);
  }

  private static get decodedToken(): AuthTokenPayload | undefined {
    const token = cookies.get(config.TOKEN_KEY);

    return token ? jwt_decode(token) : undefined;
  }
}
