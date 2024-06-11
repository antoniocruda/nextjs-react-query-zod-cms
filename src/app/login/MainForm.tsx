'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import ChangePasswordForm from './ChangePasswordForm';
import { LoginResponseData } from '@/frontend-api/AuthApiTypes';

export default function MainForm() {
    const [pageView, setPageView] = useState<'login' | 'change-password'>('login');
    const [loginData, setLoginData] = useState<LoginResponseData>({
        accessToken: '',
        refreshToken: ''
    });
    const [password, setPassword] = useState('');

    function handleChangePassword(loginData: LoginResponseData, password: string) {
        setLoginData(loginData);
        setPassword(password);
        setPageView('change-password');
    }

    return (
        <>
            {
                (pageView === 'login')
                ? <LoginForm
                    onShowChangePassword={handleChangePassword}
                  />
                : <ChangePasswordForm
                    loginData={loginData}
                    oldPassword={password}
                  />
            }
        </>
    )
}