import React, { useState, KeyboardEvent, useRef, InputHTMLAttributes } from 'react';

type Props = {
    className?: string;
    value: number;
    defaultValue?: number;
    onChange: (newVal: number) => void;
    attrs?: InputHTMLAttributes<HTMLInputElement>;
    onKeyDown?: (e: KeyboardEvent) => void;
}

export default function MoneyInput({
    className = '',
    value,
    defaultValue,
    onChange,
    onKeyDown,
    attrs = {}
}: Props) {
    const ref = useRef<HTMLInputElement>(null);

    let initVal = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (defaultValue !== undefined && value === defaultValue) {
        initVal = '';
    }

    const [val, setVal] = useState(initVal);

    function handleKeyDown(e: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Shift', 'ArrowLeft', 'ArrowRight', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }

        if (e.key === 'Enter') {
            if (ref.current && (defaultValue === undefined || value != defaultValue)) {
                ref.current.blur();
            }
        }

        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    function handleBlur() {
        const floatVal = parseFloat(val.replace(/,/g, ''));
        const newVal = isNaN(floatVal) ? 0 : floatVal;
        
        onChange(newVal);

        let calcVal = newVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (defaultValue !== undefined && newVal === defaultValue) {
            calcVal = '';
        }

        setVal(calcVal);
    }

    function handleFocus() {
        setVal(value.toString());
    }

    return (
        <input
            ref={ref}
            required
            className={className}
            type="tel"
            value={val}
            onKeyDown={handleKeyDown}
            onFocus={() => handleFocus()}
            onBlur={() => handleBlur()}
            onChange={(e) => setVal(e.target.value)}
            {...attrs}
        />
    );
}
