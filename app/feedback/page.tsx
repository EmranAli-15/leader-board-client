"use client"

import { useAuthContext } from '@/contextApi/AuthContext'
import { Helix } from '@/helixFetch/helixFetch';
import { BackIcon } from '@/ui/Icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page() {

    const { user } = useAuthContext();

    const [data, setData] = useState("");
    useEffect(() => {
        const fn = async () => {
            const { result, success } = await Helix.query(`/getSingleFeedback/${user?.userId}`);

            if (success) {
                setData(result?.data?.feedback);
            }
        }

        if (user?.userId) fn();
    }, [user?.userId])

    return (
        <div className='w-full min-h-screen mainbg'>

            <div className='flex justify-between bg-[#15db2559] p-2'>
                <Link href="/profile">
                    <div className='flex gap-1 items-center text-white'>
                        <BackIcon w={30}></BackIcon>
                        <p className='text-[16px]'>Back</p>
                    </div>
                </Link>
            </div>

            <div className='max-w-7xl mx-auto px-2'>
                <h1 className='text-center text-lg text-white underline'>My today's feedback</h1>
                <pre className='text-white my-5'>
                    {data}
                </pre>
            </div>
        </div>
    )
}
