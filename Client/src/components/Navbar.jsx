import { Search } from "lucide-react";
export default function Navbar() {
    return (
        <nav className="fixed left-1/2 -translate-x-1/2 w-[95%] rounded-full border border-gray-300/20 shadow-lg backdrop-blur-xs">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-white text-3xl font-extrabold">
                    GAME<span className="text-yellow-500">SHELF</span>
                </a>

                <div className="space-x-6">
                    <a
                        href="/leaderboard"
                        className="text-gray-300 hover:text-white transition"
                    >
                        Leaderboard
                    </a>
                    <a
                        href="/about"
                        className="text-gray-300 hover:text-white transition"
                    >
                        About
                    </a>
                </div>

                <div className="flex items-center gap-10">
                    <div className="avatar">
                        <div className="w-10 rounded-full overflow-hidden">
                            <img src="jack-o-lantern.png" alt="Avatar" />
                        </div>
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
