import React from 'react'

export default function UserChatCard() {
  return (
    <div className='bg-slate-100 m-6 h-16 rounded-lg cursor-pointer flex'>
        <div className='flex items-center relative'>
            <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR75IBxhzh2Rw3Saoqocq0nvzn_GP3NH0CQCA&usqp=CAU" 
            alt=""
            className='w-12 h-12 rounded-full mx-2 p-1' 
            />
            <p className='bg-green-500 w-3 h-3 absolute top-3 right-0 rounded-full'></p>
        </div>
        <div className='w-full m-2'>
            <div className='flex justify-between pl-2'>
                <p className='font-medium'>Listing name</p>
                <p className='text-sm'>24/12/2023</p>
            </div>
            <p className='pl-2'>example text message</p>
        </div>
    </div>
  )
}
