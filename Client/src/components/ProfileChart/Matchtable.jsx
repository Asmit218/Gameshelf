import React from 'react'

const Matchtable = () => {
    const game = "unravel";
    const opponent = "Asmit21";
    const result = "Win";
    const bios = "350";
    const date = "31/3/2026"
    return (
        <div className='mx-auto max-w-250 h-auto border-2 border-secondary-content/60 rounded-2xl bg-base-300' >
            <div className='grid grid-cols-5 p-3 font-bold text-center text-xl'>
                <div>OPPONENTS</div>
                <div>GAME</div>
                <div>RESULT</div>
                <div>BETTING</div>
                <div>DATE</div>
            </div>
            <div className='grid grid-cols-5 p-3 text-center text'>
                <div>Albedox</div>
                <div>Bloody Dotty</div>
                <div>Win</div>
                <div>1000</div>
                <div>22/09/2025</div>
            </div>
            <div className='grid grid-cols-5 p-3 text-center text'>
                <div>Albedox</div>
                <div>Bloody Dotty</div>
                <div>Win</div>
                <div>1000</div>
                <div>22/09/2025</div>
            </div>
            <div className='grid grid-cols-5 p-3 text-center text'>
                <div>Albedox</div>
                <div>Bloody Dotty</div>
                <div>Win</div>
                <div>1000</div>
                <div>22/09/2025</div>
            </div>
            <div className='grid grid-cols-5 p-3 text-center text'>
                <div>Albedox</div>
                <div>Bloody Dotty</div>
                <div>Win</div>
                <div>1000</div>
                <div>22/09/2025</div>
            </div>
            <div className='grid grid-cols-5 p-3 text-center text'>
                <div>Albedox</div>
                <div>Bloody Dotty</div>
                <div>Win</div>
                <div>1000</div>
                <div>22/09/2025</div>
            </div>
        </div>
    )
}

{/* <th className='p-2 border-b border-r border-[#C2C2C2]'>Game</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Opponent</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Result</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Betting</th>
                        <th className='p-2 border-b border-l border-[#C2C2C2]'>Date</th>
                         */}
export default Matchtable