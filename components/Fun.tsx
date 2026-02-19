"use client"

import React, { useState } from 'react'
import Modal from './Modal';

export default function Fun({ score }: { score: number }) {
    const [modal, setModal] = useState(false);
    const [done, setDone] = useState(false);
    const [num, setNum] = useState(Number)

    const [hop, setHop] = useState(false);

    return (
        <div className='text-white'>

            <Modal modal={hop} setModal={setHop}>
                <div>
                    <h1 className='text-center'>YOU FOOL 🤣</h1>
                    <h1 className='text-center'>ONLY ADMIN CAN DO THIS.</h1>
                </div>
            </Modal>

            <Modal modal={modal} setModal={setModal}>
                <div>
                    <h1>Previous {score}</h1>
                    <div className='flex items-center gap-x-2'>
                        <h1>Add score : </h1>
                        <input value={num} onChange={(e) => setNum(Number(e.target.value))} className='border-green-600 outline-0 border px-2 w-40' type="number" />
                    </div>

                    <div className='mt-2'>
                        <h1>Total : {score + num}</h1>
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={() => {
                            setModal(false);
                            setHop(true);
                        }} className='btn btn-success mt-5'>Update</button>
                    </div>
                </div>
            </Modal>
            <button className='cursor-pointer' onClick={() => setModal(true)}>update score</button>
        </div>
    )
}
