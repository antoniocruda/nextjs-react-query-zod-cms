
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';
import Modal from './Modal';

export interface Props {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    title?: string;
    btn1Text?: string;
    btn2Text?: string;
    btn1ClassName?: string;
    btn2ClassName?: string;
    onConfirm: (hasBtn1Clicked: boolean) => void;
    busy?: boolean;
    className?: string;
    btn1Disabled?: boolean;
    btn2Disabled?: boolean;
    bodyClassName?: string;
}

export default function FormModal({
    children,
    visible,
    onClose,
    title,
    btn1Text,
    btn2Text,
    btn1ClassName,
    btn2ClassName,
    onConfirm,
    busy = false,
    className,
    btn1Disabled = false,
    btn2Disabled = false,
    bodyClassName
}: Props) {

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            className={`w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] mx-auto my-[10vh] rounded-lg bg-white ${className || ''}`}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onConfirm(true);
                }}
            >
                <div className="text-center w-full py-4 border-b-2 text-lg font-Montserrat-Bold relative">
                    {title || 'Confirm'}

                    <button
                        className="absolute top-4 right-3"
                        onClick={() => onClose()}
                        type="button"
                    >
                        <XMarkSolidIcon className="w-6 h-6" />
                    </button>
                </div>
                <div
                    id="formModalPaper"
                    className={`
                        py-6 border-b-2 px-8 overflow-y-auto max-h-[calc(100vh_-_330px)]
                        ${bodyClassName || ''}
                    `}
                >
                    {children}
                </div>
                <div className="py-4 flex justify-center gap-4">
                    <button
                        className={`btn btn-primary ${btn1ClassName || ''}`}
                        disabled={busy || btn1Disabled}
                        type="submit"
                    >
                        {btn1Text || 'OK'}

                        {busy && (
                            <CircleLoaderIcon className="inline-block animate-spin text-red-700" />
                        )}
                    </button>

                    <button
                        className={`btn btn-secondary ${btn2ClassName || ''}`}
                        onClick={() => onClose()}
                        disabled={busy || btn2Disabled}
                        type="button"
                    >
                        {btn2Text || 'Cancel'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
