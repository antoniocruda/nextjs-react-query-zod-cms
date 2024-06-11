import { useEffect } from 'react';
import ModalPortal from './ModalPortal';

type Props = {
    children: React.ReactNode;
    visible: boolean;
    onClose: () => void;
    className?: string;
}

export default function Modal({
    children,
    visible,
    onClose,
    className
}: Props) {

    useEffect(() => {
        if (visible) {
            document.body.classList.add('overflow-hidden');
        }
        else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [visible]);

    if (!visible) {
        return <></>;
    }

    return (
        <ModalPortal>
            <div className="fixed top-0 left-0 right-0 bottom-0 overflow-auto z-[999]">
                <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black/20 -z-[1] pointer-events-[all]"
                    onClick={() => onClose()}
                ></div>

                <div className={`
                    ${(className) ? className : 'w-full overflow-y-hidden max-w-[90%] sm:max-w-[500px] md:max-w-[960px] mx-auto rounded-lg bg-white'}
                `}>
                    {children}
                </div>
            </div>
        </ModalPortal>
    );
};
