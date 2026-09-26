import React from 'react'
const Matchtable = ({gameHistory=[]}) => {

    return (
        <div className='mx-auto max-w-250 h-auto border-2 border-secondary-content/60 rounded-2xl bg-base-300' >
            <div className='grid grid-cols-5 p-3 font-bold text-center text-xl'>
                <div>OPPONENTS</div>
                <div>GAME</div>
                <div>RESULT</div>
                <div>BETTING</div>
                <div>DATE</div>
            </div>
            <div>

                {gameHistory.map((match,index)=>(
                    <div key={index} className='grid grid-cols-5 p-3 text-center text'>
                        <div>{match.opponentUser}</div>
                        <div>{match.game}</div>
                        <div>{match.result}</div>
                        <div>{match.bios}</div>
                        <div>{match.date}</div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Matchtable