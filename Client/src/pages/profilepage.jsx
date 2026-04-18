import React from 'react'
import Navbar from '../components/Navbar'
import Chartlevel from '../components/ProfileChart/Chartlevel'
import Footer from '../components/footer'
import Chartbar1 from '../components/ProfileChart/Chartbar1'
import Chartbar2 from '../components/ProfileChart/Chartbar2'
import Chartpie1 from '../components/ProfileChart/Chartpie1'
import Matchtable from '../components/ProfileChart/Matchtable'

const profilepage = (textTheme) => {
    return (
        <div className=''>
            <img className='h-64 w-full object-cover' src='banner.jpg'></img>
            <div className="mx-25 my-5 absolute top-0 left-0">
                <Navbar textTheme={textTheme} />
            </div>
            <div className=' px-10 flex flex-wrap'>
                <div className='flex items-end mx-auto'>
                    <div className='flex flex-col w-60 items-center ml-10 mr-10'>
                        <img className='absolute top-40 z-10 h-35 w-35' src='22.png'></img>
                        <div className='text-[#ffffff] text-[27px] mt-15'>Asmit Srivastava</div>
                        <div className='text-[#C2C2C2] text-sm'>Uid : 1109734213</div>
                    </div>

                    <div className='mb-10 mt-5 ml-10 mr-10'>
                        <Chartlevel />
                    </div>
                </div>

                <div className='flex flex-wrap mx-auto mt-5 gap-10'>
                    <div className='h-23 w-25 bg-[#1E1E1E] border border-[#FFC800] rounded-2xl flex flex-col justify-end'>
                        <p className='text-[25px] font-bold text-center mb-2'>486</p>
                        <p className='text-[16px] font-bold text-center mb-2.5'>Matches</p>
                    </div>
                    <div className='h-23 w-25 bg-[#1E1E1E] border border-[#FFC800] rounded-2xl flex flex-col justify-end'>
                        <p className='text-[25px] font-bold text-center mb-2'>235</p>
                        <p className='text-[16px] font-bold text-center mb-2.5'>Wins</p>
                    </div><div className='h-23 w-25 bg-[#1E1E1E] border border-[#FFC800] rounded-2xl flex flex-col justify-end'>
                        <p className='text-[25px] font-bold text-center mb-2'>141</p>
                        <p className='text-[16px] font-bold text-center mb-2.5'>Lose</p>
                    </div><div className='h-23 w-25 bg-[#1E1E1E] border border-[#FFC800] rounded-2xl flex flex-col justify-end'>
                        <p className='text-[25px] font-bold text-center mb-2'>1.5:1</p>
                        <p className='text-[16px] font-bold text-center mb-2.5'>WL Ratio</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center gap-20 mt-5 mb-10 ml-15 mr-15'>
                <div>
                    <div className='flex flex-col gap-4'>
                        <div className='h-15 w-78 bg-[#1E1E1E] border border-[#C2C2C2] rounded-2xl flex items-center justify-between p-3 gap-5'>
                            <p className='text-[25px] font-bold text-center'>Bios :</p>
                            <p className='text-[25px] font-bold text-center'>4890</p>
                        </div>
                        <div className='h-15 w-78 bg-[#1E1E1E] border border-[#C2C2C2] rounded-2xl flex items-center  justify-between p-3  gap-5'>
                            <p className='text-[25px] font-bold text-center '>Rank:</p>
                            <p className='text-[25px] font-bold text-center '>4890</p>
                        </div>
                        <div className='h-15 w-78 bg-[#1E1E1E] border border-[#C2C2C2] rounded-2xl flex items-center  justify-between p-3  gap-5'>
                            <p className='text-[25px] font-bold text-center '>Best Rank:</p>
                            <p className='text-[25px] font-bold text-center '>4890</p>
                        </div>
                        <div className='h-15 w-78 bg-[#1E1E1E] border border-[#C2C2C2] rounded-2xl flex items-center justify-between p-3  gap-5'>
                            <p className='text-[25px] font-bold text-center '>Biggest Streak :</p>
                            <p className='text-[25px] font-bold text-center '>4890</p>
                        </div>
                    </div>
                </div>
                <div className='border-[#C2C2C2] bg-[#1E1E1E] rounded-2xl border max-w-300 w-full'>
                    <div className=' pt-3 text-center text-xl text-[#C2C2C2] font-bold'>Games Played</div>
                    <div className=''><Chartbar1 /></div>
                </div>
            </div>
            <div className='flex items-center justify-center gap-18 mt-5 mb-10 mx-15'>
                <div className='w-full max-w-80 bg-[#1E1E1E] border border-[#C2C2C2] rounded-2xl'>
                    <div className='pt-3 text-center text-xl text-[#C2C2C2] font-bold'>Games Played </div>
                    <Chartpie1 />
                </div>
                <div className='bg-[#1E1E1E] rounded-2xl border max-w-300 w-full'>
                    <div className='pt-3 text-center text-xl text-[#C2C2C2] font-bold'>Win and Loss Count</div>
                    <Chartbar2 />
                </div>
            </div>
            <div className=' mb-15 max-w-400 mx-15 2xl:mx-auto'>
                <Matchtable/>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default profilepage