import { Search } from "lucide-react";
import ProfileDropdown from "./profiledropdown";

export default function Navbar({ textTheme ,user}) {
    return (
        <nav className="fixed z-50 left-1/2 -translate-x-1/2 w-[95%] rounded-full border border-gray-300/20 shadow-lg backdrop-blur-xs">
            
            <div className="max-w-7xl mx-auto py-3 flex justify-between items-center">
                <a href="/" className={`${textTheme} text-3xl font-extrabold`}>
                    GAME<span className="text-yellow-500">SHELF</span>
                </a>

                <div className="flex items-center gap-10">
                    <div className="space-x-6">
                        <a
                            href="/leaderboard"
                        >
                            Leaderboard
                        </a>
                        <a
                            href="/room"
                        >
                            Rooms
                        </a>
                        <a
                            href="/about"
                        >
                            About
                        </a>
                    </div>
                    <div className="flex-none">
                        <ProfileDropdown user={user}/>
                    </div>
                    <div className="flex border border-base-content/10 px-4 py-3 rounded-full items-center gap-2">
                        <input className="outline-none" type="text" placeholder="Search for games" />
                        <Search />
                    </div>
                </div>
            </div>
        </nav>
    );
}
