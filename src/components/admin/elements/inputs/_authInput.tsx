'use client';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps {
    inputId: string;
    inputType: string;
    label: string;
    register: UseFormRegisterReturn;
}

const AuthInput = ({ inputId, inputType, label, register }: AuthInputProps) => {
    const [isPass, setIsPass] = useState(false);
    const [isPassVisible, setIsPassVisible] = useState(false);

    useEffect(() => {
        if (inputType === 'password') {
            setIsPass(true);
        }
    }, [inputType]);
    const togglePass = () => {
        setIsPassVisible(!isPassVisible);
    };

    return (
        <>
            <div className="relative">
                <input
                    id={inputId}
                    type={!isPass ? inputType : !isPassVisible ? inputType : 'text'}
                    {...register}
                    className="peer w-full bg-transparent p-2 outline-none placeholder:text-transparent"
                    placeholder={label}
                />
                <div className="h-0.5 bg-admin-main transition-all duration-300 peer-focus:bg-gradient-to-r peer-focus:from-admin-text-main" />
                <label
                    htmlFor={inputId}
                    className="absolute -top-3 block cursor-none text-sm transition-all duration-500 peer-placeholder-shown:top-3 peer-placeholder-shown:cursor-text peer-placeholder-shown:text-lg peer-focus:-top-3 peer-focus:text-sm peer-focus:text-admin-text-main peer-focus:transition-all peer-focus:duration-500"
                >
                    {label}
                </label>
                {isPass && (
                    <span
                        onClick={togglePass}
                        role="presentation"
                        className="absolute right-5 top-3 cursor-pointer"
                    >
                        {isPassVisible ? (
                            <FontAwesomeIcon icon={faEye} className='w-6 h-6' />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className='w-6 h-6' />
                        )}
                    </span>
                )}
            </div>
        </>
    );
};

export default AuthInput;
