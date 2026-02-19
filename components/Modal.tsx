import React, { ReactNode } from 'react'

export default function Modal({ modal, setModal, children }: { modal: boolean, setModal: any, children: ReactNode }) {



    return (
        <>
            {
                modal && <>
                    <div onClick={() => setModal(false)} className='absolute inset-0 w-screen h-screen bg-black/70 z-99'>
                        {/* dummy dummy dummy */}
                    </div>
                    <div
                        className='fixed md:w-100 w-[90%] z-999 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] p-5 bg-white rounded-lg text-black'
                    >
                        {children}
                    </div>
                </>
            }
        </>
    )
}
