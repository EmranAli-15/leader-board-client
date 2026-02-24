"use client"

import { useAuthContext } from '@/contextApi/AuthContext';
import { Helix } from '@/helixFetch/helixFetch';
import { BackIcon } from '@/ui/Icons';
import { error } from 'console';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default function page() {
    const { user } = useAuthContext()

    const [solution, setSolution] = useState("");
    const [time, setTime] = useState("");



    // Getting submission
    const [getSubmissionLoading, setGetSubmissionLoading] = useState(true);
    useEffect(() => {

        const fn = async () => {
            const { success, result } = await Helix.query(`/getSingleSubmission/${user?.userId}`);
            if (success) {
                setSolution(result?.data?.solution);
                setTime(result?.data?.time);
            }
            setGetSubmissionLoading(false);
        }

        if (user?.userId) {
            fn();
        }
    }, [user?.userId])
    // Getting submission end
    // Getting submission end



    // Submission posting
    const [solutionError, setSolutionError] = useState("");
    const [loading, setLoading] = useState(false);
    const [solutionSuccess, setSolutionSuccess] = useState("");

    const handleTaskubmit = async () => {
        setLoading(true);
        setSolutionError("");
        setSolutionSuccess("");
        if (!solution) return setSolutionError("Please provide solutions.");
        if (!user?.userId) return setSolutionError("Please login before submit.");

        const date = Date.now();

        const time = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        console.log({
            userId: user?.userId,
            solution,
            time
        });

        const data = {
            userId: user?.userId,
            solution,
            time
        };

        const { result, success, error } = await Helix.mutation({
            url: "/addSubmission",
            data: data,
            method: "POST"
        });

        if (success) setSolutionSuccess(result.message);
        if (!success) setSolutionError(error.message);
        setLoading(false);
    };
    // Submission posting end
    // Submission posting end

    return (
        <div className='w-full min-h-screen mainbg'>
            <div className='flex justify-between bg-[#15db2559] p-2'>
                <Link href="/profile">
                    <div className='flex gap-1 items-center text-white'>
                        <BackIcon w={30}></BackIcon>
                        <p className='text-[16px]'>Back</p>
                    </div>
                </Link>
            </div>
            <div className='max-w-7xl mx-auto px-2'>
                <div className='mb-10'>
                    <h1 className='text-white my-3 text-center text-xl'>Paste your all solution codes:</h1>
                    <h1 className='text-right text-yellow-300'>{time}</h1>
                    <textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder={getSubmissionLoading ? "loading your codes..." : "Paste here your codes."}
                        className="textarea w-full h-[80vh] textarea-success bg-[#08791148] text-white"
                    >
                    </textarea>
                    <div className='mt-3 flex justify-center'>
                        {
                            solutionError && <p className='text-red-700 font-bold bg-white inline px-2'>{solutionError}</p>
                        }
                        {
                            solutionSuccess && <p className='text-green-600 font-bold bg-white inline px-2'>{solutionSuccess}</p>
                        }
                    </div>
                    <button onClick={handleTaskubmit} className='btn btn-success w-full mt-3'>{loading ? "wait a moment" : "Submit"}</button>
                </div>
            </div>
        </div>
    )
}
