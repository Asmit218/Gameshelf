
export default function Chartlevel({level,xp}) {

  return (
    <div className="flex w-200 mx-auto justify-between items-end">

      <div className='text-base-content font-bold text-4sm'>Level : {level}</div>

      <div className="flex flex-col items-end">

        <div className='text-base-content font-bold text-4sm'>{xp}/100 xp</div>

        <div className='bg-base-200 w-140 border-primary border h-6 rounded-3xl'>
          <div className='bg-primary h-5.75 rounded-3xl' style={{ width: `${xp}%` }}></div>
        </div>

      </div>

      <div className='text-base-content font-bold text-4sm'>Next Level : {level + 1}</div>

    </div>
  )
}
