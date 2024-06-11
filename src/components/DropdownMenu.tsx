import { useState } from 'react';
import useClickoutside from '@/hooks/useClickoutside';
import AngleDownSolidIcon from '../icons/AngleDownSolidIcon';

export type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    onClickOption: (value: string) => void;
    buttonText: string;
    className?: string;
    btnClassName?: string;
};

export default function DropdownMenu({
    buttonText,
    className,
    btnClassName,
    options,
    onClickOption
}: Props) {
    const [showMenu, setShowMenu] = useState(false);

    const clickRef = useClickoutside(() => {
        setShowMenu(false);
    });

    function handleOnClick(item: Option) {
        setShowMenu(false);
        onClickOption(item.value);
    }

    return (
        <div
            className={`relative ${className || ''}`}
            ref={clickRef}
        >
            <button
                className={`btn btn-primary ${btnClassName || ''}`}
                onClick={() => setShowMenu(!showMenu)}
                type="button"
            >
                {buttonText}

                <AngleDownSolidIcon className="w-4 h-4" />
            </button>

            <div
                className={`
                    transition-all duration-300 
                    bg-white text-gray-50
                    z-[10]
                    rounded-lg shadow-lg
                    py-2
                    absolute w-fit right-0
                    ${(showMenu) ? '' : 'hidden'}
                `}
            >
                {options.map((item) => (
                    <button
                        key={`ss-key-${item.value}`}
                        className="w-full px-4 gap-2 text-xs text-left whitespace-nowrap py-2 text-red-700 hover:text-red-500 hover:bg-gray-25"
                        onClick={() => handleOnClick(item)}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
