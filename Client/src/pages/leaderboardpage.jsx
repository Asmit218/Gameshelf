import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Crown,
  Medal,
  Coins,
  Flame,
  User,
  Sparkles,
  Zap,
  Shield,
  LogIn,
  ArrowUpRight,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Leaderboardpage({ textTheme, user }) {
  const [type, setType] = useState("wins");
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLb = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leaderboard", {
        params: {
          type,
          limit: 20,
        },
        withCredentials: true,
      });
      setData(res.data.leaderboard || []);
      setCurrentUser(res.data.currentUser || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLb();
  }, [type]);

  const top3 = data.slice(0, 3);
  const remainingPlayers = data.slice(3);

  // Helper for rank badge styling
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 text-black flex items-center justify-center font-black shadow-lg shadow-yellow-500/40 text-sm">
          <Crown className="w-4 h-4 fill-current" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-black flex items-center justify-center font-black shadow-md shadow-slate-400/30 text-sm">
          <Medal className="w-4 h-4 fill-current" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-black shadow-md shadow-amber-700/30 text-sm">
          <Medal className="w-4 h-4 fill-current" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-base-300 border border-base-content/15 text-base-content/80 flex items-center justify-center font-bold text-xs">
        #{rank}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="mx-4 sm:mx-8 md:mx-20 my-5 pb-24">
        <Navbar user={user} textTheme={textTheme} />

        {/* HEADER SECTION */}
        <div className="pt-28 pb-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold text-xs md:text-sm mb-3 backdrop-blur-md">
              <Trophy className="w-4 h-4" /> Global Hall of Fame
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">
              LEADER<span className="text-yellow-500">BOARD</span>
            </h1>
            <p className="text-base-content/70 mt-2 max-w-lg text-sm md:text-base">
              The fiercest tacticians on GameShelf. Climb the ranks by winning matches and stacking BIOS stakes!
            </p>

            {/* TAB SELECTOR */}
            <div className="mt-8 inline-flex p-1.5 bg-base-200/90 border border-base-content/15 rounded-2xl shadow-xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => setType("wins")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all cursor-pointer ${
                  type === "wins"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 scale-[1.02]"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-300/60"
                }`}
              >
                <Flame className="w-4 h-4" /> Matches Won
              </button>
              <button
                type="button"
                onClick={() => setType("bios")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all cursor-pointer ${
                  type === "bios"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/25 scale-[1.02]"
                    : "text-base-content/70 hover:text-base-content hover:bg-base-300/60"
                }`}
              >
                <Coins className="w-4 h-4" /> BIOS Balance
              </button>
            </div>
          </motion.div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <span className="loading loading-bars loading-lg text-yellow-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-base-content/60">
              Loading rankings...
            </span>
          </div>
        )}

        {/* AUTH CHECK & CONTENT */}
        {!loading && !currentUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-base-200/90 border border-base-content/15 shadow-2xl backdrop-blur-md text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/10">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black">Authentication Required</h3>
              <p className="text-xs text-base-content/70 mt-1.5">
                Sign in to your GameShelf account to view your global ranking and compete on the leaderboard.
              </p>
            </div>
            <Link
              to="/login"
              className="btn btn-primary bg-yellow-500 hover:bg-yellow-400 text-black border-none font-black w-full rounded-2xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Login to Continue <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {!loading && currentUser && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* TOP 3 PODIUM SECTION */}
            {data.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end pt-4 pb-2">
                {/* 2ND PLACE (SILVER) */}
                {top3[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="order-2 md:order-1 rounded-3xl bg-base-200/80 border border-slate-400/30 p-6 flex flex-col items-center text-center shadow-xl hover:border-slate-400/60 transition-all backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/10 rounded-full blur-xl" />
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 text-black font-black text-xl flex items-center justify-center shadow-lg shadow-slate-400/30 mb-3 border-2 border-slate-300">
                      🥈
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      Rank #2 • Silver
                    </span>
                    <h3 className="text-lg font-black truncate max-w-[200px]">
                      {top3[1].userName}
                    </h3>
                    <div className="mt-3 py-1.5 px-4 rounded-xl bg-base-300/80 border border-base-content/10 flex items-center gap-2 text-sm font-black text-slate-200">
                      {type === "wins" ? (
                        <>
                          <Flame className="w-4 h-4 text-orange-400" /> {top3[1].wins} Wins
                        </>
                      ) : (
                        <>
                          <Coins className="w-4 h-4 text-yellow-400" /> {top3[1].bios?.toLocaleString()} BIOS
                        </>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-base-content/60 mt-2 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" /> {top3[1].xp || 0} XP
                    </div>
                  </motion.div>
                )}

                {/* 1ST PLACE (GOLD - ELEVATED) */}
                {top3[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-yellow-500/15 via-base-200/90 to-base-200/90 border-2 border-yellow-500/50 p-8 flex flex-col items-center text-center shadow-2xl shadow-yellow-500/10 hover:border-yellow-400 transition-all backdrop-blur-md relative overflow-hidden md:-translate-y-4"
                  >
                    <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl" />
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-300 to-amber-500 text-black font-black text-3xl flex items-center justify-center shadow-xl shadow-yellow-500/40 mb-3 border-2 border-yellow-200 animate-pulse">
                      👑
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-yellow-500 flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Champion • Rank #1
                    </span>
                    <h3 className="text-2xl font-black text-white truncate max-w-[240px]">
                      {top3[0].userName}
                    </h3>
                    <div className="mt-4 py-2 px-5 rounded-2xl bg-yellow-500 text-black flex items-center gap-2 text-base font-black shadow-lg shadow-yellow-500/30">
                      {type === "wins" ? (
                        <>
                          <Flame className="w-5 h-5 fill-current" /> {top3[0].wins} Wins
                        </>
                      ) : (
                        <>
                          <Coins className="w-5 h-5 fill-current" /> {top3[0].bios?.toLocaleString()} BIOS
                        </>
                      )}
                    </div>
                    <div className="text-xs font-bold text-base-content/70 mt-2.5 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" /> {top3[0].xp || 0} XP
                    </div>
                  </motion.div>
                )}

                {/* 3RD PLACE (BRONZE) */}
                {top3[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="order-3 rounded-3xl bg-base-200/80 border border-amber-700/30 p-6 flex flex-col items-center text-center shadow-xl hover:border-amber-700/60 transition-all backdrop-blur-md relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-24 h-24 bg-amber-700/10 rounded-full blur-xl" />
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-amber-800/30 mb-3 border-2 border-amber-600">
                      🥉
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">
                      Rank #3 • Bronze
                    </span>
                    <h3 className="text-lg font-black truncate max-w-[200px]">
                      {top3[2].userName}
                    </h3>
                    <div className="mt-3 py-1.5 px-4 rounded-xl bg-base-300/80 border border-base-content/10 flex items-center gap-2 text-sm font-black text-amber-400">
                      {type === "wins" ? (
                        <>
                          <Flame className="w-4 h-4 text-orange-400" /> {top3[2].wins} Wins
                        </>
                      ) : (
                        <>
                          <Coins className="w-4 h-4 text-yellow-400" /> {top3[2].bios?.toLocaleString()} BIOS
                        </>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-base-content/60 mt-2 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" /> {top3[2].xp || 0} XP
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* FULL RANKINGS TABLE */}
            <div className="rounded-3xl bg-base-200/90 border border-base-content/15 shadow-2xl overflow-hidden backdrop-blur-md">
              <div className="p-5 md:p-6 border-b border-base-content/10 flex justify-between items-center bg-base-300/40">
                <div className="flex items-center gap-2.5 font-black text-base md:text-lg">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Top 20 Competitors</span>
                </div>
                <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">
                  Updated Live
                </span>
              </div>

              {/* Table Column Headers */}
              <div className="grid grid-cols-12 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-base-content/50 border-b border-base-content/10 bg-base-300/20">
                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                <div className="col-span-6 md:col-span-5 text-left pl-2">Player</div>
                <div className="col-span-4 md:col-span-3 text-right md:text-center">
                  {type === "wins" ? "Matches Won" : "BIOS Balance"}
                </div>
                <div className="hidden md:block md:col-span-3 text-right pr-4">XP Level</div>
              </div>

              {/* Player Rows */}
              <div className="divide-y divide-base-content/5">
                {data.map((player) => {
                  const isMe = player.playerId === currentUser?.playerId;
                  return (
                    <motion.div
                      key={player.playerId}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                      className={`grid grid-cols-12 px-6 py-4 items-center transition-colors ${
                        isMe ? "bg-yellow-500/10 border-l-4 border-yellow-500" : ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-2 md:col-span-1 flex justify-center">
                        {getRankBadge(player.rank)}
                      </div>

                      {/* Player Info */}
                      <div className="col-span-6 md:col-span-5 flex items-center gap-3 pl-2 truncate">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500/20 to-amber-500/30 border border-yellow-500/30 text-yellow-500 font-black text-sm flex items-center justify-center shrink-0">
                          {player.userName ? player.userName.charAt(0).toUpperCase() : "P"}
                        </div>
                        <div className="truncate">
                          <div className="font-extrabold text-sm md:text-base flex items-center gap-1.5 truncate">
                            <span className="truncate">{player.userName}</span>
                            {isMe && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-yellow-500 text-black shrink-0">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-base-content/50 block truncate">
                            ID: {player.playerId}
                          </span>
                        </div>
                      </div>

                      {/* Score (Wins or Bios) */}
                      <div className="col-span-4 md:col-span-3 text-right md:text-center">
                        <span className="font-mono font-black text-sm md:text-base text-yellow-500">
                          {type === "wins"
                            ? `${player.wins} W`
                            : `${player.bios?.toLocaleString()} BIOS`}
                        </span>
                      </div>

                      {/* XP */}
                      <div className="hidden md:flex md:col-span-3 justify-end items-center gap-1.5 pr-4 text-xs font-mono font-bold text-base-content/70">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{player.xp || 0} XP</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CURRENT USER STICKY / HIGHLIGHTED CARD */}
            {currentUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-6 rounded-3xl bg-base-300/95 border-2 border-yellow-500/60 p-4 md:p-5 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-500 text-black font-black flex items-center justify-center text-base shadow-lg shadow-yellow-500/30">
                    #{currentUser.rank || "-"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-500">
                        Your Global Standing
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/40">
                        Active
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-black">{currentUser.userName}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-base-content/60 uppercase block">
                      {type === "wins" ? "Total Wins" : "BIOS Stack"}
                    </span>
                    <span className="font-mono font-black text-base md:text-lg text-yellow-500">
                      {type === "wins"
                        ? `${currentUser.wins} Wins`
                        : `${currentUser.bios?.toLocaleString()} BIOS`}
                    </span>
                  </div>

                  <div className="hidden sm:block text-right border-l border-base-content/15 pl-6">
                    <span className="text-[10px] font-bold text-base-content/60 uppercase block">
                      XP Rank
                    </span>
                    <span className="font-mono font-bold text-sm md:text-base text-cyan-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {currentUser.xp || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}