import { useEffect, useRef } from 'react';

export default function useClickoutside(handler: () => void) {
    const domNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const maybeHandler = (event: MouseEvent) => {
            if (domNode.current && !domNode.current.contains(event.target as Node)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    }, []);

    return domNode;
}
