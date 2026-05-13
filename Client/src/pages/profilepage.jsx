import React from 'react'
import Navbar from '../components/Navbar'
import Chartlevel from '../components/ProfileChart/Chartlevel'
import Footer from '../components/footer'
import Chartbar1 from '../components/ProfileChart/Chartbar1'
import Chartbar2 from '../components/ProfileChart/Chartbar2'
import Chartpie1 from '../components/ProfileChart/Chartpie1'
import Matchtable from '../components/ProfileChart/Matchtable'
import { Award, Coins, Crown, Medal, Percent, ShieldMinus, Swords, TrendingDown, Trophy, User } from 'lucide-react'

const profilepage = ({ textTheme, user }) => {
    return (
        <div className=''>
            <img className='h-75 w-full object-cover' src='banner.jpg'></img>
            <div className="mx-25 my-5 absolute top-0 left-0">
                <Navbar user={user} textTheme={textTheme} />
            </div>

            <div className='flex flex-col items-center mx-auto'>
                <div className='flex flex-col w-60 items-center ml-10 mr-10'>
                    <img className='absolute top-50 z-10 h-40 w-40' src='22.png'></img>
                    <div className=' text-3xl mt-15'>Asmit Srivastava</div>
                    <div className=' text-sm'>Uid : 1109734213</div>
                </div>

                <div className='mb-10 mt-5 ml-10 mr-10'>
                    <Chartlevel />
                </div>
            </div>

            <div className='mt-5 mb-20 font-bold flex justify-center gap-20'>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-base-200 rounded-3xl flex justify-center items-center'><Swords /></div>
                    <div className='flex flex-col items-left'>
                        <div className='text-3xl'>248</div>
                        <div className='text-xl font-light'>Matches</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center '>
                    <div className='h-17 w-17 border-2 border-primary bg-base-300 rounded-3xl flex justify-center items-center'><Trophy /></div>
                    <div className='flex flex-col items-left'>
                        <div className='text-3xl'>158</div>
                        <div className='text-xl font-light'>Wins</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-base-300 rounded-3xl flex justify-center items-center'><ShieldMinus /></div>
                    <div className='flex flex-col items-left'>
                        <div className='text-3xl'>90</div>
                        <div className='text-xl font-light'>Loss</div>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='h-17 w-17 border-2 border-primary bg-base-300 rounded-3xl flex justify-center items-center'><Percent /></div>
                    <div className='flex flex-col items-left'>
                        <div className='text-3xl'>248</div>
                        <div className='text-xl font-light'>W:L Ratio</div>
                    </div>
                </div>
            </div>

            <div className='mt-5 mb-20 font-bold flex flex-wrap justify-center gap-30'>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2 border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><Medal className='h-8 w-8' /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>BIOS Won</div>
                            <div className='text-3xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2 border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><TrendingDown  className='h-8 w-8' /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>BIOS Lost</div>
                            <div className='text-3xl'>248</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2  border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><Coins className='h-8 w-8'  /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>Best Streak</div>
                            <div className='text-3xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2  border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><Crown  className='h-8 w-8' /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>Best Ranks</div>
                            <div className='text-3xl'>248</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2 border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><Award  className='h-8 w-8' /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>Achievements</div>
                            <div className='text-3xl'>248</div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='h-22 w-22 border-2 border-secondary-content bg-base-300 rounded-4xl flex justify-center items-center'><User className='h-8 w-8'  /></div>
                        <div className='flex flex-col items-left'>
                            <div className='text-2xl font-light'>Friends</div>
                            <div className='text-3xl'>248</div>
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