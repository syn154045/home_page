// src/app/admin/verify/[token]/page.tsx

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const router = useRouter();
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const token = query.get('token');
    const email = query.get('email');
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        if (token) {
            axios.post('/api/admin/verify-email', { token, email })
                .then(response => {
                    setStatus('verified');
                })
                .catch(error => {
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
