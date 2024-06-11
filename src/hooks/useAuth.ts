import useAuthApi from '@/frontend-api/useAuthApi';
import useAuth2 from '@/components/auth/useAuth';
import { ChangePasswordDto, LoginResponseData } from '@/frontend-api/AuthApiTypes';

export default function useAuth() {
    const { userSession } = useAuth2();
    const {
        login: doLogin,
        logout: doLogout,
        changePassword2: doChangePassword2
    } = useAuthApi();

    async function logout() {
        const refreshToken = userSession?.getRefreshToken() ?? null;
        if (refreshToken) {
            await doLogout(refreshToken)
            userSession?.logout();
        }
    }

    async function login(username: string, password: string) {
        const loginResponse = await doLogin(username, password);

        if (userSession && loginResponse.status === 'success') {
            userSession.updateSession(loginResponse.data);
        }

        return {
            user: userSession?.getUser(),
            loginResponse
        };
    }

    async function changePassword2(dto: ChangePasswordDto, loginData: LoginResponseData) {
        await doChangePassword2(dto, loginData.accessToken);

        if (userSession) {
            userSession.updateSession(loginData);
        }
    }

    function hasLogin() {
        return (userSession !== null && userSession.getUser() !== null);
    }

    return {
        userSession,
        logout,
        login,
        changePassword2,
        hasLogin
    };
}