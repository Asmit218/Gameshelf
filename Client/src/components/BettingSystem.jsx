import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * Reusable BettingSystem Component
 * Used across all games in GameShelf to handle BIOS coin stakes and bet confirmations.
 */
export default function BettingSystem({
  betAmount = 100,
  setBetAmount,
  p1Name = "Player 1",
  p2Name = "Player 2",
  p1BetConfirmed = false,
  p2BetConfirmed = false,
  myRole = 1,
  isOnline = false,
  onConfirmBet,
  betPresets = [50, 100, 250, 500, 1000],
  gameTitle = "BIOS Betting System"
}) {
  const isMyConfirmDisabled = isOnline
    ? (myRole === 1 && p1BetConfirmed) || (myRole === 2 && p2BetConfirmed)
    : (p1BetConfirmed && p2BetConfirmed);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-base-300 border-2 border-secondary-content/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-p-3 bg-yellow-500/20 text-yellow-500 rounded-full p-4 mb-4">
            <Coins className="w-10 h-10 mx-auto" />
          </div>
          <h2 className="text-3xl font-black">{gameTitle}</h2>
          <p className="text-sm text-base-content/70 mt-1">
            Both players agree to put up this amount of BIOS coins into the winner pot.
          </p>
        </div>

        <div className="space-y-6">
          {/* Preset Bet Buttons (Editable by Host in Online or any player in Local) */}
          {(!isOnline || myRole === 1) ? (
            <div>
              <label className="text-xs uppercase font-bold text-base-content/60 mb-2 block text-center">
                Select BIOS Stake
              </label>
              <div className="grid grid-cols-5 gap-3">
                {betPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBetAmount && setBetAmount(preset)}
                    className={`py-3 rounded-2xl font-black text-sm md:text-base border-2 transition-all cursor-pointer ${
                      betAmount === preset
                        ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/20 scale-105'
                        : 'bg-base-200 border-base-content/15 hover:border-yellow-500/50'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-4 bg-base-200 rounded-2xl border border-yellow-500/30">
              <p className="text-xs text-base-content/60 uppercase font-bold">Host Set Stake To</p>
              <p className="text-4xl font-black text-yellow-500 mt-1">{betAmount} BIOS</p>
            </div>
          )}

          {/* Custom Bet Input */}
          {(!isOnline || myRole === 1) && (
            <div className="flex flex-col items-center">
              <label className="text-xs uppercase font-bold text-base-content/60 mb-2">
                Or Custom Stake
              </label>
              <div className="relative w-48">
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={betAmount}
                  onChange={(e) => setBetAmount && setBetAmount(Math.max(10, parseInt(e.target.value) || 0))}
                  className="w-full bg-base-100 border-2 border-base-content/20 text-center font-black text-xl py-2 px-4 rounded-2xl focus:border-yellow-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs font-bold text-yellow-500">BIOS</span>
              </div>
            </div>
          )}

          {/* Bet Confirmation Status */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`p-3 rounded-2xl border ${p1BetConfirmed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-base-200 border-base-content/15'}`}>
              <p className="text-xs font-bold">{p1Name}</p>
              <p className="text-sm font-black mt-0.5">{p1BetConfirmed ? '✓ Confirmed' : 'Waiting...'}</p>
            </div>
            <div className={`p-3 rounded-2xl border ${p2BetConfirmed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-base-200 border-base-content/15'}`}>
              <p className="text-xs font-bold">{p2Name}</p>
              <p className="text-sm font-black mt-0.5">{p2BetConfirmed ? '✓ Confirmed' : 'Waiting...'}</p>
            </div>
          </div>

          {/* Total Stake Pot Indicator */}
          <div className="text-center p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
            <span className="text-xs font-bold uppercase text-yellow-500">Winner Takes Pot: </span>
            <span className="text-lg font-black text-yellow-400">{betAmount * 2} BIOS</span>
          </div>

          {/* Confirm Bet Action CTA */}
          <button
            onClick={onConfirmBet}
            disabled={isMyConfirmDisabled}
            className="w-full py-4 rounded-2xl font-black text-lg bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 cursor-pointer"
          >
            <Lock className="w-5 h-5" />
            {isMyConfirmDisabled
              ? 'Waiting for Opponent to Confirm...'
              : 'Lock Bet & Proceed'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
