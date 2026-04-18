import React from 'react'

const Matchtable = () => {
    const game = "unravel";
    const opponent = "Asmit21";
    const result = "Win";
    const bios = "350";
    const date = "31/3/2026"
    return (
        <div className='overflow-x-auto w-full h-auto border-2 border-[#C2C2C2] rounded-2xl bg-[#1E1E1E]' >
            <table className='w-full  text-center text-xl '>
                <thead className=''>
                    <tr className=''>
                        <th className='p-2 border-b border-r border-[#C2C2C2]'>Game</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Opponent</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Result</th>
                        <th className='p-2 border-t-0 border border-[#C2C2C2]'>Betting</th>
                        <th className='p-2 border-b border-l border-[#C2C2C2]'>Date</th>
                    </tr>
                </thead>
                <tbody className='text-[18px]'>
                    <tr className=''>
                        <td className='p-2 border border-[#C2C2C2]'>{game}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{opponent}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{result}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{bios}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{date}</td>
                    </tr>
                    <tr className=''>
                        <td className='p-2 border border-[#C2C2C2]'>{game}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{opponent}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{result}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{bios}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{date}</td>
                    </tr>
                    <tr className=''>
                        <td className='p-2 border border-[#C2C2C2]'>{game}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{opponent}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{result}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{bios}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{date}</td>
                    </tr>
                    <tr className=''>
                        <td className='p-2 border border-[#C2C2C2]'>{game}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{opponent}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{result}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{bios}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{date}</td>
                    </tr>
                    <tr className=''>
                        <td className='p-2 border border-[#C2C2C2]'>{game}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{opponent}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{result}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{bios}</td>
                        <td className='p-2 border border-[#C2C2C2]'>{date}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Matchtable