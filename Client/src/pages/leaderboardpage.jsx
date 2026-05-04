import { useEffect, useState } from "react"
import Footer from "../components/footer"
import Navbar from "../components/Navbar"

export default function Leaderboardpage({ textTheme }) {

    const [type, setType] = useState("wins");
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchLb = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:7000/api/leaderboard?type=${type}&limit=20`);
            const result = await res.json();
            setData(result.leaderboard || []);
            setCurrentUser(result.currentUser || null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLb();
    },[type]);

    return (
        <div>
            <div className="mx-25 my-5 mb-30">
                <div><Navbar textTheme={textTheme} /></div>

                <div className="pt-30 mx-15">
                    <div className="text-3xl font-bold">Leaderboard</div>
                    <div className="tabs tabs-box w-40 bg-base-300 mt-5 mb-5">
                        <input type="radio" name="my_tabs_1" onClick={() => setType("wins")} className="w-19 tab checked:bg-primary checked:text-base-100" aria-label="Wins" defaultChecked />
                        <input type="radio" name="my_tabs_1" onClick={() => setType("bios")} className="w-19 tab checked:bg-primary checked:text-base-100" aria-label="Bios" />
                    </div>
                </div>
                <div>
                    
                    <div>
                        <div className="grid grid-cols-5 p-3 font-bold text-center">
                            <div>Rank</div>
                            <div>Profile</div>
                            <div>Username</div>
                            {type === "wins" ? (<div>Wins</div>) : (<div>Bios</div>)}
                            <div>Most Played Game</div>
                        </div>
                        {loading && <div className="mt-5 text-center">Loading...</div>}
                        {data.map((player, index) => (
                            <div
                                key={player.playerId}
                                className="grid grid-cols-5 p-3 text-center border-b border-base-300"
                            >
                                <div>{player.rank}</div>
                                <div>{player.playerId}</div>
                                <div>{player.userName}</div>
                                {type === "wins" ? (<div>{player.wins}</div>) : (<div>{player.bios}</div>)}
                                <div>{player.xp}</div>
                            </div>
                        ))}

                    </div>
                    <div className="mt-10 grid grid-cols-5 p-3 text-center items-center bg-base-100 border border-base-content/40">
                        <div>{currentUser?.rank}</div>
                        <div>{currentUser?.playerId}</div>
                        <div>{currentUser?.userName}</div>
                        {type === "wins" ? (<div>{currentUser?.wins}</div>) : (<div>{currentUser?.bios}</div>)}
                        <div>{currentUser?.xp}</div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}