import { JSX } from 'react';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mx-auto mt-10 flex items-center justify-center gap-4 px-5 py-10 text-sm">
      <span>
        synmm <sup>©</sup>
      </span>
      <span>All Rights Reserved.</span>
    </footer>
  );
};
