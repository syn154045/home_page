import { MouseEventHandler } from 'react';

interface BProps {
    clickAction: MouseEventHandler<HTMLButtonElement>;
    label: String;
}

const BButton = ({ clickAction, label }: BProps) => {
    return <button onClick={clickAction}>{label}</button>;
};

export default BButton;
