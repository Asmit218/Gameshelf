import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

/**
 * UnravelRulesModal Component
 * Interactive modal explaining Frame & Edge hint logic for Unravel.
 */
export default function UnravelRulesModal({ isOpen = false, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-base-300 border-2 border-base-content/20 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-base-content/10">
          <h3 className="text-2xl font-black flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-yellow-500" /> How to Play Unravel
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm text-base-content/80">
          <div className="p-3 bg-base-200 rounded-2xl border border-base-content/10">
            <p className="font-bold text-yellow-500 mb-1">1. Stake Your BIOS Bet</p>
            <p>Both players agree on a BIOS bet amount. The winner takes the entire stake pot!</p>
          </div>

          <div className="p-3 bg-base-200 rounded-2xl border border-base-content/10">
            <p className="font-bold text-yellow-500 mb-1">2. Lock Secret 4-Digit Code</p>
            <p>Each player secretly sets a 4-digit code (e.g. 1425). Keep your code hidden from your opponent!</p>
          </div>

          <div className="p-3 bg-base-200 rounded-2xl border border-base-content/10">
            <p className="font-bold text-yellow-500 mb-1">3. Take Turns & Decode Hints</p>
            <p className="mb-2">Every turn, guess your opponent's 4-digit code to receive hints:</p>
            <ul className="space-y-1 list-disc pl-5">
              <li>
                <span className="font-bold text-emerald-400">🟩 Frame:</span> A digit is correct and in the EXACT position.
              </li>
              <li>
                <span className="font-bold text-amber-400">🟨 Edge:</span> A digit is correct but in the WRONG position.
              </li>
            </ul>
          </div>

          <div className="p-3 bg-base-200 rounded-2xl border border-base-content/10">
            <p className="font-bold text-yellow-500 mb-1">4. Win Condition</p>
            <p>First player to achieve <span className="font-extrabold text-emerald-400">4 Frames</span> cracks the opponent's code and wins the match!</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-yellow-500 text-black font-black rounded-xl hover:bg-yellow-400 transition-all cursor-pointer"
        >
          Got It! Back to Game
        </button>
      </motion.div>
    </div>
  );
}
