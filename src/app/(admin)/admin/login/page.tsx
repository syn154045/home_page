'use client';
import AuthInput from '@/components/admin/elements/inputs/_authInput';
import { loginSchema } from '@/features/validations/admin/loginSchema';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Error {
    email: [];
    password: [];
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
        resolver: zodResolver(loginSchema),
    });

    //セッション判定
    if (session) {
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

    // password visible
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const togglePass = () => {
        setIsVisiblePass(!isVisiblePass);
    };

    return (
        <>
            <div className="flex h-full w-screen flex-col items-center justify-center pt-20 tablet:h-screen tablet:overflow-y-hidden tablet:pt-0">
                <div className="flex items-center text-center text-3xl font-semibold tablet:text-4xl">
                    <FontAwesomeIcon icon={faFeatherPointed} />
                    <p className="pl-5">Log in</p>
                </div>
                <div className="mt-6 w-[95%] max-w-2xl">
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="relative w-full"
                    >
                        <div className="h-4 text-sm text-elem-alert">
                            {resError as ReactNode}
                        </div>
                        <div className="relative mt-8">
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
                        <div className="relative mt-8">
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
                            <div className="absolute -top-5 right-8 text-sm ">
                                <Link
                                    href="/admin/forgot-password"
                                    className="transition-all duration-300 hover:border-b hover:border-admin-text-main hover:opacity-60"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        {/* submit button */}
                        <div className="mx-auto mt-8 flex w-4/5 flex-col">
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-admin-accent p-2 transition-opacity duration-300 hover:bg-admin-accent/80 focus:bg-admin-accent/80 focus:outline-none"
                            >
                                Log in
                            </button>
                            {/* onClick=() => {signIn('google')} */}
                            <button
                                disabled
                                className="mt-5 w-full rounded-lg bg-admin-accent p-2"
                            >
                                Log in with google
                                <span className="text-xs text-admin-text-sub">
                                    (* Oops! not implemented...)
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 pb-10 tablet:pb-0">
                    <Link
                        href="/admin/register"
                        className="text-sm transition-all duration-300 hover:border-b hover:border-admin-text-main hover:opacity-60"
                    >
                        Signup Here.
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
