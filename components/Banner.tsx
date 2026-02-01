import React from 'react'
import leader_board from "@/public/leader board.jpg"
import Image from 'next/image'

export default function Banner() {
  return (
    <div className='bg-black'>
          <Image className='h-100 object-cover opacity-35' alt='banner image' src={leader_board} height={3000} width={3000}></Image>
    </div>
  )
}
