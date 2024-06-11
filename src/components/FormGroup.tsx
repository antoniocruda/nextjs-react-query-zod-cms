
type Props =  {
    children: React.ReactNode;
    id?: string;
    className?: string;
    labelClassName?: string;
    label: string;
};

export default function FormGroup({
    children,
    id,
    className,
    labelClassName,
    label
}: Props) {
    return (
        <div className={`w-full ${className || ''}`}>
            <label
                htmlFor={id}
                className={`mb-2 block text-sm ${labelClassName || ''}`}
            >{label}</label>
            {children}
        </div>
    );
}