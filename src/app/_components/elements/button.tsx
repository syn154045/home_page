import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const Button = ({ children, ...props }:ButtonProps) => {
    return (
        <button className="" {...props}>
            {children}
        </button>
    );
};
