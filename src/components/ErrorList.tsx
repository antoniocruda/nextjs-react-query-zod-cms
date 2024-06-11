import CircleExclamationSolidIcon from '@/icons/CircleExclamationSolidIcon';

type Props = {
    errors: string[];
};

export default function ErrorList({ errors }: Props) {
    return (
        <>
            {(errors.length > 0) && (
                <ul className="flex flex-col gap-y-2 text-sm rounded-lg p-4 pl-10 w-full mb-4 bg-red-100 border border-solid border-red-700 text-red-700">
                    {errors.map((err, idx) => (
                        <li
                            key={idx}
                            className="flex gap-3"
                        >
                            <span className="-ml-6">
                                <CircleExclamationSolidIcon className="w-5 h-5"/>
                            </span>
                            <span>{err}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
