type Props = {
    onChange: (e: boolean) => void;
    label: string;
    isChecked: boolean;
};

export default function CheckboxInput({
    onChange,
    label,
    isChecked
}: Props) {
    return (
        <label className="cursor-pointer capitalize">
            <input
                className="mr-2"
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
                checked={isChecked}
            />
            {label}
        </label>
    );
}
