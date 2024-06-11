
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import Modal from './Modal';

export type ConfirmModalProps = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    htmlMessage?: string;
    btn1Text?: string;
    btn2Text?: string;
    btn1ClassName?: string;
    btn2ClassName?: string;
    className?: string;
    onConfirm: (hasBtn1Clicked: boolean) => void;
    busy?: boolean;
}

export default function ConfirmModal({
    visible,
    onClose,
    title,
    message,
    htmlMessage,
    btn1Text,
    btn2Text,
    btn1ClassName,
    btn2ClassName,
    onConfirm,
    busy,
    className
}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            onClose={onClose}
            className={`w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] mx-auto mt-[10vh] rounded-lg bg-white ${className || ''}`}
        >
            <div className="text-center w-full py-4 border-b-2 text-lg font-Montserrat-Bold relative">
                {title || 'Confirm'}

                <button
                    className="absolute top-4 right-3"
                    onClick={() => onClose()}
                >
                    <XMarkSolidIcon className="w-6 h-6" />
                </button>
            </div>

            <>
                {(message) && (
                    <div className="pt-6 pb-12 border-b-2 px-8">
                        {message}
                    </div>
                )}

                {(!message && htmlMessage) && (
                    <div
                        className="pt-6 pb-12 border-b-2 px-8"
                        dangerouslySetInnerHTML={{ __html: htmlMessage }}
                    />
                )}
            </>

            <div className="py-4 flex justify-center gap-4">
                <button
                    className={`
                        btn btn-primary ${btn1ClassName || ''}
                    `}
                    onClick={() => onConfirm(true)}
                    disabled={busy}
                    type="button"
                >
                    { btn1Text || 'OK' }

                    {busy && (
                        <CircleLoaderIcon className="inline-block animate-spin text-red-700" />
                    )}
                </button>
                <button
                    className={`
                        btn btn-secondary ${btn2ClassName || ''}
                    `}
                    disabled={busy}
                    onClick={() => onConfirm(false)}
                    type="button"
                >
                    { btn2Text || 'Cancel' }
                </button>
            </div>
        </Modal>
    );
}
