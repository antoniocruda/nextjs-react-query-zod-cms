import baseHttpApi from './lib/useBaseHttpApi';
import { ChangePasswordDto, LoginResponse } from './AuthApiTypes';

export default function useAuthApi() {
    const {
        put,
        post
    } = baseHttpApi();

    function login(username: string, password: string): Promise<LoginResponse> {
        return post(
            `/cms/auth/login`,
            {
                username,
                password
            }
        );
    }

    function logout(
        refreshToken: string
    ): Promise<string> {
        return post(
            `/cms/auth/logout`,
            { refreshToken },
            {},
            true
        );
    }

    function editProfile(name: string): Promise<string> {
        return post(
            `/cms/auth/edit-profile`,
            { name },
            {},
            true
        );
    }

    function changePassword(dto: ChangePasswordDto): Promise<string> {
        return put(
            `/cms/auth/change-password`,
            dto,
            {},
            true
        );
    }

    function changePassword2(dto: ChangePasswordDto, token: string): Promise<string> {
        return put(
            `/cms/auth/change-password`,
            dto,
            { Authorization: `Bearer ${token}` }
        );
    }

    function refreshSession(
        refreshToken: string
    ): Promise<LoginResponse> {
        return post(
            `/cms/auth/refresh-session`,
            { refreshToken }
        );
    }

    return {
        login,
        logout,
        editProfile,
        changePassword,
        changePassword2,
        refreshSession
    };
}