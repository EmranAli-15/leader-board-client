"use client"

import { useAuthContext } from '@/contextApi/AuthContext';
import { Helix } from '@/helixFetch/helixFetch';
import { error } from 'console';
import moment from 'moment';
import { useState } from 'react'

export default function page() {
    const { user } = useAuthContext()

    const [solution, setSolution] = useState("");
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
    }

    return (
        <div className='w-full min-h-screen mainbg'>
            <div className='max-w-7xl mx-auto px-2'>
                <div>
                    <h1 className='text-white my-3 text-center text-xl'>Paste your all solution codes:</h1>

                    <textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Paste here your codes."
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
