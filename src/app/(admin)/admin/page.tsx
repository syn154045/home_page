'use client';
import * as Layout from '@/components/admin/layouts';
import { useSession } from 'next-auth/react';

const Main = () => {
    const { data: session, status } = useSession();
    // TODO:
    /**
     * - 時間帯によって、テキストを変更（おはよう/こんにちは/こんばんは）
     * - h1タグ文字がひとつずつ表示 -> h2以下のコンテンツをまとめてフェードイン
     * - 
     */

    return (
        <>
            <Layout.Header />
            <div className='mt-16 mx-auto w-[95%] max-w-5xl'>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold">
                        こんにちは
                    </h1>
                    <h2 className='mt-10'>
                        管理者画面へようこそ。
                    </h2>
                    {status === 'unauthenticated' && (
                        <div className=''>
                            ログインしていないので、コンテンツ編集できません。
                        </div>
                    )}
                    {status === 'authenticated' && (
                        <div className=''>
                            blog...
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;
