import { ReactNode } from "react";

interface BodyProps {
    title: string,
    children: ReactNode
};

const Body = ({ title, children }: BodyProps) => {
    return (
        <>
            <div className="text-3xl tracking-widest">
                <h1>{title}</h1>
                <div className="h-[0.125rem] mt-2 bg-gradient-to-r to-80% from-app-accent2 to-transparent" />
            </div>
            <div className="mt-20">
                {children}
            </div>
        </>
    )
}

export default Body;
