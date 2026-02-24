"use client"

import Link from 'next/link'
import Cookies from 'js-cookie'
import { useAuthContext } from '@/contextApi/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BackIcon, ChangeImageIcon, EditIcon, LogOutIcon, UserIcon } from '@/ui/Icons'
import { FormEvent, useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import { Helix } from '@/helixFetch/helixFetch'
import { uploadImage } from '@/utils/uploadImage'
import Fun from '@/components/Fun'

export default function AboutPage() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { setLoading: setContextLoading, user } = useAuthContext();
  const [updateLoading, setUpdateLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState<any>();



  // Password change functionalitis
  const [passModal, setPassModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passLoading, setPassLoading] = useState(false);
  const [passwordChangedSuccessfull, setPasswordChangedSuccessfull] = useState("");

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPassLoading(true);
    setPasswordChangedSuccessfull("");
    setPassError("");
    if (newPass !== conPass) {
      return setPassError("Password not matched.");
    }

    const data = {
      userId: user?.userId,
      currentPass: currentPass,
      newPass: conPass
    }

    const res = await Helix.mutation({
      url: "/changeUserPassword",
      method: "PATCH",
      data: data
    });
    if (res.success) {
      setPasswordChangedSuccessfull(res.result.message);
      setCurrentPass("");
      setNewPass("");
      setConPass("");
    }

    if (!res.success)
      setPassError(res.error.message)

    setPassLoading(false);
  }
  // Password change functionalitis end
  // Password change functionalitis end






  // Fetching user data
  const [totalScore, setTotalScore] = useState(0);
  const [userData, setUserData] = useState<any>({});
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState("");
  useEffect(() => {
    const fn = async () => {
      const { success, result: res } = await Helix.query(`/getUserData/${user?.userId}`);
      if (success) {
        setUserData(res.data);
        setUserLoading(false);
        setUserError("");
        setUserName(res.data.name);
        setUserPhoto(res.data.photo);
        setUserPhone(res.data.phone);
      }
    };

    if (user?.userId) fn();
  }, [user?.userId])
  // Fetching user data end
  // Fetching user data end






  // Fetching user scores
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fn = async () => {
      const { success, result: res } = await Helix.query(`/getSingleUserScores/${user?.userId}`);
      if (success) {
        setData(res.data);
        setLoading(false);
        setError("");
        const total = res?.data?.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.score, 0);
        setTotalScore(total);
      }
    };

    if (user?.userId) fn();
  }, [user?.userId])
  // Fetching user scores end
  // Fetching user scores end



  const handleLogOut = () => {
    Cookies.remove("auth");
    setContextLoading(true);
    router.push("/");
  };









  // Updating information
  const changePhotoFn = (e: any) => {
    setPhotoFile(e.target.files[0])
    setUserPhoto((URL.createObjectURL(e.target.files[0])))
  }

  const handleUpdateData = async () => {
    setUpdateLoading(true)
    const data: any = {}
    if (userData.name !== userName) data["name"] = userName;
    if (userData.photo !== userPhoto) {
      const res = await uploadImage(photoFile);
      if (res) {
        data["photo"] = res;
      }
    }
    if (userData.phone !== userPhone) data["phone"] = userPhone;

    await Helix.mutation({
      url: `/updateUserData/${user?.userId}`,
      data: data,
      method: 'PATCH'
    });

    setUpdateLoading(false);
    window.location.reload()
  };
  // Updating information end
  // Updating information end




  return (
    <div className='w-full min-h-screen mainbg'>
      {
        <Modal modal={passModal} setModal={setPassModal}>
          {
            passError && <p className='text-red-600 text-center mb-3'>{passError}</p>
          }
          {
            passwordChangedSuccessfull && <p className='text-green-600 text-center mb-3'>{passwordChangedSuccessfull}</p>
          }
          <form onSubmit={handleChangePassword} className='flex flex-col gap-y-5'>
            <div>
              <p className='text-sm mb-2 relative'>Current password:</p>
              <input
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                type="text"
                placeholder="type current password"
                className="input input-success w-full"
              />
            </div>

            <div>
              <p className='text-sm mb-2 relative'>New password:</p>
              <input
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                type="text"
                placeholder="type new password"
                className="input input-success w-full"
              />
            </div>

            <div className='relative'>
              <p className='text-sm mb-2 relative'>Confirm password:</p>
              <input
                required
                value={conPass}
                onChange={(e) => setConPass(e.target.value)}
                type="text"
                placeholder="type confirm password"
                className="input input-success w-full"
              />
            </div>

            <button type='submit' className="btn mt-3 btn-success">
              {passLoading ? "wait a moment" : "Confirm Change"}
            </button>
          </form>
        </Modal>
      }

      {
        modal && <Modal modal={modal} setModal={setModal}>
          <div>
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
                onChange={(e) => setUserPhone(e.target.value)}
                type="text"
                placeholder="Success"
                className="input input-success w-full"
              />

              <button onClick={handleUpdateData} className="btn mt-3 btn-success">
                {updateLoading ? "wait a moment" : "Update"}
              </button>
            </div>
            <hr className='my-5' />
            <button onClick={() => {
              setModal(false);
              setPassModal(true);
            }} className='link link-success'>Change password</button>
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

        {
          userLoading || loading ? <div className='absolute left-1/2 -translate-x-1/2'>
            <div className="loader"></div>
          </div> : ""
        }

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
                    <div className='absolute bottom-0 left-[80%]'>
                      <button className='cursor-pointer' onClick={() => setModal(!modal)}>
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

              <div className='flex justify-end my-10'>
                <div className='flex items-center gap-x-2'>
                  <Link href="/task-submit">
                    <button className='btn btn-success btn-sm'>Submit task</button>
                  </Link>
                  <Link href="/feedback">
                    <button className='btn btn-success btn-sm'>Today's feedback</button>
                  </Link>
                </div>
              </div>
            </div>
          }
        </div>


        <div className='w-full'>
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
