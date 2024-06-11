import { createPortal } from 'react-dom';

type Props = {
    children?: JSX.Element | JSX.Element[] | string | number;
}

export default function SelectPortal({
    children
}: Props) {
    return createPortal(children, document.getElementById('portal') as HTMLElement);
};
