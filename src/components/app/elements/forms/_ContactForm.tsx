'use client';

import {
    ContactSchema,
    ContactFormType,
} from '@/features/validations/app/contactSchema';
import { emailAtom, isSubmittedAtom } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ContactInput } from '../inputs';
import { TailSpin } from 'react-loader-spinner';

interface FormData {
    name: string;
    company: string;
    email: string;
    content: string;
}
// input
const InputField: Array<{
    id: keyof FormData;
    inputType: string;
    label: string;
    placeholder: string;
    required: boolean;
}> = [
    {
        id: 'name',
        inputType: 'text',
        label: 'お名前',
        placeholder: '京都　舞子',
        required: true,
    },
    {
        id: 'company',
        inputType: 'text',
        label: '会社名',
        placeholder: '株式会社　京都',
        required: false,
    },
    {
        id: 'email',
        inputType: 'text',
        label: 'メールアドレス',
        placeholder: 'kyoto@example.com',
        required: true,
    },
    {
        id: 'content',
        inputType: 'textarea',
        label: 'お問い合わせ内容',
        placeholder: '内容を記入ください',
        required: true,
    },
];

const ContactForm = () => {
    const router = useRouter();
    const [, setIsSubmitted] = useAtom(isSubmittedAtom);
    const [, setEmail] = useAtom(emailAtom);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string | null>(null);

    // input form
    const methods = useForm<ContactFormType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: '',
            company: '',
            email: '',
            content: '',
        },
    });
    const {
        register,
        formState: { errors, isValid },
        watch,
        handleSubmit,
        reset,
    } = methods;

    // 初期のメッセージを非表示
    const [isInputed, setIsInputed] = useState(false);
    const watchFields = watch(['name', 'company', 'email', 'content']);
    useEffect(() => {
        if (Object.values(watchFields).some((value) => value !== '')) {
            setIsInputed(true);
        }
    }, [watchFields]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
                method: 'POST',
            });
            if (res.ok) {
                // jotai update
                setIsSubmitted(true);
                setEmail(data.email);
                reset();
                setLoading(false);
                router.push('/contact/thanks');
            } else {
                setLoading(false);
                const resErr = await res.json();
                setErrMessage(resErr.errors || resErr.message);
            }
        } catch (error) {
            console.error('error : ', error);
            setLoading(false);
            setErrMessage(
                'お問い合わせ送信中にエラーが発生しました。お手数ですが再試行してください。',
            );
        }
    };

    return (
        <>
            <div className="h-4">
                {errMessage && (
                    <div className="text-sm text-elem-alert">
                        *! {errMessage}
                    </div>
                )}
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        {InputField.map((i) => (
                            <ContactInput
                                key={i.id}
                                inputId={i.id}
                                inputType={i.inputType}
                                label={i.label}
                                placeholder={i.placeholder}
                                register={register(i.id)}
                                required={i.required}
                                errMessage={errors[i.id]?.message}
                            />
                        ))}
                    </div>
                    <div className="relative mx-auto mt-20 h-12 w-1/2 max-w-80 cursor-pointer rounded-xl border-2 border-app-accent2 tablet:w-1/4">
                        <button
                            type="submit"
                            className="group size-full transition-colors duration-300 hover:bg-app-accent2/10 focus:bg-app-accent2/10 focus:outline-none"
                        >
                            {loading && (
                                <div className="absolute inset-y-0 left-2 my-auto h-6 sm:left-4 lg:left-10">
                                    <TailSpin
                                        visible={true}
                                        height="24"
                                        width="24"
                                        color="#C5C5C5"
                                        ariaLabel="tail-spin-loading"
                                        radius="0.5"
                                        wrapperClass=""
                                        wrapperStyle={{}}
                                    />
                                </div>
                            )}
                            <p className="tracking-wider transition-opacity duration-300 group-hover:opacity-80 group-focus:opacity-80">
                                {loading ? '送信中...' : '送信'}
                            </p>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default ContactForm;
