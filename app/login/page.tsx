'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../contexts/authContext";

export default function Login() {
    const router = useRouter();
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    if (user) {
        router.replace('/');
        return;
    }

    const handleLogin = () => {
        if (!email || !password) {
            //todo add toast
        }
        setUser({
            email,
            name: email.split('@')[0],
        })
        router.replace('/');
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Logo do site */}
                <div className="flex justify-center mb-8">
                    <Image src="/logo.png" width={100} height={100} alt="Site Logo" />
                </div>

                {/* Inputs de login */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none transition ${emailFocused ? 'ring-2 ring-[--primary] border-transparent' : 'border-gray-300'
                                }`}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none transition ${passwordFocused ? 'ring-2 ring-[--primary] border-transparent' : 'border-gray-300'
                                }`}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                    </div>

                    {/* Botão de login */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[--primary] text-white rounded-md border-[--background] border-2 hover:bg-[--background] hover:text-[--primary] hover:border-[--primary] transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}   