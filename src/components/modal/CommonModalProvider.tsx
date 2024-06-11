'use client';

import { AlertModalProvider } from './AlertModalContext';
import { ConfirmModalProvider } from './ConfirmModalContext';

type Props = {
    children: React.ReactNode;
};

export default function CommonModalProvider({
    children
}: Props) {
    return (
        <ConfirmModalProvider>
            <AlertModalProvider>
                {children}
            </AlertModalProvider>
        </ConfirmModalProvider>
    );
}