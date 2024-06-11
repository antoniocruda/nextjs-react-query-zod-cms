'use client';

import { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import ToastPortal from './ToastPortal';
import Toast, { ToastObject, ToastObjectType } from './Toast';

export const ToastContext = createContext<(msg: string, type: ToastObjectType, timeout?: number) => void>(() => {});

type Props = {
    children: React.ReactNode;
};

export type Action = { type: 'add'; payload: ToastObject; }
    | { type: 'remove'; payload: string; };

function reducerFxn(
    draft: ToastObject[],
    action: Action
): ToastObject[] | void {
    switch (action.type) {

        case 'add': {
            draft.push(action.payload);

            break;
        }

        case 'remove': {
            const idx = draft.findIndex(el => (el.id === action.payload));
            if (idx >= 0) {
                draft.splice(idx, 1);
            }

            break;
        }

        default:
            throw new Error('Invalid action type');
    }
}

export function ToastProvider({ children }: Props) {
    const [toasts, dispatchToast] = useImmerReducer<ToastObject[], Action>(reducerFxn, []);

    function addToast(message: string, type: ToastObjectType, timeout = 5000) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);

        const toastObj: ToastObject = {
            id: `toast_${new Date().getTime()}_${(array.length > 0) ? array[0] : ''}`,
            message,
            type,
            timeout
        }

        dispatchToast({
            type: 'add',
            payload: toastObj
        })
    }

    function removeToast(id: string) {
        dispatchToast({
            type: 'remove',
            payload: id
        })
    }

    return (
        <ToastContext.Provider value={addToast}>
            {children}

            {(toasts.length > 0) && (
                <ToastPortal>
                    <div className="fixed top-20 right-6 z-[9999] gap-y-3">
                        {toasts.map(toastObj => (
                            <Toast
                                key={toastObj.id}
                                toastObj={toastObj}
                                onRemove={() => removeToast(toastObj.id)}
                            />
                        ))}
                    </div>
                </ToastPortal>
            )}
        </ToastContext.Provider>
    );
}