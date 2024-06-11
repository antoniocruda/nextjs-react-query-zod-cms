
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import Modal from './Modal';

type Props = {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    htmlMessage?: string;
    btnText?: string;
    btnClassName?: string;
    onOk: () => void;
}

export default function AlertModal({
    visible,
    onClose,
    title,
    message,
    htmlMessage,
    onOk,
    btnText,
    btnClassName
}: Props) {

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            className="w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] mx-auto mt-[10vh] rounded-lg bg-white"
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
                        dangerouslySetInnerHTML={{ __html: htmlMessage }}
                    />
                )}
            </>

            <div className="py-4 flex justify-center text-lg">
                <button
                    className={`btn btn-primary ${btnClassName || ''}`}
                    onClick={() => onOk()}
                >
                    {btnText || 'OK'}
                </button>
            </div>
        </Modal>
    );
}
