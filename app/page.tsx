"use client"

import Banner from '../components/Banner'

import me from "@/public/me.png"
import manNew from "@/public/manNew.png"
import Image from 'next/image'
import { Star } from '@/ui/Icons'
import { useEffect, useState } from 'react'

const rawData = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Alice",
    email: "alice@gmail.com",
    id: "cse45798437945",
    score: 32.2
  },
  {
    name: "Bob",
    email: "bob@gmail.com",
    id: "cse45798437945",
    score: 38.6
  },
  {
    name: "Alex",
    email: "alex@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Alexender",
    email: "alexender@gmail.com",
    id: "cse45798437945",
    score: 30.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    id: "cse45798437945",
    score: 34.6
  },
]

export default function page() {

  const [data, setData] = useState<any>(rawData);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => b.score - a.score);
    setData(sorted);
  }, [])

  return (
    <div>
      <Banner></Banner>

      <div className='max-w-7xl mx-auto relative -mt-40 mainbg'>

        {/* FOR 3 PERSON */}
        <div className='flex justify-center'>
          <div className='flex gap-x-5 md:gap-x-10'>

            <div className='relative top-20'>
              <div className='h-35 w-20 md:h-55 md:w-35 bg-linear-to-t from-[#0874f0] to-black rounded-md border-2 border-white relative overflow-hidden'>
                <div className='absolute top-2 w-full'>
                  <div className='flex justify-center gap-x-2'>
                    {/* <div><Star w={40}></Star></div>
                    <div><Star w={40}></Star></div> */}
                  </div>
                </div>
                <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={1000} width={1000} alt='me'></Image>
              </div>
              <div className='w-20 md:w-35'>
                <h1 className='text-center text-white'>{data[1].name}</h1>
                <h1 className='text-center text-white text-xs'>(2nd) <br /> Score: {data[1].score}</h1>
              </div>
            </div>


            <div>
              <div className='h-35 w-20 md:h-55 md:w-35 bg-linear-to-t from-[#f0ba08] to-black rounded-md border-2 border-white relative overflow-hidden'>
                <div className='absolute top-2'>
                  <div className='flex gap-x-2'>
                    {/* <div className='relative top-2'><Star w={40}></Star></div>
                    <div className='relative -top-2'><Star w={40}></Star></div>
                    <div className='relative top-2'><Star w={40}></Star></div> */}
                  </div>
                </div>
                <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={500} width={500} alt='me'></Image>
              </div>
              <div className='w-20 md:w-35'>
                <h1 className='text-center text-white'>{data[0].name}</h1>
                <h1 className='text-center text-white text-xs'>(1st) <br /> Score: {data[0].score}</h1>
              </div>
            </div>


            <div className='relative top-20'>
              <div className='h-35 w-20 md:h-55 md:w-35 bg-linear-to-t from-[#f008f0] to-black rounded-md border-2 border-white relative overflow-hidden'>
                <div className='absolute top-2 w-full'>
                  <div className='flex justify-center'>
                    {/* <div><Star w={40}></Star></div> */}
                  </div>
                </div>
                <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={1000} width={1000} alt='me'></Image>
              </div>
              <div className='w-20 md:w-35'>
                <h1 className='text-center text-white'>{data[2].name}</h1>
                <h1 className='text-center text-white text-xs'>(3rd) <br /> Score: {data[2].score}</h1>
              </div>
            </div>

          </div>
        </div>



        {/* FOR OTHERS PERSON */}
        <section className='mt-40'>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead className='border-white border text-white'>
                <tr>
                  <th>Position</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.slice(4).map((score: any, idx: any) => {
                    return (
                      <tr className={`${idx % 2 == 0 ? "bg-[#00960c34]" : ""} text-white text-center border`} key={idx}>
                        <td className='py-4'>{idx + 4}</td>
                        <td>NO Image</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </section>
      </div>
    </div>
  )
}
