import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'

const profilepage = (textTheme) => {
    return (
        <div>
            <div>
                <div>
                    <img className='h-64 w-full object-cover' src='banner.jpg'></img>
                    <img className=''></img>
                    <div className="mx-25 my-5 absolute top-0 left-0">
                        <Navbar textTheme={textTheme} />
                    </div>

                    <div className='flex gap-3 relative -top-20 left-20'>
                        <img className='z-10' src='22.png'></img>
                        <div className='flex flex-col justify-end '>
                            <div className='text-[#ffffff] text-[27px]'>Asmit Srivastava</div>
                            <div className='text-[#C2C2C2] text-sm'>Uid : 1109734213</div>
                        </div>
                    </div>
                </div>
            </div>




        </div>

    )
}

export default profilepage