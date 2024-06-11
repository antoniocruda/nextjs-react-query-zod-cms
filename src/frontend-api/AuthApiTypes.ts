export interface LoggedAdminUser {
    id: number;
    name: string;
    permissions: string[];
}

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    status: 'should-change-password' | 'success';
    data: LoginResponseData;
}

export interface ChangePasswordDto {
    oldPassword: string;
    password: string;
}