import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import Modal from './Modal';

interface Props {
    onClose: () => void;
    open: boolean;
    url: string;
};

export default function ViewDocumentModal({
    onClose,
    open,
    url
}: Props) {
    return (
        <Modal
            visible={open}
            onClose={onClose}
            className={`w-full max-w-[90%] mx-auto my-[1vh] rounded-lg bg-white`}
        >
            <div className="text-center w-full py-4 border-b-[1px] border-[#ebebeb] text-lg font-Montserrat-Bold relative">
                View Document
                <button
                    className="absolute top-4 right-3"
                    onClick={() => onClose()}
                >
                    <XMarkSolidIcon className="w-6 h-6" />
                </button>
            </div>
            <div id="formModalPaper" className={`h-[90vh] overflow-y-visible`}>
                {(url.includes('.pdf')) && (
                    <object
                        type="application/pdf"
                        data={url}
                        width="100%"
                        height="100%"
                    >
                    </object>
                )}
                {(url.includes('.jpeg') || url.includes('.jpg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp')) && (
                    <div className="w-full h-full flex justify-center items-center overflow-auto">
                        <img
                            src={url}
                            className='max-w-full max-h-full'
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}
