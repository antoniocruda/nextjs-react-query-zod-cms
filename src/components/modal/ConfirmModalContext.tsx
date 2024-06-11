'use client';

import { createContext, useState } from 'react';
import useGenericErrorHandler from '@/hooks/useGenericErrorHandler';
import ConfirmModal from './ConfirmModal';

export type ModalPropsCbType = (isConfirmed: boolean) => Promise<boolean | void>;

export type ConfirmModalContextType = {
    visible: boolean;
    title?: string;
    message?: string;
    htmlMessage?: string;
    btn1Text?: string;
    btn2Text?: string;
    btn1ClassName?: string;
    btn2ClassName?: string;
    className?: string;
    busy?: boolean;
    cb: ModalPropsCbType;
}

export const ConfirmModalContext = createContext<(props: ConfirmModalContextType) => void>(() => {});

type Props = {
    children: React.ReactNode;
};

export function ConfirmModalProvider({ children }: Props) {
    const { errorHandlerWithToast } = useGenericErrorHandler();

    const [modalProps, setModalProps] = useState<ConfirmModalContextType>({
        visible: false,
        cb: () => Promise.resolve(true)
    });

    function handleConfirmModalOnConfirm(isConfirmed: boolean) {
        setModalProps({
            ...modalProps,
            ...{
                busy: true
            }
        });

        modalProps
            .cb(isConfirmed)
            .then((doNotReInitialize) => {
                if (!doNotReInitialize) {
                    setModalProps({
                        visible: false,
                        cb: () => Promise.resolve(true)
                    });
                }
            })
            .catch((ex) => {
                errorHandlerWithToast(ex);
                setModalProps({
                    ...modalProps,
                    ...{
                        busy: false,
                        cb: () => Promise.resolve(false)
                    }
                });
            });
    }

    function confirm(props: ConfirmModalContextType) {
        setModalProps(props);
    }

    return (
        <ConfirmModalContext.Provider value={confirm}>
            {children}

            <ConfirmModal
                visible={modalProps.visible}
                title={modalProps.title}
                message={modalProps.message}
                htmlMessage={modalProps.htmlMessage}
                btn1Text={modalProps.btn1Text}
                btn2Text={modalProps.btn2Text}
                btn1ClassName={modalProps.btn1ClassName}
                btn2ClassName={modalProps.btn2ClassName}
                className={modalProps.className}
                busy={modalProps.busy}
                onConfirm={handleConfirmModalOnConfirm}
                onClose={() => handleConfirmModalOnConfirm(false)}
            />
        </ConfirmModalContext.Provider>
    );
}