"use client"
import { baseUrl } from '@/utils/baseUrl';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contextApi/AuthContext';
import { Helix } from '@/helixFetch/helixFetch';

export default function LoginPage() {
    const router = useRouter();
    const { setLoading } = useAuthContext();

    const [email, setEmail] = useState("rafiulhasanrifat2002@gmail");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");


    const handleLogin = async (data: any) => {
        setError("");
        const res = await Helix.mutation({
            url: `/loginUser`,
            method: "POST",
            data: data
        });
        if (!res.success) {
            setError(res.error.message);
        }

        if (res.success) {
            if (res.result.data) Cookies.set('auth', res.result.data);
            setLoading(true);
            router.push("/");
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
                {
                    error && <h1 className='text-center text-red-600 mb-3'>{error}</h1>
                }
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
