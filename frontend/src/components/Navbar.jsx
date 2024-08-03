import React from 'react'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[10vh] flex justify-between items-center max-sm:px-4 px-20 ' >
        <div className='text-3xl font-bold' >
            ChatBot
        </div>
        <Link to="/login" className='px-4 py-2 bg-custom-gradient text-sm font-semibold text-black rounded-lg cursor-pointer flex justify-center items-center gap-1' >
            Try it now
            <IoArrowForwardCircleSharp className='text-black text-3xl ml-2 -rotate-45' />
        </Link>
    </div>
  )
}

export default Navbar