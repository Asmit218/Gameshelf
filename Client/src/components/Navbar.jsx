import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import ProfileDropdown from "./profiledropdown";
import { Link } from "react-router-dom";

export default function Navbar({ textTheme, user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`fixed z-50 top-3 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl border border-base-content/15 shadow-lg backdrop-blur-md bg-base-100/80 text-base-content transition-all duration-300 ${isOpen ? "rounded-2xl" : "rounded-full"}`}>
            <div className="py-3 px-4 sm:px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-base-content hover:opacity-90 transition-opacity">
                    GAME<span className="text-yellow-500">SHELF</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                    <div className="flex items-center space-x-6 text-sm font-semibold text-base-content/80">
                        <Link to="/leaderboard" className="hover:text-yellow-500 transition-colors">Leaderboard</Link>
                        <Link to="/room" className="hover:text-yellow-500 transition-colors">Rooms</Link>
                        <Link to="/about" className="hover:text-yellow-500 transition-colors">About</Link>
                    </div>
                    <div className="flex-none">
                        <ProfileDropdown user={user} />
                    </div>
                    <div className="flex border border-base-content/15 bg-base-200/60 px-4 py-2 rounded-full items-center gap-2">
                        <input className="outline-none bg-transparent text-sm text-base-content placeholder:text-base-content/50 w-32 lg:w-36 focus:w-48 transition-all" type="text" placeholder="Search for games" />
                        <Search className="w-4 h-4 text-base-content/50" />
                    </div>
                </div>

                {/* Mobile Controls (Profile + Hamburger) */}
                <div className="flex md:hidden items-center gap-3">
                    <ProfileDropdown user={user} />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                        className="p-2 rounded-full border border-base-content/15 bg-base-200/60 hover:bg-base-200 text-base-content transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-5 pb-5 pt-2 border-t border-base-content/10 flex flex-col gap-4">
                    <div className="flex flex-col space-y-3 text-sm font-semibold text-base-content/80">
                        <Link
                            to="/leaderboard"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors py-1"
                        >
                            Leaderboard
                        </Link>
                        <Link
                            to="/room"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors py-1"
                        >
                            Rooms
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className="hover:text-yellow-500 transition-colors py-1"
                        >
                            About
                        </Link>
                    </div>

                    <div className="flex border border-base-content/15 bg-base-200/60 px-4 py-2 rounded-full items-center gap-2 w-full">
                        <input
                            className="outline-none bg-transparent text-sm text-base-content placeholder:text-base-content/50 w-full"
                            type="text"
                            placeholder="Search for games"
                        />
                        <Search className="w-4 h-4 text-base-content/50 shrink-0" />
                    </div>
                </div>
            )}
        </nav>
    );
}
