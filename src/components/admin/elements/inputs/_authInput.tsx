'use client';

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


interface AuthInputProps {
    inputId: string,
    inputType: string,
    label: string,
}

const AuthInput = ({ inputId, inputType, label }: AuthInputProps) => {
    const [isPass, setIsPass] = useState(false);
    const [isPassVisible, setIsPassVisible] = useState(false);
    
    useEffect(() => {
        if (inputType === 'password') {
            setIsPass(true);
        }
    }, [inputType]);
    const togglePass = () => {
        setIsPassVisible(!isPassVisible);
    }
    
    return (
        <div className="relative">
            <input
                id={inputId}
                name={inputId}
                type={!isPass ? inputType : (!isPassVisible ?  inputType : 'text')}
                required
                className="peer p-2 w-full outline-none bg-transparent placeholder:text-transparent"
                placeholder={label}
            />
            <div className="h-[0.125rem] bg-admin-main peer-focus:bg-gradient-to-r peer-focus:from-admin-text-main transition-all duration-300" />
            <label
                htmlFor={inputId}
                className="block absolute -top-3 cursor-none text-sm transition-all duration-500 peer-focus:text-admin-text-main peer-focus:-top-3 peer-focus:text-sm peer-focus:transition-all peer-focus:duration-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:cursor-text"
            >
                {label}
            </label>
            {isPass && (
                <span onClick={togglePass} role="presentation" className="absolute top-2.5 right-5 cursor-pointer">
                    {isPassVisible ? (
                        <FontAwesomeIcon icon={faEye} />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </span>
            )}
        </div>
    )
}

export default AuthInput;
