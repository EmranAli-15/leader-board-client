"use client"

import { Helix } from '@/helixFetch/helixFetch';
import { BackIcon } from '@/ui/Icons';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function page({ params, }: { params: Promise<{ id: string }> }) {


  const [id, setId] = useState("")
  useEffect(() => {
    (
      async () => {
        const { id } = await params
        setId(id)
      }
    )()
  }, []);









  // Getting submission
  const [submission, setSubmission] = useState<any>();
  useEffect(() => {
    const fn = async () => {
      const { result, success } = await Helix.query(`/getSingleSubmission/${id}`);
      if (success) {
        if (result?.data) {
          setSubmission(result?.data);
        }
      }
    };
    if (id) fn()
  }, [id])
  // Getting submission end
  // Getting submission end




  // Giving score
  const [score, setScore] = useState<number>(0);
  const [day, setDay] = useState(1);
  const [scoreLoading, setScoreLoading] = useState(false);
  const handleScoreSubmit = async () => {
    setScoreLoading(true);
    const data = {
      userId: id,
      day: day,
      score: score
    }
    const { success } = await Helix.mutation({
      url: "/addScore",
      method: "POST",
      data: data
    });
    if (success) {
      setScore(0);
      setDay(1);
    }

    setScoreLoading(false);
  }




  // Giving feedback
  const [feedback, setFeedback] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const handleFeedbackSubmit = async () => {
    setFeedbackLoading(true);
    const data = {
      userId: id,
      feedback: feedback
    }
    const { success } = await Helix.mutation({
      url: "/addFeedback",
      method: "POST",
      data: data
    });

    if (success) setFeedback("");
    setFeedbackLoading(false);
  }

  return (
    <div className='w-full min-h-screen mainbg'>
      <div className='flex justify-between bg-[#15db2559] p-2'>
        <Link href="/admin">
          <div className='flex gap-1 items-center text-white'>
            <BackIcon w={30}></BackIcon>
            <p className='text-[16px]'>Back</p>
          </div>
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-2'>
        {
          submission && <pre className='bg-white p-3 mb-10'>
            <p className='text-right text-orange-500'>{submission?.time}</p>
            {submission?.solution}
          </pre>
        }

        <hr className='border-white my-10' />

        <div className='mb-10'>
          <h1>Give mark</h1>
          <div className='flex flex-col gap-y-2 items-center'>
            <label htmlFor="" className='text-white'>Score</label>
            <input
              onChange={(e) => setScore(Number(e.target.value))}
              value={score}
              type="number"
              placeholder="Enter number" className="input input-success"
            />

            <label htmlFor="" className='text-white'>Day</label>
            <input
              onChange={(e) => setDay(Number(e.target.value))}
              value={day}
              type="number"
              placeholder="Enter number" className="input input-success"
            />
            <button onClick={handleScoreSubmit} className="btn btn-success">{scoreLoading ? "Wait..." : "Submit"}</button>
          </div>
        </div>

        <div className='mb-10'>
          <textarea
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
            placeholder="Write feedback"
            className="textarea textarea-success w-full h-[80vh]"
          >
          </textarea>
          <br />
          <button onClick={handleFeedbackSubmit} className="btn btn-success">{feedbackLoading ? "Wait..." : "Submit"}</button>
        </div>
      </div>
    </div>
  )
}
