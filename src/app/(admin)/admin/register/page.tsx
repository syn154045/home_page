'use client';
import AuthInput from '@/components/admin/elements/inputs/_authInput';
import { signUpSchema } from '@/features/validations/admin/loginSchema';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Error {
    name: [];
    email: [];
    password: [];
    passwordConfirm: [];
}

const Page = () => {
    const { data: session, status } = useSession();
    const [resError, setResError] = useState<Error>();
    const router = useRouter();

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
            // signIn('credentials', { email: email, password: password });
            router.push('/admin');
        } else {
            const resError = await res.json();
            setResError(resError.errors);
        }
    };
    return (
        <>
            <div className="flex h-full w-screen flex-col items-center justify-center pt-20 tablet:h-screen tablet:overflow-y-hidden tablet:pt-0">
                <div className="flex items-center text-center text-3xl font-semibold tablet:text-4xl">
                    <FontAwesomeIcon icon={faCrow} />
                    <p className="pl-5">Sign Up</p>
                </div>
                <div className="mt-6 w-[95%] max-w-2xl">
                    <form
                        onSubmit={handleSubmit(handleRegist)}
                        className="relative w-full"
                    >
                        <div className="mt-8">
                            <AuthInput
                                inputId="name"
                                inputType="text"
                                label="Name"
                                register={register('name')}
                            />
                            <div className="h-4 text-sm text-elem-alert">
                                {errors.name?.message as ReactNode}
                                {resError?.name?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <AuthInput
                                inputId="email"
                                inputType="email"
                                label="Email"
                                register={register('email')}
                            />
                            <div className="h-4 text-sm text-elem-alert">
                                {errors.email?.message as ReactNode}
                                {resError?.email?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <AuthInput
                                inputId="password"
                                inputType="password"
                                label="Password"
                                register={register('password')}
                            />
                            <div className="h-4 text-sm text-elem-alert">
                                {errors.password?.message as ReactNode}
                                {resError?.password?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8">
                            <AuthInput
                                inputId="passwordConfirm"
                                inputType="password"
                                label="Password confirm"
                                register={register('passwordConfirm')}
                            />
                            <div className="h-4 text-sm text-elem-alert">
                                {errors.passwordConfirm?.message as ReactNode}
                                {resError?.passwordConfirm?.map(
                                    (error, index) => (
                                        <p key={index}>{error}</p>
                                    ),
                                )}
                            </div>
                        </div>
                        {/* submit button */}
                        <div className="mx-auto mt-8 flex w-4/5 flex-col">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-admin-accent p-2 transition-opacity duration-300 hover:bg-opacity-80 focus:bg-opacity-80 focus:outline-none"
                            >
                                Sign Up
                            </button>
                            <button
                                disabled
                                className="mt-5 w-full rounded-lg bg-admin-accent p-2"
                            >
                                Sign Up with google
                                <span className="text-xs text-admin-text-sub">
                                    (* Oops! not implemented...)
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 pb-10 tablet:pb-0">
                    <Link
                        href={'/admin/login'}
                        className="text-sm text-admin-text-main transition-all duration-300 hover:border-b hover:border-admin-text-main hover:opacity-60"
                    >
                        Login Here.
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
