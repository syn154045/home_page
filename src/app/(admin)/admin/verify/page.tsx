'use client';

import { useEffect, useState } from 'react';

interface QueryParamProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmail = ({ params, searchParams }: QueryParamProps) => {
    // const search = useLocation().search;         // import { useLocation } from 'react-router-dom';
    // const query = new URLSearchParams(search);
    const token = searchParams.token;
    const email = searchParams.email;
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                const res = await fetch('/api/admin/verify-email', {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ token, email }),
                    method: 'POST',
                });

                if (!res.ok) {
                    throw new Error('メールの検証に失敗しました');
                }
                setStatus('verified');
            } catch (error) {
                setStatus('error');
            }
        };

        verify();
    }, [token, email]);

    if (status === 'verifying') {
        return <p>メールアドレスを確認中です...</p>;
    }

    if (status === 'verified') {
        return <p>メールアドレスが確認されました。</p>;
    }

    if (status === 'error') {
        return <p>メールアドレスの確認に失敗しました。</p>;
    }

    return null;
};

export default VerifyEmail;
