'use client';

import { useContext } from 'react';
import { ConfirmModalContext, ConfirmModalContextType } from './ConfirmModalContext';
import { AlertModalContext, AlertModalContextType } from './AlertModalContext';

export default function useCommonModal() {
    const confirm = useContext(ConfirmModalContext);
    const alert = useContext(AlertModalContext);

    function confirmFxn(props: Omit<ConfirmModalContextType, 'visible'>) {
        return confirm({
            ...props,
            ...{
                visible: true
            }
        });
    }

    function alertFxn(props: Omit<AlertModalContextType, 'visible'>) {
        return alert({
            ...props,
            ...{
                visible: true
            }
        });
    }

    return {
        confirm: confirmFxn,
        alert: alertFxn
    };
}