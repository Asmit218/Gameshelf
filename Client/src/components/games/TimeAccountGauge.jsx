import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, ShieldCheck, User } from 'lucide-react';

const MAX_TIME = 300;

export default function TimeAccountGauge({
  p1Name = "Player 1",
  p2Name = "Player 2",
  p1Time = 0,
  p2Time = 0,
  currentDropper = "",
  currentChecker = ""
}) {
  const getProgressColor = (time) => {
    const percentage = (time / MAX_TIME) * 100;
    if (percentage >= 80) return 'from-rose-600 to-red-500';
    if (percentage >= 50) return 'from-amber-500 to-orange-500';
    return 'from-emerald-500 to-teal-400';
  };

  const getTextColor = (time) => {
    const percentage = (time / MAX_TIME) * 100;
    if (percentage >= 80) return 'text-rose-400';
    if (percentage >= 50) return 'text-amber-400';
    return 'text-emerald-400';
  };

  const p1Percent = Math.min(100, Math.max(0, (p1Time / MAX_TIME) * 100));
  const p2Percent = Math.min(100, Math.max(0, (p2Time / MAX_TIME) * 100));

  return (
    <div className="bg-base-300/80 border border-base-content/15 rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-md space-y-5">
      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-base-content/60">
        <span className="flex items-center gap-1.5 text-yellow-500">
          <Clock className="w-4 h-4" /> Time Accounts (Loss at 300s)
        </span>
        <span className="text-[11px] font-mono text-base-content/50">Threshold: 300.0s</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* P1 Gauge */}
        <div className="space-y-2 p-3 bg-base-200/60 rounded-2xl border border-base-content/10">
          <div className="flex justify-between items-center text-xs font-black">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-yellow-500/20 text-yellow-400">
                <User className="w-3.5 h-3.5" />
              </span>
              <span className="truncate max-w-[140px] text-sm">{p1Name}</span>
              {currentDropper === p1Name && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Dropper
                </span>
              )}
              {currentChecker === p1Name && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                  Checker
                </span>
              )}
            </div>
            <span className={`text-base font-black font-mono ${getTextColor(p1Time)}`}>
              {p1Time.toFixed(1)}s <span className="text-xs text-base-content/40">/ {MAX_TIME}s</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-3.5 bg-base-100 rounded-full overflow-hidden p-0.5 border border-base-content/10">
            <motion.div
              className={`h-full rounded-full bg-linear-to-r ${getProgressColor(p1Time)} shadow-md`}
              initial={{ width: 0 }}
              animate={{ width: `${p1Percent}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-base-content/40 px-1">
            <span>0s (Safe)</span>
            <span>150s</span>
            <span className="text-rose-400">300s (Out)</span>
          </div>
        </div>

        {/* P2 Gauge */}
        <div className="space-y-2 p-3 bg-base-200/60 rounded-2xl border border-base-content/10">
          <div className="flex justify-between items-center text-xs font-black">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-yellow-500/20 text-yellow-400">
                <User className="w-3.5 h-3.5" />
              </span>
              <span className="truncate max-w-[140px] text-sm">{p2Name}</span>
              {currentDropper === p2Name && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Dropper
                </span>
              )}
              {currentChecker === p2Name && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                  Checker
                </span>
              )}
            </div>
            <span className={`text-base font-black font-mono ${getTextColor(p2Time)}`}>
              {p2Time.toFixed(1)}s <span className="text-xs text-base-content/40">/ {MAX_TIME}s</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-3.5 bg-base-100 rounded-full overflow-hidden p-0.5 border border-base-content/10">
            <motion.div
              className={`h-full rounded-full bg-linear-to-r ${getProgressColor(p2Time)} shadow-md`}
              initial={{ width: 0 }}
              animate={{ width: `${p2Percent}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-base-content/40 px-1">
            <span>0s (Safe)</span>
            <span>150s</span>
            <span className="text-rose-400">300s (Out)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
