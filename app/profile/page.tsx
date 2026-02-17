"use client"

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAuthContext } from '@/contextApi/AuthContext'
import { useRouter } from 'next/navigation'
import { useHelixQuery } from '@/utils/helixFetch'
import Image from 'next/image'
import { BackIcon, ChangeImageIcon, EditIcon, LogOutIcon, UserIcon } from '@/ui/Icons'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'

export default function AboutPage() {
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const changePhotoFn = (e: any) => {
    setUserPhoto((URL.createObjectURL(e.target.files[0])))
  }


  const { setLoading, user } = useAuthContext();


  const { data: userData, loading: userLoading, error: userError } = useHelixQuery({
    url: `/getUserData/${user?.userId}`,
    wait: user?.userId ? false : true
  });

  const { data, loading, error } = useHelixQuery({
    url: `/getSingleUserScores/${user?.userId}`,
    wait: user?.userId ? false : true
  });


  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (data) {
      const total = data.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.score, 0);
      setTotalScore(total);
    }
  }, [data]);
  useEffect(() => {
    if (userData) {
      setUserName(userData.name);
      setUserPhoto(userData.photo);
      setUserPhone(userData.phone);
    }
  }, [userData])


  const handleLogOut = () => {
    Cookies.remove("auth");
    setLoading(true);
    router.push("/");
  };
  // /getSingleUserScores
  return (
    <div className='w-full min-h-screen mainbg'>

      {
        modal && <Modal modal={modal} setModal={setModal}>
          <div className='flex flex-col gap-y-3'>
            <div className='flex justify-center'>
              {
                userPhoto ? <Image className='h-30 bg-[#15db2559] w-30 md:h-40 md:w-40 border-2 border-green-500 rounded-full object-contain' src={userPhoto} alt={userName} width={200} height={200}></Image> :
                  <div className='h-40 w-40 border-2 border-green-500 rounded-full'>
                    <UserIcon color={"#15db2559"} w={160}></UserIcon>
                  </div>
              }
              <div>
                <label className='cursor-pointer' htmlFor="image">
                  <ChangeImageIcon w={40}></ChangeImageIcon>
                </label>
                <input onChange={changePhotoFn} className='hidden' id="image" type="file" name="" />
              </div>
            </div>

            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Success"
              className="input input-success w-full"
            />

            <input
              value={userPhone}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Success"
              className="input input-success w-full"
            />

            <button className="btn mt-3 btn-success">Update</button>
          </div>
        </Modal>
      }

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
        <div className='mt-10'>
          {
            !userLoading && !userError && userData && <div className='text-white'>

              <div className='md:flex justify-between'>
                <div className='flex gap-x-2'>
                  <div className='relative'>
                    {
                      userData.photo ? <Image className='h-30 w-30 md:h-40 md:w-40 border-2 border-white rounded-full object-contain' src={userData.photo} alt={userData.name} width={200} height={200}></Image> :
                        <div className='h-40 w-40 border-2 border-white rounded-full'>
                          <UserIcon color='#fff' w={160}></UserIcon>
                        </div>
                    }
                    <div className='absolute bottom-0 left-[80%] cursor-pointer'>
                      <button onClick={() => setModal(!modal)}>
                        <EditIcon w={30}></EditIcon>
                      </button>
                    </div>
                  </div>
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
