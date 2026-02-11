"use client"
import { baseUrl } from '@/utils/baseUrl';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("emran@gmail.com");
    const [password, setPassword] = useState("123456");





    const handleLogin = async (data: any) => {
        try {
            const response = await fetch(`${baseUrl}/loginUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message)
            }

            Cookies.set('auth', result.data);
            router.push("/");

        } catch (error: any) {
            console.log(error.message)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = { email, password };
        handleLogin(data);
    }

    return (
        <div className='mainbg max-w-7xl mx-auto flex justify-center items-center min-h-screen'>

            <div className="w-[90%] md:w-130 p-4 bg-[#00000094] flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full shadow-2xl flex flex-col gap-y-5">
                    <div>
                        <label htmlFor="" className='text-white'>Email:</label><br />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            type="text"
                            placeholder="example@gmail.com"
                            className="input input-success w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className='text-white'>Password:</label><br />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            type="password"
                            placeholder="........"
                            className="input input-success w-full"
                        />
                    </div>
                    <div>
                        <button type='submit' className="btn btn-success w-full">Log In</button>
                    </div>
                    <p className='text-sm text-white'>If no account yet - <Link className='text-orange-500 underline' href="/register">Register</Link></p>
                </form>
            </div>
        </div>
    )
}
