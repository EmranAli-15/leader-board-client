"use client"

import { Helix } from '@/helixFetch/helixFetch';
import { BackIcon, LogOutIcon } from '@/ui/Icons';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useAuthContext } from '@/contextApi/AuthContext';
import { useRouter } from 'next/navigation';

export default function page() {
    const { setLoading: setContextLoading } = useAuthContext();
    const router = useRouter();

    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(true);



    const handleLogOut = () => {
        Cookies.remove("auth");
        setContextLoading(true);
        router.push("/");
    };

    useEffect(() => {
        const fn = async () => {
            const { success, result } = await Helix.query("/getAllUser");
            if (success) {
                setData(result.data);
                setIsError(false);
            }
            setIsLoading(false);
        }

        fn();
    }, []);

    return (
        <div className='w-full min-h-screen mainbg'>

            <div className='flex justify-between bg-[#15db2559] p-2'>
                <Link href="/">
                    <div className='flex gap-1 items-center text-white'>
                        <BackIcon w={30}></BackIcon>
                        <p className='text-[16px]'>Home</p>
                    </div>
                </Link>
                <button onClick={handleLogOut} className='text-2xl text-white cursor-pointer'>
                    <div className='flex gap-1 items-center'>
                        <p className='text-[16px]'>Log out</p>
                        <LogOutIcon w={30}></LogOutIcon>
                    </div>
                </button>
            </div>

            <div className='max-w-7xl mx-auto px-2'>
                {
                    !isError && !isLoading && <table className='w-full'>
                        <thead>
                            <tr className='text-white'>
                                <th>Name</th>
                                <th>Photo</th>
                                <th>View</th>
                                <th>Update mark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((user: any, idx: any) => {
                                    return (
                                        <tr className='pt-2 border border-red-500' key={idx}>
                                            <td><span className='text-white'>{user.name}</span></td>
                                            <td className='flex justify-center'>
                                                <Image className='h-12 w-10 object-cover' src={user.photo} width={100} height={100} alt={user.name}></Image>
                                            </td>
                                            <td className='text-center'>
                                                <Link href={`/admin-add/${user._id}`}>
                                                    <button className='btn btn-xs btn-secondary'>Go inside</button>
                                                </Link>
                                            </td>
                                            <td className='text-center'>
                                                <button className='btn btn-xs btn-warning'>Update</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}
