'use client';

import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ContactInputProps {
    inputId: string;
    inputType: string;
    label: string;
    placeholder: string;
    register?: UseFormRegisterReturn;
    required: boolean;
    errMessage?: string;
}

const ContactInput = ({
    inputId,
    inputType,
    label,
    placeholder,
    register,
    required,
    errMessage,
}: ContactInputProps) => {
    const [isTextArea, setIsTextArea] = useState(false);

    useEffect(() => {
        if (inputType === 'textarea') {
            setIsTextArea(true);
        }
    }, [inputType]);

    return (
        <>
            <div className="relative mt-4 flex w-full flex-col items-baseline tablet:flex-row">
                <div className="flex w-full items-center tablet:w-1/3 pc:w-1/4">
                    <p className="">{label}</p>
                    {required && (
                        <p className="ml-2 text-nowrap rounded border border-app-accent px-2 py-1 text-xs text-app-accent">
                            必須
                        </p>
                    )}
                </div>
                <div className="w-full tablet:w-2/3 pc:w-3/4">
                    {isTextArea ? (
                        <>
                            <textarea
                                id={inputId}
                                rows={10}
                                className="peer block size-full rounded-t-xl bg-transparent p-2 outline-none transition-all duration-300 focus:bg-app-accent/10"
                                placeholder={placeholder}
                                {...register}
                            ></textarea>
                            <div className="h-0.5 bg-gradient-to-r from-app-accent peer-focus:from-app-accent/50" />
                        </>
                    ) : (
                        <>
                            <input
                                id={inputId}
                                type={inputType}
                                {...register}
                                className="peer w-full rounded-t-xl bg-transparent p-2 outline-none transition-all duration-300 focus:bg-app-accent/10"
                                placeholder={placeholder}
                            />
                            <div className="h-0.5 bg-gradient-to-r from-app-accent peer-focus:from-app-accent/50" />
                        </>
                    )}
                    <div className="mt-1 h-4">
                        {errMessage && (
                            <div className="text-sm text-elem-alert">
                                {errMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInput;
