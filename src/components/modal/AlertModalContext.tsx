'use client';

import { createContext, useState } from 'react';
import AlertModal from './AlertModal';

export type ModalPropsCbType = () => Promise<void>;

export type AlertModalContextType = {
    visible: boolean;
    title?: string;
    message?: string;
    htmlMessage?: string;
    btnText?: string;
    btnClassName?: string;
    cb: ModalPropsCbType;
};

export const AlertModalContext = createContext<(props: AlertModalContextType) => void>(() => {});

type Props = {
    children: React.ReactNode;
};

export function AlertModalProvider({ children }: Props) {
    const [modalProps, setModalProps] = useState<AlertModalContextType>({
        visible: false,
        cb: () => Promise.resolve()
    });

    function handleClose() {
        setModalProps({
            ...modalProps,
            ...{
                busy: true
            }
        });

        modalProps
            .cb()
            .then(() => {
                setModalProps({
                    visible: false,
                    cb: () => Promise.resolve()
                });
            })
            .catch(() => {
                // errorHandlerWithToast(ex);
                setModalProps({
                    ...modalProps,
                    ...{
                        busy: false,
                        cb: () => Promise.resolve()
                    }
                });
            });
    }

    function alert(props: AlertModalContextType) {
        setModalProps(props);
    }

    return (
        <AlertModalContext.Provider value={alert}>
            {children}

            <AlertModal
                visible={modalProps.visible}
                onClose={handleClose}
                title={modalProps.title}
                message={modalProps.message}
                htmlMessage={modalProps.htmlMessage}
                onOk={handleClose}
                btnText={modalProps.btnText}
                btnClassName={modalProps.btnClassName}
            />
        </AlertModalContext.Provider>
    );
}