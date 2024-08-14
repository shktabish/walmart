import { NotebookPen } from 'lucide-react'
import React from 'react'

export const NewChat = ({ setMessage }) => {
  const data = [
    {icon: <NotebookPen className='w-4 h-4' />, message: "A table lamp which is compact in size"},
    {icon: <NotebookPen className='w-4 h-4' />, message: "A table lamp which is compact in size"},
    {icon: <NotebookPen className='w-4 h-4' />, message: "A table lamp which is compact in size"},
    {icon: <NotebookPen className='w-4 h-4' />, message: "A table lamp which is compact in size"}
  ]

  return (
    <div className='flex-1 overflow-auto p-4 flex justify-center items-center' >
        <div className='max-sm:w-[95%] max-xl:w-4/5 w-3/5 grid max-lg:grid-cols-2 grid-cols-4 gap-3' >
          {
            data.map((item, index) => (
              <div 
                onClick={() => setMessage(item.message)}
                key={index} 
                className='h-40 w-full border-[1px] border-neutral-400 rounded-xl p-2 cursor-pointer'
              >
                <div key={index} className='flex flex-col gap-4'>
                  {item.icon}
                  <p className='text-sm text-neutral-500'>{item.message}</p>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}