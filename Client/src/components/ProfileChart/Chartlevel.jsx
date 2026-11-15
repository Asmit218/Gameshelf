
export default function Chartlevel({ level, xp }) {

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-200 mx-auto justify-between items-center sm:items-end gap-3 px-3">

      <div className="text-base-content font-bold text-sm whitespace-nowrap">
        Level : {level}
      </div>

      <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">

        <div className="text-base-content font-bold text-sm mb-1">
          {xp}/100 xp
        </div>

        <div className="bg-base-200 w-full sm:w-100 max-w-140 border-primary border h-6 rounded-3xl overflow-hidden">
          <div
            className="bg-primary h-full rounded-3xl transition-all duration-300"
            style={{ width: `${Math.min(Math.max(xp, 0), 100)}%` }}
          />
        </div>

      </div>

      <div className="text-base-content font-bold text-sm whitespace-nowrap">
        Next Level : {level + 1}
      </div>

    </div>
  )
}
