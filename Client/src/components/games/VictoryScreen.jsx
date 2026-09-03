import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw } from 'lucide-react';

/**
 * VictoryScreen Component
 * Celebration card displayed when a player cracks the 4-digit code.
 */
export default function VictoryScreen({
  winnerName = "Player",
  winningGuess = "1234",
  betAmount = 100,
  totalGuesses = 0,
  p1Name = "Player 1",
  p2Name = "Player 2",
  p1Secret = "****",
  p2Secret = "****",
  onRematch
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-base-300 border-2 border-yellow-500/60 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/10 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
            className="inline-p-4 bg-yellow-500 text-black rounded-full p-5 shadow-lg shadow-yellow-500/40"
          >
            <Trophy className="w-16 h-16 mx-auto" />
          </motion.div>

          <div>
            <span className="text-xs uppercase font-black tracking-widest text-yellow-500">
              VICTORY UNLOCKED!
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-1">
              {winnerName} Won!
            </h2>
            <p className="text-base-content/70 mt-2 text-sm md:text-base">
              Cracked the secret code <span className="text-yellow-400 font-extrabold tracking-widest font-mono">[{winningGuess}]</span> with 4 Frames!
            </p>
          </div>

          {/* Prize Pot Summary */}
          <div className="bg-base-200 border border-base-content/15 rounded-2xl p-4 max-w-md mx-auto grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs font-bold text-base-content/50 uppercase">BIOS Stake Won</p>
              <p className="text-2xl font-black text-yellow-500">+{betAmount * 2} BIOS</p>
            </div>
            <div>
              <p className="text-xs font-bold text-base-content/50 uppercase">Total Guesses</p>
              <p className="text-2xl font-black text-emerald-400">{totalGuesses}</p>
            </div>
          </div>

          {/* Code Reveal Box */}
          <div className="bg-base-100/60 p-4 rounded-2xl border border-base-content/10 max-w-md mx-auto grid grid-cols-2 gap-4 text-sm font-bold">
            <div>
              <p className="text-xs text-base-content/50">{p1Name}'s Secret</p>
              <p className="text-lg font-mono font-black text-yellow-400">{p1Secret || '****'}</p>
            </div>
            <div>
              <p className="text-xs text-base-content/50">{p2Name}'s Secret</p>
              <p className="text-lg font-mono font-black text-yellow-400">{p2Secret || '****'}</p>
            </div>
          </div>

          {/* Rematch CTA */}
          <button
            onClick={onRematch}
            className="w-full max-w-md py-4 rounded-2xl font-black text-lg bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/30 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" /> Play Rematch / New Game
          </button>
        </div>
      </div>
    </motion.div>
  );
}
