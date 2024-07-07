import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HamburgerButtonProps {
    href: string;
    label: string;
}

const HamburgerButton = ({ href, label }: HamburgerButtonProps) => {
    const pathname = usePathname();

    if (pathname === href) {
        return (
            <a className="relative mx-2 cursor-default text-white opacity-60">
                {label}
            </a>
        );
    } else {
        return (
            <Link href={href} className="relative mx-2 text-white transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-500 after:ease-out hover:opacity-60 hover:after:origin-bottom-left hover:after:scale-x-100 pb-1">
                {label}
            </Link>
        );
    }
};

export default HamburgerButton;
