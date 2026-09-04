import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, RefreshCw } from 'lucide-react';

export default function CoinToss({ p1Name = "Player 1", p2Name = "Player 2", onTossComplete }) {
  const [selectedChoice, setSelectedChoice] = useState('HEADS');
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResult, setFlipResult] = useState(null);
  const [roles, setRoles] = useState(null);

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipResult(null);
    setRoles(null);

    const outcome = Math.random() < 0.5 ? 'HEADS' : 'TAILS';

    setTimeout(() => {
      setFlipResult(outcome);
      setIsFlipping(false);

      const p1Won = outcome === selectedChoice;
      const assignedRoles = p1Won
        ? { dropper: p1Name, checker: p2Name, winnerName: p1Name }
        : { dropper: p2Name, checker: p1Name, winnerName: p2Name };

      setRoles(assignedRoles);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-base-300 border border-base-content/15 rounded-3xl p-6 md:p-8 shadow-xl text-center space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-black">Role Toss</h2>
          <p className="text-xs text-base-content/70 mt-1">
            <span className="font-bold text-yellow-400">{p1Name}</span>, pick Heads or Tails to decide who drops first!
          </p>
        </div>

        {/* Clean Minimal Coin Display */}
        <div className="py-4 flex justify-center items-center">
          <motion.div
            className="w-24 h-24 rounded-full border-2 border-yellow-400/80 bg-linear-to-b from-yellow-400 to-amber-500 text-black flex flex-col items-center justify-center font-black shadow-lg shadow-yellow-500/20 select-none"
            animate={
              isFlipping
                ? {
                    rotateY: [0, 720, 1440],
                    scale: [1, 1.15, 1],
                  }
                : { scale: 1 }
            }
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <span className="text-2xl">{flipResult === 'TAILS' ? '🪙' : '👑'}</span>
            <span className="text-[11px] font-black tracking-wider uppercase mt-0.5">
              {isFlipping ? '...' : flipResult || selectedChoice}
            </span>
          </motion.div>
        </div>

        {/* Heads / Tails Selector & Flip Button */}
        {!roles ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isFlipping}
                onClick={() => setSelectedChoice('HEADS')}
                className={`py-3 rounded-2xl font-black text-sm border transition-all cursor-pointer ${
                  selectedChoice === 'HEADS'
                    ? 'bg-yellow-500 text-black border-yellow-400 shadow-md'
                    : 'bg-base-200 border-base-content/15 text-base-content hover:bg-base-100'
                }`}
              >
                👑 Heads
              </button>
              <button
                type="button"
                disabled={isFlipping}
                onClick={() => setSelectedChoice('TAILS')}
                className={`py-3 rounded-2xl font-black text-sm border transition-all cursor-pointer ${
                  selectedChoice === 'TAILS'
                    ? 'bg-yellow-500 text-black border-yellow-400 shadow-md'
                    : 'bg-base-200 border-base-content/15 text-base-content hover:bg-base-100'
                }`}
              >
                🪙 Tails
              </button>
            </div>

            <button
              onClick={handleFlip}
              disabled={isFlipping}
              className="btn btn-primary text-primary-content w-full py-3.5 rounded-2xl font-black text-sm shadow-md cursor-pointer disabled:opacity-50"
            >
              {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
          </div>
        ) : (
          /* Simple Clean Result Card */
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-base-200 rounded-2xl border border-base-content/10 space-y-3">
              <div className="text-xs font-bold text-yellow-400">
                Landed on <strong>{flipResult}</strong>!
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-base-100 rounded-xl">
                  <span className="text-[10px] text-base-content/60 font-bold uppercase block">Dropper</span>
                  <span className="font-extrabold text-emerald-400 truncate block mt-0.5">{roles.dropper}</span>
                </div>
                <div className="p-2.5 bg-base-100 rounded-xl">
                  <span className="text-[10px] text-base-content/60 font-bold uppercase block">Checker</span>
                  <span className="font-extrabold text-cyan-400 truncate block mt-0.5">{roles.checker}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleFlip}
                className="btn btn-outline border-base-content/20 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Re-flip"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onTossComplete && onTossComplete(roles)}
                className="btn btn-primary text-primary-content flex-1 py-3.5 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Game <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
