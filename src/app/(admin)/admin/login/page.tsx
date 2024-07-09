'use client';
import { loginSchema } from '@/features/validations/admin/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
    const { data: session, status } = useSession();
    const [resError, setResError] = useState<Error>();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    //セッション判定
    if (session) {
        console.log('hoge');
        redirect('/admin');
    }

    const handleLogin = async (data: any) => {
        const email = data.email;
        const password = data.password;
        const res = await fetch('/api/admin/login', {
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            },
            method: 'POST',
        });
        if (res.ok) {
            signIn('credentials', { email: email, password: password });
        } else {
            const resError = await res.json();
            setResError(resError.errors);
        }
    };
    return (
        <>
            <div className="flex h-screen w-full flex-col items-center justify-center text-sm">
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 p-10">
                    <p className="mb-5 text-2xl font-bold">ログイン画面</p>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-4 text-xs font-bold text-red-400">
                            {resError as React.ReactNode}
                        </div>
                        <label htmlFor="email">
                            <p>メールアドレス</p>
                            <input
                                type="text"
                                id="email"
                                {...register('email')}
                                className=" mb-2 h-[35px] w-[300px] border-2 px-2"
                            />
                            <div className="mb-2 text-xs font-bold text-red-400">
                                {errors.email?.message as React.ReactNode}
                            </div>
                        </label>
                        <label htmlFor="password">
                            <p>パスワード</p>
                            <input
                                type="password"
                                id="password"
                                {...register('password')}
                                className=" mb-2 h-[35px] w-[300px] border-2 px-2"
                            />
                            <div className="mb-2 text-xs font-bold text-red-400">
                                {errors.password?.message as React.ReactNode}
                            </div>
                        </label>
                        <button
                            type="submit"
                            className="mt-2 h-[35px] w-[300px] bg-gray-700 text-white"
                        >
                            ログイン
                        </button>
                    </form>
                    <hr className="my-4 w-[300px] border-gray-300" />
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => {
                                signIn('github');
                            }}
                            className="mb-2 h-[35px] w-[300px] border-2 bg-white text-black"
                        >
                            Githubでログイン
                        </button>
                        <button
                            onClick={() => {
                                signIn('google');
                            }}
                            className="mb-2 h-[35px] w-[300px] border-2 bg-white text-black"
                        >
                            Googleでログイン
                        </button>
                        <Link href="/admin/register" className="mt-2">
                            新規登録はこちら
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
