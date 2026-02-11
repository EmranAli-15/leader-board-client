"use client"
import Link from 'next/link';
import { FormEvent, useState } from 'react'

export default function RegisterPage() {

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = { name, email, id, password };
        console.log(data)
    }

    return (
        <div className='mainbg max-w-7xl mx-auto flex justify-center items-center min-h-screen'>

            <div className="w-[90%] md:w-130 p-4 bg-[#00000094] flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full shadow-2xl flex flex-col gap-y-5">
                    <div>
                        <label htmlFor="" className='text-white'>Name:</label><br />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            type="text"
                            placeholder="Your name"
                            className="input input-success w-full"
                        />
                    </div>
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
                        <label htmlFor="" className='text-white'>Student ID:</label><br />
                        <input
                            onChange={(e) => setId(e.target.value)}
                            value={id}
                            required
                            type="text"
                            placeholder="CSE2401031000"
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
                        <label htmlFor="" className='text-white'>Confirm password:</label><br />
                        <input
                            onChange={(e) => setConPassword(e.target.value)}
                            value={conPassword}
                            required
                            type="password"
                            placeholder="........"
                            className="input input-success w-full"
                        />
                    </div>
                    <div>
                        <button type='submit' className="btn btn-success w-full">Register</button>
                    </div>
                    <Link className='text-orange-500 text-sm underline' href="/login">Log In</Link>
                </form>
            </div>
        </div>
    )
}
