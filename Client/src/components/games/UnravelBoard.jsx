import React from 'react';
import { UserCheck } from 'lucide-react';

/**
 * UnravelBoard Component
 * Displays a player's attempt log table with Frame & Edge hint calculation indicators.
 */
export default function UnravelBoard({
  playerName = "Player",
  targetName = "Opponent",
  guesses = [],
  isCurrentTurn = false
}) {
  return (
    <div className={`bg-base-300 border-2 rounded-3xl p-6 shadow-xl ${isCurrentTurn ? 'border-yellow-500/80 ring-2 ring-yellow-500/20' : 'border-base-content/15'}`}>
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-base-content/10">
        <div>
          <h3 className="font-extrabold text-lg flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-yellow-500" /> {playerName}'s Guesses
          </h3>
          <p className="text-xs text-base-content/60">Target: {targetName}'s Code</p>
        </div>
        <span className="text-xs font-black bg-base-200 px-3 py-1.5 rounded-xl border border-base-content/10">
          {guesses.length} Attempts
        </span>
      </div>

      {/* Guess Log Table */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {guesses.length === 0 ? (
          <div className="text-center py-10 text-base-content/40 text-sm font-semibold">
            No guesses made yet.
          </div>
        ) : (
          guesses.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-base-200/70 p-3 rounded-2xl border border-base-content/10 font-bold text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-base-content/50 w-6">#{item.turn}</span>
                <span className="text-xl font-mono font-black tracking-widest text-yellow-400">
                  {item.guess}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-xl text-xs">
                  🟩 {item.frames} Frame
                </span>
                <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-xl text-xs">
                  🟨 {item.edges} Edge
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
