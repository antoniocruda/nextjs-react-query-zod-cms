
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import Modal from './Modal';

export interface Props {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
}

export default function BasicModal({
    children,
    visible,
    onClose,
    title,
    className
}: Props) {
    return (
        <Modal
            visible={visible}
            onClose={onClose}
            className={`
                w-full max-w-[90%] sm:max-w-[400px] md:max-w-[850px]
                mx-auto my-[10vh] 
                bg-white
                rounded-lg
                ${className || ''}
            `}
        >
            <div className="w-full p-4 text-lg relative border-b-2">
                <h3 className="">{title}</h3>
                <button
                    className="absolute top-4 right-3"
                    onClick={() => onClose()}
                >
                    <XMarkSolidIcon className="w-6 h-6" />
                </button>
            </div>

            <>
                {children}
            </>
        </Modal>
    );
};
