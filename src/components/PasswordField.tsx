import { useState } from 'react';
import { generateSecurePassword, randomNumberBetween } from '@/helpers/security';
import EyeSlashSolidIcon from '@/icons/EyeSlashSolidIcon';
import EyeSolidIcon from '@/icons/EyeSolidIcon';

type Props = {
    className?: string;
    attrs?: Record<string, unknown>;
    fieldClassName?: string;
    iconClassName?: string;
    onChange: (val: string) => void;
    value: string;
    focusedBorderClass?: string;
    canShowGeneratePassword?: boolean;
};

export default function PasswordField({
    className,
    attrs,
    fieldClassName,
    iconClassName,
    value,
    onChange,
    focusedBorderClass,
    canShowGeneratePassword
}: Props) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [passwordVal, setPasswordVal] = useState(value);

    function handleChange(val: string) {
        setPasswordVal(val);
        onChange(val);
    }

    function handleGeneratePassword() {
        setIsPasswordShown(true);

        const newPassword = generateSecurePassword(randomNumberBetween(16, 32));
        onChange(newPassword);
    }

    return (
        <div
            className={`
                flex rounded-xl py-2 px-3 border border-gray-200 
                ${className}
                ${(isFocused) ? (focusedBorderClass || 'outline-gray-300 !outline-2 outline') : ''}
            `}
        >
            <input
                type={isPasswordShown ? 'text': 'password'}
                className={`flex-grow mr-2 focus-visible:outline-none bg-transparent ${fieldClassName || ''}`}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={(e) => setIsFocused(true)}
                onBlur={(e) => setIsFocused(false)}
                value={passwordVal}
                { ...attrs }
            />

            <button
                onClick={() => setIsPasswordShown(!isPasswordShown)}
                type="button"
                tabIndex={-1}
            >
                {
                    (isPasswordShown)
                    ? <EyeSlashSolidIcon className={`text-gray-300 w-6 ${iconClassName || ''}`} />
                    : <EyeSolidIcon className={`text-gray-300 w-6 ${iconClassName || ''}`} />
                }
            </button>

            {(canShowGeneratePassword) && (
                <button
                    onClick={() => handleGeneratePassword()}
                    type="button"
                    tabIndex={-1}
                    className="hidden group-hover:block absolute left-full top-0 py-2 px-4 whitespace-nowrap text-blue-700 hover:text-blue-300"
                >
                    Generate Password
                </button>
            )}
        </div>
    );
}