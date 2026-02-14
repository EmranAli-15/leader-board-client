"use client"

import Footer from '@/components/Footer'
import Banner from '../components/Banner'
import manNew from "@/public/manNew.png"
import Image from 'next/image'
import { useHelixQuery } from '@/utils/helixFetch'
import Link from 'next/link'

export default function page() {


  const { data, loading, error } = useHelixQuery({
    url: '/getAllTotalScore',
  })



  return (
    <div>
      <Banner></Banner>

      <div className='max-w-7xl mx-auto relative -mt-40 mainbg'>

        {
          !loading && !error && <>
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
                    <h1 className='text-center text-white'><Link href={`/user/${data[1].userId}`}>{data[1].name}</Link></h1>
                    <h1 className='text-center text-white text-xs'>(2nd) <br /> Score: {data[1].totalScore}</h1>
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
                    <h1 className='text-center text-white'><Link href={`/user/${data[0].userId}`}>{data[0].name}</Link></h1>
                    <h1 className='text-center text-white text-xs'>(1st) <br /> Score: {data[0].totalScore}</h1>
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
                    <h1 className='text-center text-white'><Link href={`/user/${data[2].userId}`}>{data[2].name}</Link></h1>
                    <h1 className='text-center text-white text-xs'>(3rd) <br /> Score: {data[2].totalScore}</h1>
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
                        <td className="px-6"><Link href={`/user/${score.userId}`}>{score.name}</Link></td>
                        <td className="px-6">{score.totalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </section>
          </>
        }


      </div>

      <Footer></Footer>
    </div>
  )
}
