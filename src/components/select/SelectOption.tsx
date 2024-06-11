type Props = {
    className?: string;
    selected?: string | number;
    setSelected?: (val: string | number) => void;
    children: JSX.Element | JSX.Element[] | string | number;
    value: string | number;
}

export default function SelectOption({
    className,
    setSelected,
    children,
    value
}: Props) {
    const handleSelected = setSelected || (() => {});

    return (
        <div
            className={`relative cursor-pointer my-1 ${className || ''}`}
            onClick={(e) => {
                handleSelected(value);
                e.stopPropagation();
            }}
        >
            {children}
        </div>
    );
};
