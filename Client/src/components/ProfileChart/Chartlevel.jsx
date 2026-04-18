
export default function Chartlevel() {
  const xpdata = 77;
  return (
   <div className='w-100'>
    <div className='flex justify-between px-2 py-1'>
      <div className='text-white font-bold text-4sm'>Level : 23</div>
      <div className='text-white font-bold text-4sm'>77/100 xp</div>
    </div>
    <div className='bg-[#303030] border-[#FFC800] border h-6 rounded-3xl'>
      <div className='bg-[#FFC800] h-5.75 rounded-3xl' style={{ width:`${xpdata}%` }}></div>
    </div>
   </div>
  )
}
