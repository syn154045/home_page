import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeaderLogo from '~/public/Logo.png';

const Header = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    // TODO:
    /**
     * - ドロップダウンをアニメーション化
     * - phone用のレイアウト
     */
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="sticky top-0 flex h-36 px-5 py-4">
            {/* tablet~ */}
            <div className="my-auto hidden tablet:flex justify-between w-full">
                <Link href={'/admin'} className="self-center rounded-xl">
                    <Image src={HeaderLogo} alt="header" className="max-h-12 w-16 object-contain" />
                </Link>
                <div className="mr-5 relative">
                    {status !== 'loading' && (
                        <button className="border rounded-xl border-admin-accent px-4 py-2" onClick={toggleDropdown}>
                            {session ? session.user?.name : 'user'}
                        </button>
                    )}
                    {isOpen && (
                        <div className="absolute top-10 bg-inherit/50 border border-admin-accent rounded-xl shadow-xl w-32 right-0 px-4 py-3 text-xs text-admin-text-main">
                        {status === 'authenticated' && (
                            <div>
                                <button
                                    onClick={() => {
                                        signOut();
                                        toggleDropdown;
                                    }}
                                    className=""
                                >
                                    サインアウトする
                                </button>
                            </div>
                        )}
                        {status === 'unauthenticated' && (
                            <div className="flex flex-col w-full space-y-3">
                                <Link
                                    href="/admin/login"
                                    onClick={toggleDropdown}
                                    className="block hover:opacity-70"
                                >
                                    ログイン
                                </Link>
                                <Link
                                    href="/"
                                    onClick={toggleDropdown}
                                    className="block hover:opacity-70"
                                >
                                    ユーザー管理
                                </Link>
                            </div>
                        )}
                        
                        </div>
                    )}
                </div>
            </div>
            {/* phone~ */}
        </div>
    );
};

export default Header;
