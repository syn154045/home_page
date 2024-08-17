'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface QueryParamProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmail = ({ params, searchParams }: QueryParamProps) => {
    // const search = useLocation().search;
    // const query = new URLSearchParams(search);
    const token = searchParams.token;
    const email = searchParams.email;
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        if (token) {
            axios
                .post('/api/admin/verify-email', { token, email })
                .then((response) => {
                    setStatus('verified');
                })
                .catch((error) => {
                    console.log(error);

                    setStatus('error');
                });
        }
    }, [token]);

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
