"use client"
import Link from 'next/link';
import { FormEvent, useState } from 'react'

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = { email, password };
        console.log(data)
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
