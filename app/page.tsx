"use client"

import Footer from '@/components/Footer'
import Banner from '../components/Banner'
import manNew from "@/public/manNew.png"
import Image from 'next/image'
import { useEffect, useState } from 'react'

const rawData = [
  {
    name: "Md Rafiul Hasan Rifat",
    email: "rafiulhasanrifat2002@gmail",
    photo: "https://i.ibb.co/x8GSmR5m/rifat1.png",
    id: "CSE2401031096",
    phone: "01606090890",
    section: "31M1",
    score: 75
  },
  {
    name: "Asif Karim Ornob",
    email: "ornobasifkarim@gmail.com",
    photo: "https://i.ibb.co/fVDNjrQ4/ornob1.jpg",
    id: "CSE2401031169",
    phone: "01906428465",
    section: "31M1",
    score: 25
  },
  {
    name: "Atkia Nawar Anisha",
    email: "atkianawaranisha@gmail.com",
    photo: "https://i.ibb.co/LXMMKRfP/anisha2.jpg",
    id: "CSE2401031093",
    phone: "01755380844",
    section: "31M1",
    score: 71
  },
  {
    name: "Ashraful Haque",
    email: "ashrafulhaque1004@gmail.com",
    photo: "https://i.ibb.co/qFnnK3Fj/ashraful1.jpg",
    id: "CSE2401031137",
    phone: "01635-047881",
    section: "31M1",
    score: 66
  },
  {
    name: "Pranto Paul",
    email: "paulpranto413@gmail.com",
    photo: "https://i.ibb.co/VYBHL0Wc/pranto1.png",
    id: "CSE2401031089",
    phone: "01616377899",
    section: "31M1",
    score: 25
  },
  {
    name: "Ashra Siddiqa Yeantun",
    email: "ayeantun@gmail.com",
    photo: "https://i.ibb.co/SDJP7qFb/ashra1.jpg",
    id: "CSE2401031182",
    phone: "01590084318",
    section: "31M1",
    score: 60
  },
  {
    name: "Nabil",
    email: "khalequzzaman26@gmail.com",
    photo: "https://i.ibb.co/20kNWkb2/khalequzzaman1.png",
    id: "CSE2401031091",
    phone: "01618225641",
    section: "31M1",
    score: 86
  },
  {
    name: "Bushra Binte Reza",
    email: "bbushu8@gmail.com",
    photo: "https://i.ibb.co/z1LCG0R/bushra1.jpg",
    id: "CSE2401031001",
    phone: "01756590241",
    section: "31M1",
    score: 75
  },
  {
    name: "Sumaya Akter Rini",
    email: "sumayarahman165@gmail.com",
    photo: "https://i.ibb.co/VWvPBc5F/rini1.jpg",
    id: "CSE2203027042",
    phone: "01835531291",
    section: "31M1",
    score: 10
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
                {
                  data[1]?.photo ? <Image className='h-20 w-20 md:h-35 md:w-35 object-contain absolute bottom-0' src={data[1].photo} height={100} width={100} alt='me'></Image> :
                    <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={100} width={100} alt='me'></Image>
                }
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
                {
                  data[0]?.photo ? <Image className='h-20 w-20 md:h-35 md:w-35 object-contain absolute bottom-0' src={data[0].photo} height={100} width={100} alt='me'></Image> :
                    <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={100} width={100} alt='me'></Image>
                }
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
                {
                  data[2]?.photo ? <Image className='h-20 w-20 md:h-35 md:w-35 object-contain absolute bottom-0' src={data[2].photo} height={100} width={100} alt='me'></Image> :
                    <Image className='h-20 w-20 md:h-35 md:w-35 object-cover absolute bottom-0' src={manNew} height={100} width={100} alt='me'></Image>
                }
              </div>
              <div className='w-20 md:w-35'>
                <h1 className='text-center text-white'>{data[2].name}</h1>
                <h1 className='text-center text-white text-xs'>(3rd) <br /> Score: {data[2].score}</h1>
              </div>
            </div>

          </div>
        </div>



        {/* FOR OTHERS PERSON */}
        <section className='mt-40 mb-10'>

          <div className="overflow-x-auto w-full p-2">
            <table className="min-w-full text-center table-fixed">
              <thead className="border-white border text-white">
                <tr>
                  <th className="w-32 py-4 px-6">Position</th>
                  <th className="w-48 py-4 px-6">Image</th>
                  <th className="w-72 py-4 px-6">Name</th>
                  <th className="w-32 py-4 px-6">Score</th>
                </tr>
              </thead>

              <tbody>
                {data.slice(3).map((score: any, idx: number) => (
                  <tr
                    key={idx}
                    className={`${idx % 2 === 0 ? "bg-[#00960c34]" : ""} text-white border`}
                  >
                    <td className="py-4 px-6">{idx + 4}</td>
                    <td className="px-6 flex justify-center">
                      {
                        score.photo ? <Image className='object-contain h-20 w-20' height={100} width={100} alt={score.name} src={score.photo}></Image> : "No Image"
                      }
                    </td>
                    <td className="px-6">{score.name}</td>
                    <td className="px-6">{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </section>
      </div>

      <Footer></Footer>
    </div>
  )
}
