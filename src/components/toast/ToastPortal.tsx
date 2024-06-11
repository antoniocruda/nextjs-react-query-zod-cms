import { createPortal } from 'react-dom';

type Props = {
    children?: JSX.Element | JSX.Element[] | string | number;
}

export default function ToastPortal({
    children
}: Props) {
    return createPortal(children, document.body);
}
