'use client';

import { login } from "@/features/actions/admin/loginAction";
import { useFormState } from "react-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faFeatherPointed } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [errorMessage, dispatch] = useFormState(login, undefined);
    
    // toggle password visibility
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const togglePass = () => {
        setIsVisiblePass(!isVisiblePass);
    }
    
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex items-center text-4xl font-semibold text-center">
                <FontAwesomeIcon icon={faFeatherPointed} />
                <p className="pl-5">Log in</p>
            </div>
            <div className="mt-10 w-[95%] max-w-2xl">
                <form action={dispatch} className="relative w-full">
                    <div className="relative mt-8">
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            autoComplete="email" 
                            required
                            className="peer p-2 w-full outline-none bg-transparent placeholder:text-transparent"
                            placeholder="email"
                        />
                        <div className="h-[0.125rem] bg-admin-main peer-focus:bg-gradient-to-r peer-focus:from-admin-text-main transition-all duration-300" />
                        <label
                            htmlFor="email"
                            className="block absolute -top-3 cursor-none text-sm transition-all duration-500 peer-focus:text-admin-text-main peer-focus:-top-3 peer-focus:text-sm peer-focus:transition-all peer-focus:duration-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:cursor-text"
                        >
                            Email
                        </label>
                        <div className="h-4">
                            {/* error message */}
                        </div>
                    </div>
                    <div className="relative mt-8">
                        <input
                            id="password"
                            name="password"
                            type={isVisiblePass ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            className="peer p-2 w-full outline-none bg-transparent placeholder:text-transparent"
                            placeholder="password"
                        />
                        <div className="h-[0.125rem] bg-admin-main peer-focus:bg-gradient-to-r peer-focus:from-admin-text-main transition-all duration-300" />
                        <label
                            htmlFor="password"
                            className="block absolute -top-3 cursor-none text-sm transition-all duration-500 peer-focus:text-admin-text-main peer-focus:-top-3 peer-focus:text-sm peer-focus:transition-all peer-focus:duration-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-lg peer-placeholder-shown:cursor-text"
                        >
                            Password
                        </label>
                        <span onClick={togglePass} role="presentation" className="absolute top-2.5 right-5 cursor-pointer">
                            {isVisiblePass ? (
                                <FontAwesomeIcon icon={faEye} />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                        </span>
                        <div className="h-4">
                            {/* error message */}
                        </div>
                    </div>
                    <div className="w-4/5 mx-auto mt-8 flex">
                        <button
                            // type="submit"
                            className="w-full bg-admin-accent p-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80 transition-opacity duration-300"
                        >
                            Log in
                        </button>
                    </div>
                </form>
                <div className="flex h-8  items-end space-x-1">
                    {errorMessage && 
                        <p className="text-elem-alert">{errorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;
