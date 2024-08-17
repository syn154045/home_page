'use client';

import { Body } from '@/components/app/layouts';
import { emailAtom, isSubmittedAtom } from '@/store';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Thanks = () => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useAtom(isSubmittedAtom);
    const [email] = useAtom(emailAtom);
    console.log(isSubmitted);

    // contact送信後のみに表示
    useEffect(() => {
        if (!isSubmitted) {
            router.replace('/contact');
        }
    }, [isSubmitted, router]);

    // ページ遷移時にisSubmittedAtomを無効化
    useEffect(() => {
        const handleClick = (event: Event) => {
            const target = event.target as HTMLAnchorElement;
            const url = target.getAttribute('href');
            setIsSubmitted(false);
        };

        const links = document.querySelectorAll('a');

        links.forEach((link) => {
            link.addEventListener('click', handleClick);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener('click', handleClick);
            });
        };
    }, [setIsSubmitted]);

    return (
        <Body title="CONTACT">
            {isSubmitted && (
                <div className="font-thin tracking-wider">
                    <div>お問い合わせありがとうございました。</div>
                    <div className="mt-4">
                        お送りいただきました内容を確認のうえ、３〜４日程度で折り返しご連絡させていただきます。
                    </div>
                    <div>
                        また、記入いただいたメールアドレス：
                        <span className='px-2 font-medium text-elem-info'>{email}</span>
                        へ、自動返信の確認メールをお送りいたしました。
                    </div>
                    <div className="mt-20 text-center text-sm font-medium text-app-accent2">
                        <Link
                            href={'/'}
                            className="rounded-xl border border-app-accent2 px-6 py-2 transition-all duration-300 hover:bg-app-accent2/30 hover:opacity-80"
                        >
                            TOPページへ戻る
                        </Link>
                    </div>
                    <div className="mt-20">
                        なお、しばらく経ってもメールが届かない場合は、入力いただいたメールアドレスが誤っているか、迷惑メールフォルダに振り分けられている可能性があります。
                    </div>
                    <div className="mt-8">
                        以上の内容をご確認のうえ、お手数ですがもう一度フォームよりお問い合わせいただきますようお願いいたします。
                    </div>
                </div>
            )}
        </Body>
    );
};

export default Thanks;
