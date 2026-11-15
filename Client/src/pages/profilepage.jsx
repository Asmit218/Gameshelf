import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Chartlevel from '../components/ProfileChart/Chartlevel'
import Footer from '../components/footer'
import Chartbar1 from '../components/ProfileChart/Chartbar1'
import Chartbar2 from '../components/ProfileChart/Chartbar2'
import Chartpie1 from '../components/ProfileChart/Chartpie1'
import Matchtable from '../components/ProfileChart/Matchtable'
import { Award, Coins, Crown, Medal, Percent, ShieldMinus, Swords, TrendingDown, Trophy, User } from 'lucide-react'
import { AuthContext } from '../utils/AuthProvider'
import api from '../utils/axios'
import Chartpie2 from '../components/ProfileChart/Chartpie2'

const profilepage = ({ textTheme }) => {

    const { user } = useContext(AuthContext);

    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
    const [bgPhoto, setBgPhoto] = useState(user?.bgPhoto || "");
    const [match, setMatch] = useState(0);
    const [win, setWin] = useState(0);
    const [loss, setLoss] = useState(0);
    const [biosWon, setBiosWon] = useState(0);
    const [biosLost, setBiosLost] = useState(0);
    const [level, setLevel] = useState(0);
    const [xp, setXp] = useState(0);
    const [gameCount, setGameCount] = useState([]);
    const [gameWin, setGameWin] = useState([]);
    const [gameHistory, setGameHistory] = useState([]);
    const [bestRank, setBestRank] = useState(0);
    const [friend, setFriend] = useState(0);

    useEffect(() => {
        if (user?.profilePhoto) setProfilePhoto(user.profilePhoto);
        if (user?.bgPhoto) setBgPhoto(user.bgPhoto);
    }, [user]);

    useEffect(() => {
        if (!user?.playerId) return;

        const fetchImages = async () => {
            try {
                const res = await api.get(`/profile/photo/${user.playerId}`);

                if (res.data?.profilePhoto) setProfilePhoto(res.data.profilePhoto);
                if (res.data?.bgPhoto) setBgPhoto(res.data.bgPhoto);

            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
    }, [user?.playerId]);

    useEffect(() => {
        if (!user?.playerId) return;

        const getProfileStats = async () => {
            try {
                const [winLoss, bios, levelxp, match, winCount, history, other] = await Promise.all([
                    api.get(`/profile/totalwinloss/${user.playerId}`),
                    api.get(`/profile/bioscount/${user.playerId}`),
                    api.get(`/profile/levelxp/${user.playerId}`),
                    api.get(`/profile/gamecount/${user.playerId}`),
                    api.get(`/profile/gamewin/${user.playerId}`),
                    api.get(`/profile/history/${user.playerId}`),
                    api.get(`/profile/otherstats/${user.playerId}`)
                ]);

                setMatch(winLoss.data.total);
                setWin(winLoss.data.wins);
                setLoss(winLoss.data.losses);

                setBiosWon(bios.data.biosWonCount);
                setBiosLost(bios.data.biosLostCount);

                setLevel(levelxp.data.level);
                setXp(levelxp.data.xp);

                setGameCount(match.data);
                setGameWin(winCount.data);

                setGameHistory(history.data);

                setBestRank(other.data.bestRank);
                setFriend(other.data.friend);

            } catch (error) {
                console.log(error);
            }
        };

        getProfileStats();
    }, [user?.playerId]);

    return (
        <div className="w-full overflow-x-hidden">

            {/* Banner */}
            <div className="relative">
                <img
                    className="h-48 sm:h-64 md:h-75 w-full object-cover"
                    src={bgPhoto || user?.bgPhoto || '/banner.jpg'}
                    alt="Banner"
                />

                <div className="absolute top-0 left-0 w-full px-3 sm:px-6 lg:px-10">
                    <Navbar user={user} textTheme={textTheme} />
                </div>
            </div>

            {/* Profile information */}
            <div className="flex flex-col items-center mx-auto">

                <div className="flex flex-col items-center w-full px-4">

                    <img
                        className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full object-cover border-4 border-base-100 -mt-14 sm:-mt-16 md:-mt-20 z-10"
                        src={profilePhoto || user?.profilePhoto || '/22.png'}
                        alt="Profile"
                    />

                    <div className="font-bold uppercase text-2xl sm:text-3xl mt-3 text-center">
                        {user?.userName}
                    </div>

                    <div className="text-sm">
                        UID : {user?.playerId}
                    </div>
                </div>

                <div className="my-5 px-3 w-full flex justify-center">
                    <Chartlevel level={level} xp={xp} />
                </div>
            </div>

            {/* Main statistics */}
            <div className="mb-12 mt-5 px-4 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 max-w-6xl mx-auto">

                <div className="flex gap-2 items-center justify-center">
                    <div className="h-14 w-14 sm:h-17 sm:w-17 border-2 border-primary bg-base-200 rounded-2xl flex justify-center items-center shrink-0">
                        <Swords />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-2xl sm:text-3xl">{match}</div>
                        <div className="text-sm sm:text-xl font-light">Matches</div>
                    </div>
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <div className="h-14 w-14 sm:h-17 sm:w-17 border-2 border-primary bg-base-300 rounded-2xl flex justify-center items-center shrink-0">
                        <Trophy />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-2xl sm:text-3xl">{win}</div>
                        <div className="text-sm sm:text-xl font-light">Wins</div>
                    </div>
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <div className="h-14 w-14 sm:h-17 sm:w-17 border-2 border-primary bg-base-300 rounded-2xl flex justify-center items-center shrink-0">
                        <ShieldMinus />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-2xl sm:text-3xl">{loss}</div>
                        <div className="text-sm sm:text-xl font-light">Loss</div>
                    </div>
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <div className="h-14 w-14 sm:h-17 sm:w-17 border-2 border-primary bg-base-300 rounded-2xl flex justify-center items-center shrink-0">
                        <Percent />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-2xl sm:text-3xl">
                            {loss === 0 ? win : (win / loss).toFixed(2)}:1
                        </div>
                        <div className="text-sm sm:text-xl font-light">W:L Ratio</div>
                    </div>
                </div>

            </div>

            {/* Secondary statistics */}

            <div className="mt-5 mb-16 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-5xl mx-auto">

                {/* BIOS Statistics */}
                <div className="flex flex-col gap-8 items-center ">
                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <Medal className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">BIOS Won</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">{biosWon}</div>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <TrendingDown className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">BIOS Lost</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">{biosLost}</div>
                        </div>
                    </div>
                </div>

                {/* Streak and Rank */}
                <div className="flex flex-col gap-8 items-center">
                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <Coins className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">Best Streak</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">248</div>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <Crown className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">Best Rank</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">{bestRank}</div>
                        </div>
                    </div>
                </div>

                {/* Achievements and Friends */}
                <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-1 items-center">
                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <Award className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">Achievements</div>
                            <div className="text-lg sm:text-xl lg:text-2xl font-semibold">Coming soon!</div>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 border-2 border-secondary-content bg-base-300 rounded-2xl sm:rounded-3xl flex justify-center items-center shrink-0">
                            <User className="h-6 w-6 sm:h-7 sm:w-8" />
                        </div>
                        <div className="min-w-0">
                            <div className="text-base sm:text-lg lg:text-xl font-light">Friends</div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">{friend}</div>
                        </div>
                    </div>
                </div>

            </div>


            {/* Charts */}
            <div className="mx-3 sm:mx-5 lg:mx-auto mb-12 border-secondary-content/60 bg-base-300 rounded-2xl border max-w-240 overflow-hidden">
                <div className="pt-3 text-center text-xl font-bold">GAMES PLAYED</div>
                <div className="w-full min-w-0 overflow-x-auto">
                    <Chartbar1 gameCount={gameCount} />
                </div>
            </div>

            <div className="mx-3 sm:mx-5 lg:mx-auto mb-12 border-secondary-content/60 bg-base-300 rounded-2xl border max-w-240 overflow-hidden">
                <div className="pt-3 text-center text-xl font-bold">WIN LOSS COUNT</div>
                <div className="w-full min-w-0 overflow-x-auto">
                    <Chartbar2 gameWin={gameWin} />
                </div>
            </div>

            {/* Pie charts */}
            <div className="mb-12 px-3 sm:px-5 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">

                <div className="w-full max-w-80 p-3 border-secondary-content/60 bg-base-300 rounded-2xl border">
                    <Chartpie1 gameWin={gameWin} />
                </div>

                <div className="w-full max-w-80 p-3 border-secondary-content/60 bg-base-300 rounded-2xl border">
                    <Chartpie2 gameCount={gameCount} />
                </div>

            </div>

            {/* Match history */}
            <div className="mb-15 w-full max-w-350 mx-auto px-3 sm:px-5 overflow-x-auto">
                <Matchtable gameHistory={gameHistory} />
            </div>

            <Footer />

        </div>
    )
}

export default profilepage
