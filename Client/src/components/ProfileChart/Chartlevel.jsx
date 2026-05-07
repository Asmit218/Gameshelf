
export default function Chartlevel() {
  const xpdata = 77;
  return (
    <div className="flex w-160 mx-auto justify-between items-end">

      <div className='text-base-content font-bold text-4sm'>Level : 23</div>

      <div className="flex flex-col items-end">

        <div className='text-base-content font-bold text-4sm'>77/100 xp</div>

        <div className='bg-base-200 w-100 border-primary border h-6 rounded-3xl'>
          <div className='bg-primary h-5.75 rounded-3xl' style={{ width: `${xpdata}%` }}></div>
        </div>

      </div>

      <div className='text-base-content font-bold text-4sm'>Next Level : 24</div>

    </div>
  )
}
