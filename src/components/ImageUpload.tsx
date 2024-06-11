import CloudArrowUpSolidIcon from '@/icons/CloudArrowUpSolidIcon';
import ImageSolidIcon from '@/icons/ImageSolidIcon';
import {
    ChangeEvent,
    MouseEvent,
    useEffect,
    useState,
    useRef,
    useMemo
} from 'react';

const determineDragAndDropCapable = ():boolean => {
    const div = document.createElement('div');
    return (
        (
            ('draggable' in div)
            || ('ondragstart' in div && 'ondrop' in div)
        )
        && 'FormData' in window
        && 'FileReader' in window
    );
};

type ActState = 'none' | 'show' | 'uploading' | 'errored';

type Props = {
    title: string;
    width?: number;
    height?: number;
    src?: string;
    imgAlt?: string;
    onNewImage?: (file:File) => void;
}

function ImageUpload({
    title,
    width,
    height,
    src,
    imgAlt,
    onNewImage
}: Props) {
    const [imageSrc, setImageSrc] = useState(src);
    const [actState, setActState] = useState<ActState>((src && src.length > 0) ? 'show' : 'none');

    const inputFileRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const isDragAndDropCapable = determineDragAndDropCapable();

    const reloadImage = (file:File) => {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                if (reader.result) {
                    setImageSrc(reader.result.toString());
                }
                setActState('show');
            },
            false
        );
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const eventPreventAndStopCb = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const eventDragCb = (e: DragEvent) => {
            if (e.dataTransfer && e.dataTransfer.files.length > 0) {
                if (/\.(jpe?g|png|gif)$/i.test(e.dataTransfer.files[0].name)) {
                    const file = e.dataTransfer.files[0];
                    reloadImage(file);
                    if (onNewImage) {
                        onNewImage(file);
                    }
                }
            }
        };

        if (isDragAndDropCapable) {
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
                if (mainRef.current) {
                    mainRef.current.addEventListener(evt, eventPreventAndStopCb, false);
                }
            });

            if (mainRef.current) {
                mainRef.current.addEventListener('drop', eventDragCb);
            }
        }

        return () => {
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
                if (mainRef.current) {
                    mainRef.current.removeEventListener(evt, eventPreventAndStopCb, false);
                }
            });

            if (mainRef.current) {
                mainRef.current.removeEventListener('drop', eventDragCb);
            }
        }
    }, []);

    const onChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target
            && e.target.files
            && e.target.files.length > 0
        ) {
            reloadImage(e.target.files[0]);
            if (onNewImage) {
                onNewImage(e.target.files[0]);
            }
        }
    };

    const triggerInputFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const calculatedWidth = useMemo(() => {
        const calcHt = height || 0;
        const calcWd = width || 0;

        return ((100 * calcWd) / calcHt);
    }, [height, width]);

    return (
        <div>
            <h2 className="w-full flex bg-gray-25 rounded-t-lg px-4 py-3 items-baseline">
                <span className="font-Montserrat-Bold text-base mr-2">{title}</span>
                <span className="text-xs">({`${width || 200}x${height || 200}`})</span>
            </h2>

            <div className="px-4 py-3 border border-solid border-gray-25 min-h-[50px]">
                <div className="flex gap-4 items-center">
                    <div
                        className="h-[100px] bg-gray-25 rounded-lg flex items-center justify-center"
                        style={{
                            width: calculatedWidth
                        }}
                    >
                        {
                            (actState === 'none') 
                            ? <ImageSolidIcon className="w-[50px] h-[50px] text-gray-100" />
                            : <img className="rounded-lg border"
                                src={imageSrc}
                                width={calculatedWidth}
                                height="100"
                                alt={imgAlt}
                                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                                style={{
                                    height: 100,
                                    width: calculatedWidth
                                }}
                            />
                        }
                        
                    </div>
                    <div
                        ref={mainRef}
                        className="border-4 border-dashed border-gray-100 h-[100px] w-full rounded-lg flex items-center justify-center"
                        style={{
                            width: `calc(100% - ${calculatedWidth}px)`
                        }}
                        onClick={() => inputFileRef.current && inputFileRef.current.click()}
                    >
                        <CloudArrowUpSolidIcon className="w-[60px] h-[60px] mr-2" />
                        <span className="font-Montserrat-Bold mr-1.5">Drag file here or</span>
                        <button
                            onClick={triggerInputFile}
                            className="font-Montserrat-Bold text-red-100"
                        >browse</button>
                    </div>
                </div>
            </div>

            <input
                ref={inputFileRef}
                type="file"
                style={{ display: 'none' }}
                accept="image/png,image/jpeg,image/jpg,image/gif,image/tiff,image/webp"
                onChange={onChangeFile}
            />
        </div>
    );
}

export default ImageUpload;
