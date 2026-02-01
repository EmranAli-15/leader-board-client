import React from 'react'
import leader_board from "@/public/leader board.jpg"
import Image from 'next/image'

export default function Banner() {
  return (
    <div className='bg-black relative'>
          <Image className='h-80 md:h-100 w-full object-cover opacity-35' alt='banner image' src={leader_board} height={1000} width={1000}></Image>

          <div className='w-full flex justify-center absolute top-20'>
            <h1 className='text-green-700 font-extrabold p-1 bg-[#9e0f0fb7] animate-pulse'>Let's Code Your Journey ...</h1>
          </div>
    </div>
  )
}
