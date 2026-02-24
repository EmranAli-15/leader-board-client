"use client"

import { useAuthContext } from "@/contextApi/AuthContext";
import { BackIcon, LogOutIcon, UserIcon } from "@/ui/Icons";
import { useHelixQuery } from "@/utils/helixFetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page({ params, }: { params: Promise<{ id: string }> }) {

  const [id, setId] = useState("")
  useEffect(() => {
    (
      async () => {
        const { id } = await params
        setId(id)
      }
    )()
  },[]);



  const router = useRouter();
  const { setLoading, user } = useAuthContext();

  const { data, loading, error } = useHelixQuery({
    url: `/getSingleUserScores/${id}`,
    wait: id ? false : true
  });
  const { data: userData, loading: userLoading, error: userError } = useHelixQuery({
    url: `/getUserData/${id}`,
    wait: id ? false : true
  });

  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (data) {
      const total = data.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.score, 0);
      setTotalScore(total);
    }
  }, [data])

  return (
    <div className='w-full min-h-screen mainbg'>

      <div className='flex justify-between bg-[#15db2559] p-2'>
        <Link href="/">
          <div className='flex gap-1 items-center text-white'>
            <BackIcon w={30}></BackIcon>
            <p className='text-[16px]'>Home</p>
          </div>
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-2'>
        <div className='mt-10'>
          {
            !userLoading && !userError && userData && <div className='text-white'>

              <div className='md:flex justify-between'>
                <div className='flex gap-x-2'>
                  {
                    userData.photo ? <Image className='h-30 w-30 md:h-40 md:w-40 border-2 border-white rounded-full object-contain' src={userData.photo} alt={userData.name} width={200} height={200}></Image> :
                      <div className='h-40 w-40 border-2 border-white rounded-full'>
                        <UserIcon color="#fff" w={160}></UserIcon>
                      </div>
                  }
                  <div>
                    <h1 className='text-[16px] md:text-xl mb-2'>{userData.name}</h1>
                    <p className='text-[14px] md:text-[16px]'>{userData.id}</p>
                    <p className='text-[14px] md:text-[16px]'>Total score: {totalScore}</p>
                  </div>
                </div>
                <div className='mt-3 md:mt-0'>
                  <pre className='text-[14px] md:text-[16px]'>Email    : {userData.email}</pre>
                  <pre className='text-[14px] md:text-[16px]'>WhatsApp : {userData.phone}</pre>
                  <pre className='text-[14px] md:text-[16px]'>Section  : {userData.section}</pre>
                </div>
              </div>

            </div>
          }
        </div>

        <div className='mt-10 w-full'>
          <div>
            {
              !loading && !error && data && <div
                className='grid grid-cols-2 md:grid-cols-4 gap-1'>
                {
                  data.map((score: any, idx: number) => {
                    return (
                      <div key={idx} className='text-white border p-1 my-1'>
                        <p>Day {score.day} : <span className='text-yellow-300 font-bold'>{score.score}</span></p>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>


      </div>
    </div>
  )
}