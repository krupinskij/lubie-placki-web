import jwt_decode from 'jwt-decode';
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
    localStorage.setItem(config.TOKEN_KEY, token);
    window.location.reload();
  }

  public static removeToken(): void {
    localStorage.removeItem(config.TOKEN_KEY);
    window.location.reload();
  }

  private static get decodedToken(): AuthTokenPayload | undefined {
    const token = localStorage.getItem(config.TOKEN_KEY);

    return token ? jwt_decode(token) : undefined;
  }
}
