import Link from 'next/link';

interface NavButtonProps {
    href: string;
    label: string;
}

const NavButton = ({ href, label }: NavButtonProps) => {
    return (
        <Link
            href={href}
            className="relative mx-2 text-app-accent transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-app-accent after:transition-transform after:duration-500 after:ease-out hover:opacity-60 hover:after:origin-bottom-left hover:after:scale-x-100"
        >
            {label}
        </Link>
    );
};

export default NavButton;
