import React from 'react'

export default function page() {
    return (
        <div className='w-full min-h-screen mainbg'>
            <div className='max-w-7xl mx-auto px-2'>
                <h1 className='text-white'>This is a task submission page</h1>

                <textarea placeholder="Paste here your codes." className="textarea w-full h-[80vh] textarea-success"></textarea>
            </div>
        </div>
    )
}
