"use client"

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAuthContext } from '@/contextApi/AuthContext'
import { useRouter } from 'next/navigation'
import { useMyFetch } from '@/utils/myFetch'
import { useEffect } from 'react'

export default function AboutPage() {
  const router = useRouter();


  const { setLoading, user } = useAuthContext();


  const { data, loading, error } = useMyFetch({
    url: `/getSingleUserScores/${user?.userId}`,
    headers: null,
    wait: user?.userId ? false : true
  })
  console.log(data)



  const handleLogOut = () => {
    Cookies.remove("auth");
    setLoading(true);
    router.push("/");
  };
  // /getSingleUserScores
  return (
    <div className='w-full min-h-screen mainbg'>
      <div className='max-w-7xl mx-auto'>
        <Link href="/" className='text-white text-5xl'>Home</Link>
        <br />
        <br />
        <button onClick={handleLogOut} className='text-2xl text-white cursor-pointer'>
          LogOUT
        </button>

        <div className='w-30'>
          {
            !loading && !error && data && <div>
              {
                data.map((score: any, idx: number) => {
                  return (
                    <div key={idx} className='text-white border p-1 my-1 w-auto'>
                      <p>Day {score.day} : {score.score}</p>
                    </div>
                  )
                })
              }
            </div>
          }
        </div>


      </div>
    </div>
  )
}
