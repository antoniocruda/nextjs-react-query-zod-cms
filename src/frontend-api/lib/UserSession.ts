import { hasProp } from '@/helpers/object';
import { LoggedAdminUser, LoginResponseData } from '../AuthApiTypes';

export class UserSession {
    private static readonly USER_JWT_TOKEN = 'USER_JWT_TOKEN';
    private static readonly USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';

    private jwtToken: string | null = null;
    private refreshToken: string | null = null;
    private user: LoggedAdminUser | null = null;
    private jwtJsonTokenExpiry = 0;

    constructor() {
        if (typeof window !== 'undefined') {
            this.jwtToken = window.localStorage.getItem(UserSession.USER_JWT_TOKEN);
            this.refreshToken = window.localStorage.getItem(UserSession.USER_REFRESH_TOKEN);
    
            this.readUserFromJwtToken();
        }
    }

    getJwtToken() {
        return this.jwtToken;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    getUser() {
        return this.user;
    }

    isJwtJsonTokenExpired() {
        return ((this.jwtJsonTokenExpiry - 60) < (new Date().getTime() / 1000));
    }

    updateSession(resp: LoginResponseData) {
        window.localStorage.setItem(UserSession.USER_JWT_TOKEN, resp.accessToken);
        window.localStorage.setItem(UserSession.USER_REFRESH_TOKEN, resp.refreshToken);

        this.jwtToken = resp.accessToken;
        this.refreshToken = resp.refreshToken;

        this.readUserFromJwtToken();
    }

    async logout() {
        this.jwtToken = null;
        this.refreshToken = null;
        this.user = null;
        window.localStorage.removeItem(UserSession.USER_JWT_TOKEN);
        window.localStorage.removeItem(UserSession.USER_REFRESH_TOKEN);
    }

    private readUserFromJwtToken() {
        this.user = null;
        this.jwtJsonTokenExpiry = 0;

        if (this.jwtToken) {
            const [header, body] = this.jwtToken.split('.');
            const decoded = atob(body);
            try {
                const jsonObj = JSON.parse(decoded);

                if (
                    hasProp(jsonObj, 'id')
                    && hasProp(jsonObj, 'name')
                    && hasProp(jsonObj, 'permissions')
                    && hasProp(jsonObj, 'exp')
                ) {
                    this.user = {
                        id: jsonObj.id,
                        name: jsonObj.name,
                        permissions: jsonObj.permissions
                    };

                    this.jwtJsonTokenExpiry = (jsonObj.exp as number);
                }
            }
            catch (ex) {
                console.error(ex);
            }
        }
    }
}
