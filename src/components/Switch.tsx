import { ChangeEvent, useRef } from 'react';

type Props = {
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

const Switch = ({
    checked,
    onChange,
    disabled,
}: Props) => {
    const elementRef = useRef(null);

    function handleSetIsChecked() {
        if (elementRef.current) {
            const element: HTMLInputElement = elementRef.current;
            element.click();
        }
    }

    return (
        <>
            <div
                className="relative w-12 h-3 flex items-center"
                onClick={() => !disabled && handleSetIsChecked()}
            >
                <span
                    className={`
                        group z-[2] absolute w-full h-full flex justify-center items-center
                        ${(checked) ? 'translate-x-[5%]' : '-translate-x-[45%]'}
                        ${(disabled) ? '' : 'hover:cursor-pointer' }
                    `}
                    style={{
                        transition: "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                    }}
                >
                    <input
                        ref={elementRef}
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={(e) => !disabled && onChange(e)}
                    />
                    <span
                        className={`
                            absolute z-[1] w-[20px] h-[20px] 
                            rounded-full border-none
                            ${checked ? 'bg-green-100' : (disabled ? 'bg-gray-50' : 'bg-gray-100')}
                        `}
                    ></span>
                    <span
                        className={`
                            opacity-0 absolute z-[0] w-[20px] h-[20px] p-[18px] 
                            rounded-full border-none
                            ${(disabled) ? 'bg-gray-50' : 'group-hover:opacity-20 bg-green-100'}
                        `}
                    >
                    </span>
                </span>
                <span
                    className={`
                        z-[1] flex items-center w-[60%] h-3 rounded-md
                        ${(checked) ? 'bg-green-100 opacity-50' : 'bg-gray-50 opacity-70'}
                    `}
                    style={{
                        transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                    }}
                />
            </div>
        </>
    );
};

export default Switch;