import { Trash2 } from "lucide-react";

export default function RoomLog({ type }) {
    return (
        <div className="grid grid-cols-6 text-center items-center rounded-full border border-base-content/30 m-2 bg-base-200 h-18">
            <div>1/5</div>
            <div>Unravel</div>
            <div>Albedrox</div>
            <div>12 May 12:34</div>

            {(type === "global") ?
                <div className="flex justify-center items-center col-span-2">
                    <input type="button" value="Join" className="bg-secondary text-secondary-content shadow-lg w-40 h-13 border-5 border-secondary-content/60 cursor-pointer rounded-full" />
                </div> :
                <>
                    <div className="flex justify-center"><Trash2 className=" cursor-pointer" /></div>
                    <div>
                        <input type="button" value="Join" className="bg-secondary text-secondary-content shadow-lg w-30 h-13 border-5 border-secondary-content/60 cursor-pointer rounded-full" />
                    </div>
                </>}
        </div>
    )
}