'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Main = () => {
    const { data: session, status } = useSession();

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="m-10 text-3xl font-bold">Next Auth</h1>
                <div className="m-5 flex flex-col items-center">
                    <div className="m-2">ログイン中のユーザー</div>
                    {status === 'loading' ? (
                        <div>loading</div>
                    ) : (
                        <p className="font-bold">{session?.user?.email}</p>
                    )}
                </div>
                {status === 'authenticated' && (
                    <button
                        onClick={() => signOut()}
                        className="rounded-lg bg-red-500 px-3 py-2 text-xs text-white"
                    >
                        サインアウトする
                    </button>
                )}
                {status === 'unauthenticated' && (
                    <Link
                        href="/admin/login"
                        className="rounded-lg bg-red-500 px-3 py-2 text-xs text-white"
                    >
                        ログイン
                    </Link>
                )}
            </div>
        </>
    );
};

export default Main;
