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
};

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
    
    // password visible
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const togglePass = () => {
        setIsVisiblePass(!isVisiblePass);
    };
    
    return (
        <>
            <div className="w-screen h-full pt-20 tablet:pt-0 tablet:h-screen tablet:overflow-y-hidden flex flex-col justify-center items-center">
                <div className="flex items-center text-3xl tablet:text-4xl font-semibold text-center">
                    <FontAwesomeIcon icon={faFeatherPointed} />
                    <p className="pl-5">Log in</p>
                </div>
                <div className="mt-6 w-[95%] max-w-2xl">
                    <form onSubmit={handleSubmit(handleLogin)} className="relative w-full">
                        <div className='h-4 text-sm text-elem-alert'>
                            { resError as ReactNode }
                        </div>
                        <div className="relative mt-8">
                            <AuthInput inputId='email' inputType='email' label='Email' register={register('email')} />
                            <div className='h-4 text-sm text-elem-alert'>
                                {errors.email?.message as ReactNode}
                                {resError?.email?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div className="relative mt-8">
                            <AuthInput inputId='password' inputType='password' label='Password' register={register('password')} />
                            <div className='h-4 text-sm text-elem-alert'>
                                {errors.password?.message as ReactNode}
                                {resError?.password?.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                        {/* submit button */}
                        <div className="w-4/5 mx-auto mt-8 flex flex-col">
                            <button
                                type="submit"
                                className="w-full bg-admin-accent p-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80 transition-opacity duration-300"
                            >
                                Log in
                            </button>
                            {/* onClick=() => {signIn('google')} */}
                            <button
                                disabled
                                className='w-full bg-admin-accent p-2 rounded-lg mt-5'
                            >
                                Log in with google
                                <span className="text-xs text-admin-text-sub">(* Oops! not implemented...)</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 pb-10 tablet:pb-0">
                    <Link href="/admin/register" className='text-sm text-admin-text-main hover:opacity-60 transition-all duration-300 hover:border-b hover:border-admin-text-main'>
                        Signup Here.
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Page;
