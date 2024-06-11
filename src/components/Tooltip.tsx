import CircleExclamationSolidIcon from '@/icons/CircleExclamationSolidIcon';
import CircleQuestionSolidIcon from '@/icons/CircleQuestionSolidIcon';

type IconType = 'exclamation' | 'question';

type Props = {
    className?: string;
    messageClassName?: string;
    messageCaretClassName?: string;
    iconClassName?: string;
    iconType?: IconType;
    texts: string|string[];
};

export default function Tooltip({
    className,
    iconClassName,
    messageClassName,
    messageCaretClassName,
    texts,
    iconType = 'exclamation'
}: Props) {
    return (
        <div className={`group relative ${className || ''}`}>
            <div className="rounded-full cursor-pointer">
                {(iconType === 'exclamation') && (
                    <CircleExclamationSolidIcon
                        className={`w-5 h-5 text-red-100 ${iconClassName || ''}`}
                    />
                )}
                {(iconType === 'question') && (
                    <CircleQuestionSolidIcon
                        className={`w-5 h-5 text-red-100 ${iconClassName || ''}`}
                    />
                )}
            </div>
            <div className={`
                absolute w-[200px] bg-green-100 rounded-lg p-2 z-[1]
                hidden group-hover:!block
                bottom-[calc(100%+10px)]
                right-[calc(100%-28px)] md:left-[calc(50%)]
                md:-translate-x-[50%]
                ${messageClassName || ''}
            `}>
                <span
                    className={`
                        absolute w-0 h-0
                        border-t-[6px] border-t-green-100 border-x-[6px] border-x-transparent border-solid
                        top-[calc(100%)]
                        right-[12px] md:left-[calc(50%-6px)]
                        ${messageCaretClassName || ''}
                    `}
                />
                <div className="text-white text-xs leading-tight">
                    {(typeof texts === 'object') && (
                        <ul className="ml-4 flex flex-col gap-2">
                            {texts.map((text, idx) => (
                                <li key={idx} className="list-disc">{text}</li>
                            ))}
                        </ul>
                    )}

                    {(typeof texts === 'string') && (
                        <>{texts}</>
                    )}
                </div>
            </div>
        </div>
    );
}