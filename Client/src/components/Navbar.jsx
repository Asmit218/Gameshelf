export default function Navbar() {
    return (
        <nav className="w-full py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                <a href="/" className="text-white text-4xl font-extrabold">
                    GAME<span className="text-yellow-500">SHELF</span>
                </a>
                <div className="space-x-4">
                    <a href="/games" className="text-gray-300 hover:text-white">
                        Leaderboard
                    </a>
                    <a href="/about" className="text-gray-300 hover:text-white">
                        About
                    </a>
                </div>
                <div className="flex items-center space-x-4 gap-5">
                    <div className="avatar">
                        <div className="w-15 rounded-full overflow-hidden">
                            <img src="jack-o-lantern.png" alt="Avatar" />
                        </div>
                    </div>
                    <div className="search">
                        <input className="border p-4 rounded-2xl" type="text" name="search" id="search" placeholder="Search games..." />
                    </div>
                </div>
            </div>
        </nav>
    );
}
