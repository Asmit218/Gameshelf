import React from 'react'
import Navbar from '../components/Navbar'
import Chartlevel from '../components/ProfileChart/Chartlevel'
import Footer from '../components/footer'
import Chartbar1 from '../components/ProfileChart/Chartbar1'
import Chartbar2 from '../components/ProfileChart/Chartbar2'
import Chartpie1 from '../components/ProfileChart/Chartpie1'
import Matchtable from '../components/ProfileChart/Matchtable'

const profilepage = ({ textTheme, user }) => {
    return (
        <div className=''>
            <img className='h-64 w-full object-cover' src='banner.jpg'></img>
            <div className="mx-25 my-5 absolute top-0 left-0">
                <Navbar user={user} textTheme={textTheme} />
            </div>

            <div className='flex flex-col items-center mx-auto'>
                <div className='flex flex-col w-60 items-center ml-10 mr-10'>
                    <img className='absolute top-40 z-10 h-35 w-35' src='22.png'></img>
                    <div className=' text-[27px] mt-15'>Asmit Srivastava</div>
                    <div className=' text-sm'>Uid : 1109734213</div>
                </div>

                <div className='mb-10 mt-5 ml-10 mr-10'>
                    <Chartlevel />
                </div>
            </div>

            <div className='mt-5 mb-20 font-bold flex justify-center gap-20'>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-black rounded-3xl'></div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl'>248</div>
                        <div className='text-[15px]'>MATCHES</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center '>
                    <div className='h-17 w-17 border-2 border-primary bg-black rounded-3xl'></div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl'>158</div>
                        <div className='text-[15px]'>WINS</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-black rounded-3xl'></div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl'>90</div>
                        <div className='text-[15px]'>LOSS</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-black rounded-3xl'></div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl'>248</div>
                        <div className='text-[15px]'>W:L RATIO</div>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-20 font-bold flex flex-wrap justify-center gap-20'>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2 border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>BIOS WON</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2 border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>BIOS LOST</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2  border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>BEST STREAK</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2  border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>BEST RANK</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2 border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>BEST RANK</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-25 w-25 border-2 border-secondary-content bg-black rounded-4xl'></div>
                        <div className='flex flex-col items-center'>
                            <div className='text-xl'>FRIENDS</div>
                            <div className='text-4xl'>248</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-auto mb-20 border-secondary-content/60 bg-base-300 rounded-2xl border max-w-240'>
                    <div className=' pt-3 text-center text-xl font-bold'>GAMES PLAYED</div>
                    <div className=''><Chartbar1 /></div>
            </div>

            <div className='mx-auto mb-20 border-secondary-content/60 bg-base-300 rounded-2xl border max-w-240'>
                    <div className=' pt-3 text-center text-xl font-bold'>WIN LOSS COUNT</div>
                    <div className=''><Chartbar2 /></div>
            </div>

            <div className='mb-20 flex justify-center gap-20'>
                <div className='w-80 p-3 border-secondary-content/60 bg-base-300 rounded-2xl border' >
                    <Chartpie1 />
                </div>
                <div className='w-80 p-3 border-secondary-content/60 bg-base-300 rounded-2xl border' >
                    <Chartpie1 />
                </div>
            </div>

            
            <div className=' mb-15 max-w-350 mx-15 2xl:max-w-350 2xl:mx-auto'>
                <Matchtable />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default profilepage