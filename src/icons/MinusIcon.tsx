import { FC } from 'react';

interface Props {
    className?: string;
};

const MinusIcon: FC<Props> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className || ''}`}
        >
            <path
                d="M5 11h14v2H5z"
                fill="currentColor"
            />
        </svg>
    );
};

export default MinusIcon;