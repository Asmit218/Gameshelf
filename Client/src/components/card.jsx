import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Users, Flame, Sparkles, ArrowRight, Grid, Brain, Cpu, ShieldAlert, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function SimplisticBanner({ id, title }) {
  if (id === 'unravel') {
    return (
      <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-yellow-500/30 overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
        <div className="flex gap-2">
          {['8', '4', '9', '2'].map((digit, idx) => (
            <div
              key={idx}
              className={`w-10 h-12 rounded-xl flex items-center justify-center text-xl font-black font-mono border ${
                idx === 0
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-md shadow-emerald-500/20'
                  : idx === 1
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                  : 'bg-base-300/80 text-yellow-400 border-base-content/20'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-3 text-[10px] font-bold">
          <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">🟩 1 Frame</span>
          <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/30">🟨 1 Edge</span>
        </div>
      </div>
    );
  }

  if (id === 'bloody-dotty') {
    return (
      <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-rose-500/30 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="flex items-center gap-2 mb-2 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 text-rose-400 text-xs font-black">
          <Grid className="w-3.5 h-3.5" /> Grid Conquest
        </div>
        <div className="grid grid-cols-4 gap-3 z-10 my-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className={`w-3.5 h-3.5 rounded-full ${
                n % 2 === 0
                  ? 'bg-rose-500 shadow-lg shadow-rose-500/80 animate-pulse'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-extrabold text-rose-400 tracking-wider uppercase mt-2">Node Dominance</span>
      </div>
    );
  }

  if (id === 'mind-vault') {
    return (
      <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-cyan-500/30 overflow-hidden">
        <div className="absolute w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" />
        <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/40 mb-2 shadow-lg shadow-cyan-500/20">
          <Brain className="w-8 h-8" />
        </div>
        <span className="text-xs font-extrabold text-cyan-400 tracking-widest uppercase">Memory Sequence</span>
      </div>
    );
  }

  if (id === 'cyber-matrix') {
    return (
      <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-purple-500/30 overflow-hidden">
        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/40 mb-2 shadow-lg shadow-purple-500/20">
          <Cpu className="w-8 h-8" />
        </div>
        <span className="text-xs font-extrabold text-purple-400 tracking-widest uppercase">Tactical Matrix</span>
      </div>
    );
  }

  if (id === 'quantum-chess') {
    return (
      <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-indigo-500/30 overflow-hidden">
        <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/40 mb-2 shadow-lg shadow-indigo-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-extrabold text-indigo-400 tracking-widest uppercase">Quantum Superposition</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-44 bg-slate-950 flex flex-col items-center justify-center p-4 border-b border-yellow-500/30 overflow-hidden">
      <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-2xl border border-yellow-500/40 mb-2 shadow-lg shadow-yellow-500/20">
        <Zap className="w-8 h-8" />
      </div>
      <span className="text-xs font-extrabold text-yellow-400 tracking-widest uppercase">Arcade Speed</span>
    </div>
  );
}

export default function Card({
  id = "unravel",
  photo = "/unravel_banner.jpg",
  title = "Game Title",
  description = "Challenge your mind in this multiplayer tactical game.",
  difficulty = "Medium",
  category = "Strategy",
  player = "100+",
  biosReward = "500",
  link = "/unravel",
  isHot = false,
  isNew = false
}) {
  const navigate = useNavigate();

  const difficultyColors = {
    Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Hard: "bg-rose-500/20 text-rose-400 border-rose-500/30"
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(link)}
      className="group relative flex flex-col justify-between w-72 md:w-80 rounded-3xl bg-base-200/90 border border-base-content/15 hover:border-yellow-500/50 shadow-xl hover:shadow-yellow-500/10 overflow-hidden cursor-pointer backdrop-blur-md transition-all duration-300"
    >
      {/* Top Media Banner */}
      <div className="relative w-full h-44 overflow-hidden">
        <SimplisticBanner id={id} photo={photo} title={title} />

        {/* Badges on Top of Image */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
          {isHot && (
            <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/40">
              <Flame className="w-3 h-3 fill-current" /> HOT
            </span>
          )}
          {isNew && (
            <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-yellow-500 text-black shadow-lg shadow-yellow-500/40">
              <Sparkles className="w-3 h-3" /> NEW
            </span>
          )}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${difficultyColors[difficulty] || difficultyColors.Medium}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-yellow-500 mb-1">
            <span className="uppercase tracking-wider font-bold">{category}</span>
            <span className="flex items-center gap-1 text-base-content/60">
              <Users className="w-3.5 h-3.5" /> {player} Playing
            </span>
          </div>

          <h3 className="text-xl font-black group-hover:text-yellow-500 transition-colors">
            {title}
          </h3>

          <p className="text-xs text-base-content/70 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Card Footer Action Row */}
        <div className="pt-3 border-t border-base-content/10 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs font-black text-yellow-500">
            <Coins className="w-4 h-4" />
            <span>Up to {biosReward} BIOS</span>
          </div>

          <button className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-2 rounded-xl bg-yellow-500 text-black group-hover:bg-yellow-400 transition-all shadow-md group-hover:shadow-yellow-500/30">
            Play Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

