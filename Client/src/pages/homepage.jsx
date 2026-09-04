import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Flame, Sparkles, Swords, Trophy, Compass, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Homepage({ textTheme, user }) {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  // Featured Game Catalog
  const games = [
    {
      id: "unravel",
      title: "UNRAVEL",
      photo: "/unravel_banner.jpg",
      description: "Tactical 2-Player 4-digit code cracking duel. Outsmart your opponent with Frames & Edges!",
      difficulty: "Hard",
      category: "Multiplayer",
      player: "1,240+",
      biosReward: "1,000",
      link: "/unravel",
      isHot: true,
      isNew: true
    },
    {
      id: "handkerchief",
      title: "Drop the Handkerchief",
      photo: "/handkerchief_banner.jpg",
      description: "Timing & bluffing duel between Dropper & Checker. Perfect check (+0s), avoid 60s Foul!",
      difficulty: "Medium",
      category: "Multiplayer",
      player: "980+",
      biosReward: "1,000",
      link: "/handkerchief",
      isHot: true,
      isNew: true
    },
    {
      id: "bloody-dotty",
      title: "Bloody Dotty",
      photo: "/bloody_dotty_banner.jpg",
      description: "Grid conquest strategy game. Stake BIOS and eliminate dots to dominate the match.",
      difficulty: "Medium",
      category: "Strategy",
      player: "850+",
      biosReward: "500",
      link: "/room",
      isHot: true,
      isNew: false
    },
    {
      id: "mind-vault",
      title: "Mind Vault",
      photo: "/mind_vault_banner.jpg",
      description: "Memory sequence & pattern decoder. Fast-paced mental agility challenge.",
      difficulty: "Easy",
      category: "Puzzle",
      player: "620+",
      biosReward: "300",
      link: "/room",
      isHot: false,
      isNew: true
    },
    {
      id: "cyber-matrix",
      title: "Cyber Matrix",
      photo: "/cyber_matrix_banner.jpg",
      description: "Turn-based tactical matrix battle. Out-maneuver enemy tokens to claim victory.",
      difficulty: "Hard",
      category: "Strategy",
      player: "410+",
      biosReward: "750",
      link: "/room",
      isHot: false,
      isNew: false
    }
  ];

  // Upcoming Games
  const upcomingGames = [
    {
      id: "quantum-chess",
      title: "Quantum Chess 2.0",
      photo: "/quantum_chess_banner.jpg",
      description: "Chess augmented with superposition and tactical power cards.",
      difficulty: "Hard",
      category: "Strategy",
      player: "Coming Soon",
      biosReward: "2,000",
      link: "#",
      isHot: false,
      isNew: true
    },
    {
      id: "neon-blitz",
      title: "Neon Blitz",
      photo: "/neon_blitz_banner.jpg",
      description: "Reflex reaction time racing & pattern matching duel.",
      difficulty: "Medium",
      category: "Arcade",
      player: "Coming Soon",
      biosReward: "1,500",
      link: "#",
      isHot: false,
      isNew: true
    }
  ];

  const filteredGames = activeTab === "all"
    ? games
    : games.filter((g) => g.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <>
      <div className="mx-4 md:mx-20 my-5 min-h-screen">
        <Navbar textTheme={textTheme} user={user} />

        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center pt-32 pb-16 min-h-[80vh] text-center">
          <motion.div
            className="max-w-4xl text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold text-xs md:text-sm mb-4 backdrop-blur-md">
              <Sparkles className="w-4 h-4" /> Next-Gen Strategic Gaming Platform
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-none">
              GAME<span className="text-yellow-500">SHELF</span>
            </h1>

            <p className="mt-6 text-base md:text-xl text-base-content/70 max-w-2xl leading-relaxed">
              Challenge your mind, set your BIOS stakes, and duel real opponents across devices in strategic multiplayer games.
            </p>

            {/* Quick Hero CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/unravel")}
                className="btn btn-lg bg-yellow-500 hover:bg-yellow-400 text-black border-none font-black px-8 rounded-2xl shadow-xl shadow-yellow-500/20 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Swords className="w-5 h-5" /> Play Unravel <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate("/room")}
                className="btn btn-lg bg-base-200 hover:bg-base-300 border border-base-content/20 text-base-content font-bold px-8 rounded-2xl backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <Gamepad2 className="w-5 h-5 text-yellow-500" /> Browse Rooms
              </button>
            </div>
          </motion.div>
        </div>

        {/* FEATURED GAMES SECTION (REMADE CARDS) */}
        <div className="mt-12 mb-20 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-base-content/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" /> Discover Arena
              </div>
              <h2 className="text-3xl md:text-5xl font-black">Explore Games</h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 bg-base-200/80 p-1.5 rounded-2xl border border-base-content/15 backdrop-blur-md">
              {[
                { id: "all", label: "All Games", icon: Flame },
                { id: "multiplayer", label: "Multiplayer", icon: Swords },
                { id: "strategy", label: "Strategy", icon: Trophy }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                        : "text-base-content/70 hover:text-base-content hover:bg-base-300/50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          >
            <AnimatePresence>
              {filteredGames.map((game) => (
                <Card key={game.id} {...game} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* UPCOMING GAMES SECTION */}
        <div className="mt-20 mb-20 space-y-8">
          <div className="border-b border-base-content/10 pb-6">
            <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Next Releases
            </div>
            <h2 className="text-3xl md:text-4xl font-black">Upcoming Arena Games</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {upcomingGames.map((game) => (
              <Card key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
