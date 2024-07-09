'use client';
import { signUpSchema } from '@/features/validations/admin/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Error {
    email: [];
    password: [];
    passwordConfirm: [];
}

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
        resolver: zodResolver(signUpSchema),
    });

    //セッション判定
    if (session) redirect('/admin');

    //登録処理
    const handleRegist = async (data: any) => {
        //フォーム取得
        const email = data.email;
        const password = data.password;
        const res = await fetch('/api/admin/register', {
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
                    <p className="mb-5 text-2xl font-bold">アカウント登録</p>
                    <form
                        onSubmit={handleSubmit(handleRegist)}
                        className="flex flex-col items-center"
                    >
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
                                {resError?.email?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
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
                                {resError?.password?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </label>
                        <label htmlFor="passwordConfirm">
                            <p>再確認パスワード</p>
                            <input
                                type="password"
                                id="passwordConfirm"
                                {...register('passwordConfirm')}
                                className=" mb-2 h-[35px] w-[300px] border-2 px-2"
                            />
                            <div className="mb-2 text-xs font-bold text-red-400">
                                {
                                    errors.passwordConfirm
                                        ?.message as React.ReactNode
                                }
                                {resError?.passwordConfirm?.map(
                                    (error, index) => (
                                        <p key={index}>{error}</p>
                                    ),
                                )}
                            </div>
                        </label>
                        <button
                            type="submit"
                            className="my-2 h-[35px] w-[300px] bg-gray-700 text-white"
                        >
                            登録
                        </button>
                    </form>
                    <Link href="/admin/login" className="mt-2">
                        ログインはこちら
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
