'use client';
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "~/auth";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [isProceeding, setIsProceeding] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    
    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsProceeding(true);
            
            const dat = { email, password };
            const res = await signIn('credentials', { ...dat, redirect: false });
            
            if (res?.error) throw new Error(res.error);
            
            router.push('/admin/dashboard');
        } catch (error) {
            console.error('error has occured : ', error);
            setError(true);
        } finally {
            setIsProceeding(false);
        }
    };
    
    const handleClose = () => {
        setError(false);
    }
    
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div >
                
            </div>
        </div>
    );
};

export default Login