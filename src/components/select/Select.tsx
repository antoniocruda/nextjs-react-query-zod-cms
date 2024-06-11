import React, { useState, useEffect, useRef } from 'react';
import { escapeString } from '@/helpers/string';
import { hasProp } from '@/helpers/object';
import AngleDownSolidIcon from '@/icons/AngleDownSolidIcon';
import CircleLoaderIcon from '@/icons/CircleLoaderIcon';

type Props = {
    className?: string;
    renderedValueWrapperClassName?: string;
    renderedValueInnerWrapperClassName?: string;
    renderedValueWrapperPlaceholderClassName?: string;
    renderedValueInnerWrapperPlaceholderClassName?: string;
    arrowIconClassName?: string;
    popupWrapperClassName?: string;
    placeholder?: string;
    value?: string | number;
    renderValue?: (val?: string | number) => JSX.Element;
    children: JSX.Element | JSX.Element[];
    onChange?: (val?: string | number) => void;
    allowInputText?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    tabIndex?: number;
}

export default function Select({
    className,
    children,
    value,
    renderValue,
    renderedValueWrapperClassName,
    renderedValueInnerWrapperClassName,
    renderedValueWrapperPlaceholderClassName,
    renderedValueInnerWrapperPlaceholderClassName,
    arrowIconClassName,
    popupWrapperClassName,
    placeholder,
    onChange,
    allowInputText,
    isLoading = false,
    disabled = false,
    tabIndex = 0
}: Props) {
    const [selected, setSelected] = useState<string|number|undefined>(undefined);
    const [isPopupShown, setIsPopupShown] = useState(false);
    const [options, setOptions] = useState<Record<string, string>>({});
    const [fieldText, setFieldText] = useState<string|number>('');
    const [mChildren, setMChildren] = useState<JSX.Element | JSX.Element[]>([]);
    const [allChildren, setAllChildren] = useState<React.FunctionComponentElement<any>[]>([]);
    const el = useRef(null);

    useEffect(() => {
        setSelected(value);

        if (allowInputText && value) {
            setFieldText(value);
        }
    }, [value]);

    useEffect(() => {
        const rawChildren:JSX.Element|JSX.Element[] = [];

        React.Children.forEach(children, (child) => {
            const key = (child.props.value as (number | string)).toString();
            const value = (child.props.children) ? child.props.children.toString() : '';

            if (allowInputText && fieldText.toString().length > 0) {
                const pattern = new RegExp(`${escapeString(fieldText.toString())}`, 'gi');

                if (pattern.test(key) || pattern.test(value)) {
                    rawChildren.push(child);
                }
            }
            else {
                rawChildren.push(child);
            }
        });

        setMChildren(rawChildren);
    }, [children, fieldText]);

    useEffect(() => {
        const opts: Record<string, string> = {};
        React.Children.forEach(mChildren, (child) => {
            const key = (child.props.value as (number | string)).toString();
            const value = (child.props.children) ? child.props.children.toString() : '';
            opts[key] = value;
        });
        setOptions(opts);

        const clonedChildren = React.Children.map(mChildren, (child) => {
            const clone = React.cloneElement(child, {
                selected,
                setSelected: setSelectedWrapper
            });

            return clone;
        });

        setAllChildren(clonedChildren);
    }, [mChildren]);

    const handleClick = () => {
        setTimeout(() => {
            setIsPopupShown(!isPopupShown);
        }, 50);
    };

    useEffect(() => {
        const windowClickHandler = () => {
            setIsPopupShown(false);
        };

        window.addEventListener('click', windowClickHandler);

        return () => {
            window.removeEventListener('click', windowClickHandler);
        };
    }, []);

    const setSelectedWrapper = (val: string) => {
        setSelected(val);
        setIsPopupShown(false);

        if (onChange) {
            onChange(val);
        }
    };

    const handleFieldTextOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldText(e.target.value);
        
        if (onChange) {
            onChange(e.target.value);
        }
    }

    return (
        <div
            ref={el}
            tabIndex={tabIndex}
            className={`
                relative rounded-lg border border-gray-200 flex items-center select-none
                ${className || ''}
                ${(isPopupShown) ? 'outline outline-[#666] border-opacity-[1px]' : ''}
                ${(allowInputText) ? 'cursor-text' : 'cursor-pointer'}
                ${disabled ? 'pointer-events-none bg-gray-25' : ''}
            `}
        >
            { /* renderValue */ }
            {(renderValue && !isLoading) ? (
                <div
                    className={`w-full flex items-center pl-3 pr-2.5 py-2 text-base overflow-hidden ${renderedValueWrapperClassName || ''}`}
                    onClick={() => handleClick()}
                >
                    <span className={`mr-2 flex-grow whitespace-nowrap overflow-hidden ${renderedValueInnerWrapperClassName || ''}`}>
                        {renderValue()}
                    </span>
            
                    <AngleDownSolidIcon className={`w-4 h-4 ${arrowIconClassName || ''}`} />
                </div>
            ) : ''}

            { /* not renderValue and allowInputText is true */}
            {(!renderValue && allowInputText && !isLoading) && (
                <div className={`w-full flex items-center pl-3 pr-2.5 py-2 text-base overflow-hidden ${renderedValueWrapperPlaceholderClassName || ''}`}>
                    <input
                        type="text"
                        className={`mr-2 flex-grow whitespace-nowrap outline-none ${renderedValueInnerWrapperPlaceholderClassName || ''}`}
                        placeholder={placeholder || 'Select'}
                        onClick={() => handleClick()}
                        value={fieldText}
                        onChange={handleFieldTextOnChange}
                    />
                    <AngleDownSolidIcon
                        className={`
                            w-4 h-4
                            ${arrowIconClassName || ''}
                            ${(isPopupShown) ? 'text-[#666]' : 'text-gray-150'}
                        `}
                    />
                </div>
            )}

            { /* not renderValue and has selected option */ }
            {(!renderValue && selected !== undefined && !!options[selected.toString()] && !allowInputText && !isLoading && (
                <div
                    className={`w-full flex items-center pl-3 pr-2.5 py-2 text-base overflow-hidden ${renderedValueWrapperClassName || ''}`}
                    onClick={() => handleClick()}
                >
                    <span className={`mr-2 flex-grow whitespace-nowrap overflow-hidden ${renderedValueInnerWrapperClassName || ''}`}>
                        {options[selected.toString()]}
                    </span>
            
                    <AngleDownSolidIcon className={`w-4 h-4 ${arrowIconClassName || ''}`} />
                </div>
            ))}

            { /* not renderValue and default option */ }
            {(!renderValue && (selected === undefined || !hasProp(options, selected.toString())) && !allowInputText && !isLoading && (
                <div
                    className={`w-full flex items-center text-gray-150 pl-3 pr-2.5 py-2 text-base overflow-hidden ${renderedValueWrapperPlaceholderClassName || ''}`}
                    onClick={() => handleClick()}
                >
                    <span className={`mr-2 flex-grow whitespace-nowrap overflow-hidden ${renderedValueInnerWrapperPlaceholderClassName || ''}`}>
                        {placeholder || 'Select'}
                    </span>
                    
                    <AngleDownSolidIcon className={`w-4 h-4 ${arrowIconClassName || ''}`} />
                </div>
            ))}

            {(isLoading && (
                <div
                    className={`w-full flex items-center text-gray-150 pl-3 pr-2.5 py-2 text-base overflow-hidden ${renderedValueWrapperPlaceholderClassName || ''}`}
                >
                    <span className={`mr-2 flex-grow whitespace-nowrap overflow-hidden ${renderedValueInnerWrapperPlaceholderClassName || ''}`}>
                        Loading...
                    </span>
                    
                    <CircleLoaderIcon className="inline-block w-4 h-4 animate-spin text-gray-150" />
                </div>
            ))}

            { /* popup section */ }
            {(isPopupShown) && (
                <>
                    {(allChildren.length > 0) ? (
                        <div
                            className={`
                                absolute z-10 top-[calc(100%+4px)] max-h-[200px] overflow-y-auto px-2 py-2 
                                rounded-lg border border-solid border-gray-200 bg-white w-full
                                ${popupWrapperClassName || ''}
                            `}
                        >
                            {allChildren}
                        </div>
                    ) : (
                        <div
                            className={`
                                absolute z-10 top-[calc(100%+4px)] max-h-[200px] overflow-y-auto px-2 py-2 
                                rounded-lg border border-solid border-gray-200 bg-white w-full
                                ${popupWrapperClassName || ''}
                            `}
                        >
                            No records found
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
