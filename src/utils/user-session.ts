import jwt_decode from 'jwt-decode';
import config from "../config";

interface AuthTokenPayload {
    id: string;
    username: string;
}

export class UserSession {
    public static isActive(): boolean {
        return !!UserSession.getId();
    }

    public static getId(): string {
        const token = UserSession.decodedToken;

        if (!token) {
            return '';
        }

        return token.id;
    }

    public static getUsername(): string {
        const token = UserSession.decodedToken;

        if (!token) {
            return '';
        }

        return token.username;
    }

    private static get decodedToken(): AuthTokenPayload | undefined {
        const token = localStorage.getItem(config.TOKEN_KEY);

        return token ? jwt_decode(token) : undefined;
    }
}