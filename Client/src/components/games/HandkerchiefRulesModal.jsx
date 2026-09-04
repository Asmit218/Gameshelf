import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertTriangle, ShieldCheck, Clock, RefreshCw, Trophy, Flame } from 'lucide-react';

export default function HandkerchiefRulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-base-300 border-2 border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-base-200 hover:bg-base-100 border border-base-content/20 text-base-content/70 hover:text-base-content transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-xs uppercase tracking-widest border border-yellow-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Game Master Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              Drop the <span className="text-yellow-500">Handkerchief</span>
            </h2>
            <p className="text-xs md:text-sm text-base-content/70 max-w-md mx-auto">
              A 2-player high-stakes tactical timing duel of bluffing, patience, and reaction!
            </p>
          </div>

          {/* Rules Cards */}
          <div className="space-y-4 text-xs md:text-sm">
            {/* 1. Roles & Coin Toss */}
            <div className="p-4 bg-base-200/80 rounded-2xl border border-base-content/10 space-y-2">
              <h3 className="font-extrabold text-base flex items-center gap-2 text-yellow-400">
                <span>🪙</span> 1. Coin Toss & Roles
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                Players toss a coin to decide initial roles:
              </p>
              <ul className="list-disc list-inside space-y-1 text-base-content/70">
                <li><strong className="text-emerald-400">Dropper</strong>: Secretly chooses a drop time between <strong>0s and 60s</strong>.</li>
                <li><strong className="text-cyan-400">Checker</strong>: Guesses when the handkerchief was dropped (between <strong>0s and 60s</strong>).</li>
              </ul>
            </div>

            {/* 2. Scoring & Time Penalties */}
            <div className="p-4 bg-base-200/80 rounded-2xl border border-base-content/10 space-y-3">
              <h3 className="font-extrabold text-base flex items-center gap-2 text-amber-400">
                <Clock className="w-5 h-5 text-amber-400" /> 2. Time Penalties & Calculations
              </h3>
              <p className="text-base-content/80">
                Both players start with <strong>0s</strong> in their Time Account. The Checker's guess determines penalty seconds:
              </p>

              <div className="grid md:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" /> Perfect Check
                  </div>
                  <p className="text-[11px] text-emerald-300 font-mono">Guess === Drop Time</p>
                  <p className="text-xs font-black text-emerald-400 mt-1">+0s (Flawless!)</p>
                </div>

                <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-cyan-400 font-bold mb-1">
                    <Clock className="w-4 h-4" /> Delay
                  </div>
                  <p className="text-[11px] text-cyan-300 font-mono">Guess &gt; Drop Time</p>
                  <p className="text-xs font-black text-cyan-400 mt-1">+(Guess - Drop)s</p>
                </div>

                <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-500/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-rose-400 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4" /> Failed Check!
                  </div>
                  <p className="text-[11px] text-rose-300 font-mono">Guess &lt; Drop Time</p>
                  <p className="text-xs font-black text-rose-400 mt-1">+60s Penalty</p>
                </div>
              </div>
            </div>

            {/* 3. Role Rotation & 300s Elimination Limit */}
            <div className="p-4 bg-base-200/80 rounded-2xl border border-base-content/10 space-y-2">
              <h3 className="font-extrabold text-base flex items-center gap-2 text-rose-400">
                <Flame className="w-5 h-5 text-rose-400" /> 3. Role Rotation & 300s Loss Threshold
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-base-content/80 leading-relaxed">
                <li>Roles <strong>swap automatically</strong> after each round (Dropper becomes Checker & vice-versa).</li>
                <li>The first player whose accumulated time account reaches or exceeds <strong>300 seconds</strong> loses the game!</li>
                <li>The surviving player claims the staked <strong>BIOS tokens</strong>!</li>
              </ul>
            </div>
          </div>

          {/* Action button */}
          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="btn btn-primary text-primary-content font-extrabold px-10 py-3 rounded-2xl text-sm shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              Got It, Let's Play!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
