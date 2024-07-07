import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
    href: string;
    label: string;
}

const NavButton = ({ href, label }: NavButtonProps) => {
    const pathname = usePathname();

    if (pathname === href) {
        return (
            <a className="relative mx-2 cursor-default text-app-accent opacity-60">
                {label}
            </a>
        );
    } else {
        return (
            <Link
                href={href}
                className="relative mx-2 text-app-accent transition-all duration-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-app-accent after:transition-transform after:duration-500 after:ease-out hover:opacity-60 hover:after:origin-bottom-left hover:after:scale-x-100 pb-1"
            >
                {label}
            </Link>
        );
    }
};

export default NavButton;
