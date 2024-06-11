import { useEffect, useMemo, useRef } from 'react';
import CircleExclamationSolidIcon from '@/icons/CircleExclamationSolidIcon';
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';

export type ToastObjectType = 'error' | 'success' | 'warning';

export type ToastObject = {
    id: string;
    message: string|string[];
    type: ToastObjectType;
    timeout: number;
};

type Props = {
    toastObj: ToastObject;
    onRemove?: (toastObjId: string) => void;
};

export default function Toast({
    toastObj,
    onRemove
}: Props) {
    const lastTimeRef = useRef<number|null>(null);

    const handleRemove = useMemo(() => {
        return (onRemove || (() => {}));
    }, [onRemove]);

    useEffect(() => {
        let timeout = (lastTimeRef.current) ? 5000 - (new Date().getTime() - lastTimeRef.current) : 5000;
        timeout = Math.max(timeout, 0);
        const timeoutHandler = setTimeout(() => {
            handleRemove(toastObj.id);
        }, timeout);

        if (lastTimeRef.current === null) {
            lastTimeRef.current = new Date().getTime();
        }

        return () => {
            clearTimeout(timeoutHandler);
        };
    }, [toastObj, handleRemove]);

    return (
        <div
            key={toastObj.id}
            className={`
                bg-white text-black
                shadow-[0px_5px_10px_0px_rgba(0,0,0,0.3)]
                rounded-lg
                p-3
                mb-3
                min-w-[350px] max-w-[350px]
                flex justify-between items-center
            `}
        >
            <span
                className={`
                    flex items-center justify-start
                    ${(toastObj.type === 'error') ? 'text-red-700' : ''}
                    ${(toastObj.type === 'success') ? 'text-green-700' : ''}
                `}
            >
                <span><CircleExclamationSolidIcon className="w-5 h-5 mr-2"/></span>

                {Array.isArray(toastObj.message) && (
                    <ul>
                        {toastObj.message.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                )}

                {!Array.isArray(toastObj.message) && (
                    <>{toastObj.message}</>
                )}
            </span>
            <button
                className="hover:bg-transparent focus:bg-transparent text-gray-300 hover:text-red-800"
                onClick={() => handleRemove(toastObj.id)}
            >
                <XMarkSolidIcon className="w-5 h-5" />
            </button>
        </div>
    );
}