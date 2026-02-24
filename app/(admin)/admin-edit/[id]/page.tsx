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





    // Get user scores
    const [scores, setScores] = useState([])
    useEffect(() => {
        const fn = async () => {
            const { success, result } = await Helix.query(`/getSingleUserScores/${id}`)
            if (success) {
                setScores(result.data);
            }
        };

        if (id) fn()
    }, [id]);
    // Get user scores end
    // Get user scores end






    // Updating score
    const [updateScore, setUpdateScore] = useState<any>("");
    const [newScore, setNewScore] = useState<number>(0);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleDeleteScore = async () => {
        setDeleteLoading(true);
        const { success } = await Helix.mutation({
            url: `/deleteScore/${updateScore?._id}`,
            method: "DELETE",
        });

        if (success) {
            setUpdateScore("");
            setNewScore(0);
        }

        setDeleteLoading(false);
    };

    const handleUpdateScore = async () => {
        const data = {
            scoreId: updateScore?._id,
            score: newScore
        }
        setUpdateLoading(true);

        const { success } = await Helix.mutation({
            url: "/updateScore",
            method: "PATCH",
            data: data
        });

        if (success) {
            setUpdateScore("");
            setNewScore(0);
        }

        setUpdateLoading(false);
    };


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

                <div className='mt-10 flex gap-x-3'>
                    <div>
                        <label htmlFor="" className='text-white'>Day: {updateScore?.day}</label>
                        <br />
                        <input
                            value={newScore}
                            onChange={(e) => setNewScore(Number(e.target.value))}
                            type="number"
                            placeholder="Success"
                            className="input input-success"
                        />
                    </div>
                    {
                        newScore && <div className='flex gap-x-3'>
                            <button onClick={handleUpdateScore} className="btn btn-success">{updateLoading ? "Wait..." : "Update"}</button>
                            <button onClick={handleDeleteScore} className="btn btn-warning">{deleteLoading ? "Wait..." : "Delete"}</button>
                        </div>
                    }
                </div>

                <div className='mt-20'>
                    {
                        scores && <div
                            className='grid grid-cols-2 md:grid-cols-4 gap-1'>
                            {
                                scores.map((score: any, idx: number) => {
                                    return (
                                        <div onClick={() => {
                                            setUpdateScore(score)
                                            setNewScore(score.score)
                                        }} key={idx} className='text-white border p-1 my-1 cursor-pointer'>
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
    )
}
