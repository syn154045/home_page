import { JSX, ReactNode } from 'react';

interface BodyProps {
  title: string;
  children: ReactNode;
}

export const Body = ({ title, children }: BodyProps): JSX.Element => {
  return (
    <div className="mt-16">
      <div className="mx-auto w-[95%] max-w-5xl">
        <div className="text-3xl tracking-widest">
          <h1>{title}</h1>
          <div className="mt-2 h-0.5 bg-gradient-to-r from-app-accent2 to-transparent to-80%" />
        </div>
        <section className="mt-20">{children}</section>
      </div>
    </div>
  );
};
