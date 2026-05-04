import { ChevronRight } from "lucide-react";

export default function FriendLog(){
    return(
        <div className="my-3">
            <div className="grid grid-cols-5 gap-3 items-center bg-base-200 p-4 rounded-full border border-base-content/30">
                <div><img src="/22.png" alt="img" /></div>
                <div className="col-span-3 items-center">
                    <div className="text-sm text-base-content/70">Friends for 5 Years</div>
                    <div className="text-xl text-wrap">Asmit</div>
                </div>
                <div className="flex justify-center items-center cursor-pointer">
                    <div className="font-medium">Add</div>
                    <div><ChevronRight /></div>
                </div>
            </div>
        </div>
    )
}