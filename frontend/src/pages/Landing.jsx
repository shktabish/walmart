import { MouseBadge } from '@/components/ui/MouseBadge'
import React from 'react'
import { FaCirclePlay } from "react-icons/fa6"
import { IoArrowForwardCircleSharp } from "react-icons/io5"

const Landing = () => {
  return (
    <div className='h-[90vh] flex flex-col justify-center items-center gap-5 relative font-satoshi' >
        <div className='text-center mb-5 max-sm:text-sm text-lg' >
            Revolutionize Your Shopping Experience
        </div>
        <div className='text-center max-sm:text-2xl max-lg:text-5xl max-xl:text-6xl text-7xl font-satoshiBlack' >
            Your Guide <br/> to a Better Shopping Trip
        </div>
        <div className='text-center max-sm:text-2xl max-lg:text-5xl max-xl:text-6xl text-7xl font-satoshiBlack mb-5 text-transparent bg-clip-text bg-custom-gradient' >
            Walmart's AI Chatbot
        </div>
        <div className='text-center max-sm:w-[90%] max-sm:text-sm max-xl:w-[36rem] w-[48rem] text-lg text-[#C9c9c9]' >
            Revolutionize your shopping with our AI chatbot. Get personalized recommendations, find items in-store, and enjoy virtual try-ons with mannequins for a seamless, convenient experience.
        </div>
        <div className='text-lg flex flex-wrap justify-center items-center max-sm:gap-5 gap-10 px-5' >
            <div className='max-sm:px-4 px-8 py-3 bg-custom-gradient max-sm:text-sm font-semibold text-black rounded-lg cursor-pointer flex justify-center items-center gap-2' >
                Get Started
                <IoArrowForwardCircleSharp className='text-black text-3xl ml-2 -rotate-45' />
            </div>
            <div className='max-sm:px-4 px-8 py-3 max-sm:text-sm font-semibold rounded-lg border-2 border-white cursor-pointer flex justify-center items-center gap-2' >
                <FaCirclePlay className='text-white text-2xl mr-2' />
                Watch Video
            </div>
        </div>
        <MouseBadge 
            text="Social Media" 
            color="#37c0f8"
            badgePos="max-lg:bottom:12 bottom-28 max-lg:left-12 max-2xl:left-20 left-40" 
            arrowPos="-top-5 -right-5" 
            index={1}
        />
        <MouseBadge 
            text="Social Media" 
            color="#fe7689" 
            badgePos="max-lg:bottom-24 bottom-48 max-lg:right-10 max-2xl:right-20 right-40" 
            arrowPos="-top-5 -left-5 rotate-[270deg]" 
            index={2}
        />
        <MouseBadge 
            text="Social Media" 
            color="#fdce0f" 
            badgePos="max-lg:top-16 top-36 max-lg:right-16 max-2xl:right-32 right-60" 
            arrowPos="-bottom-5 -left-5 rotate-[180deg]" 
            index={3}
        />
        <MouseBadge 
            text="Social Media" 
            color="#e976f3" 
            badgePos="max-lg:top-12 top-28 max-lg:left-20 max-2xl:left-40 left-80" 
            arrowPos="-bottom-5 -right-5 rotate-[90deg]" 
            index={4}
        />
    </div>
  )
}

export default Landing