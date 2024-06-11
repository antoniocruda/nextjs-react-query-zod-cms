import React, { useState, KeyboardEvent, useRef, InputHTMLAttributes } from 'react';

type Props = {
    className?: string;
    value: number;
    onChange: (newVal: number) => void;
    attrs?: InputHTMLAttributes<HTMLInputElement>;
}

export default function PercentInput({
    className = '',
    value,
    onChange,
    attrs = {}
}: Props) {
    const [val, setVal] = useState(value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    const ref = useRef<HTMLInputElement>(null);

    function handleKeyDown(e: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            if (ref.current) {
                ref.current.blur();
            }
        }
    }

    function handleBlur() {
        const floatVal = parseFloat(val);

        let newVal = 0;
        if (!isNaN(floatVal)) {
            if(floatVal > 100) {
                newVal = 100;
            }
            else {
                newVal = floatVal;
            }
        }

        onChange(newVal);

        setVal(newVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }

    return (
        <input
            ref={ref}
            required
            className={className}
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={val}
            onKeyDown={handleKeyDown}
            onBlur={() => handleBlur()}
            onChange={(e) => setVal(e.target.value)}
            {...attrs}
        />
    );
}
