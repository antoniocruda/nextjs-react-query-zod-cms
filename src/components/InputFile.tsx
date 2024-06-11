import CloudArrowUpSolidIcon from '@/icons/CloudArrowUpSolidIcon';
import XMarkSolidIcon from '@/icons/XMarkSolidIcon';
import {
    ChangeEvent,
    useEffect,
    useRef,
    useState
} from 'react';

type Props = {
    className?: string;
    onChange: (file: File|null) => void;
    value: string;
    onRemove: (remove: boolean|null) => void;
    accept?: string;
    hideRemoveButton?: boolean;
};

export default function InputFile({
    className,
    onChange,
    value,
    onRemove,
    accept,
    hideRemoveButton
}: Props) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState(value);

    useEffect(() => {
        if (inputFileRef.current && accept) {
            inputFileRef.current.accept = accept;
        }
    }, [inputFileRef.current]);

    const handleClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
            onChange(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFileName('')
        onChange(null);
        onRemove(true);
    };
    
    return (
        <>
            <div
                className={`rounded-xl w-full flex justify-between gap-x-2 border border-gray-200 text-gray-200 px-3 py-2 cursor-pointer ${className || ''}`}
                onClick={() => handleClick()}
            >
                <div className="flex items-center gap-x-2">
                    <CloudArrowUpSolidIcon className="w-7 h-7"/>
                    <div
                        className={`
                            w-[180px] overflow-hidden text-ellipsis whitespace-nowrap
                            ${(fileName !== '') ? 'text-black' : ''}
                        `}
                    >
                        {(fileName !== '') ? fileName : 'Choose File'}
                    </div>
                </div>
                
                {(fileName && !hideRemoveButton) && (
                    <button
                        className="hover:text-black"
                        onClick={(e) => {
                            handleRemoveFile();
                            e.stopPropagation();
                        }}
                        type="button"
                    >
                        <XMarkSolidIcon className="w-5 h-5" />
                    </button>
                )}
            </div>

            <input
                ref={inputFileRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={onFileChange}
            />
        </>
    );
}