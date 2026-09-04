import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  Trophy,
  History,
  Lock
} from 'lucide-react';
import CoinToss from '../../../components/games/CoinToss';
import TimeAccountGauge from '../../../components/games/TimeAccountGauge';

const MAX_PENALTY_TIME = 300;

export default function LocalHandkerchief({ user }) {
  // Phase: 'TOSS' | 'DROPPER_PASS' | 'DROPPER_INPUT' | 'CHECKER_PASS' | 'CHECKER_INPUT' | 'ROUND_REVEAL' | 'GAME_OVER'
  const [phase, setPhase] = useState('TOSS');

  const [p1Name, setP1Name] = useState(user?.userName || user?.name || "Player 1");
  const [p2Name, setP2Name] = useState("Player 2");

  // Roles: who is currently Dropper vs Checker
  const [dropperName, setDropperName] = useState(p1Name);
  const [checkerName, setCheckerName] = useState(p2Name);

  // Time Accounts (penalties in seconds)
  const [p1Time, setP1Time] = useState(0);
  const [p2Time, setP2Time] = useState(0);

  // Current Round Inputs (0 to 60 seconds)
  const [dropperTime, setDropperTime] = useState(30);
  const [checkerTime, setCheckerTime] = useState(30);
  const [showDropperSecret, setShowDropperSecret] = useState(false);

  // Round Result State
  const [roundNumber, setRoundNumber] = useState(1);
  const [lastResult, setLastResult] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);
  const [winner, setWinner] = useState(null);

  // Handle Coin Toss Complete -> Go directly to Dropper turn (No betting in local)
  const handleTossComplete = (roles) => {
    setDropperName(roles.dropper);
    setCheckerName(roles.checker);
    setPhase('DROPPER_PASS');
  };

  // Lock in Dropper Time
  const handleLockDropperTime = () => {
    setShowDropperSecret(false);
    setPhase('CHECKER_PASS');
  };

  // Submit Checker Guess & Compute Results
  const handleSubmitCheckerTime = () => {
    const dTime = Number(dropperTime);
    const cTime = Number(checkerTime);

    let resultType = 'DELAY';
    let penalty = 0;

    if (cTime === dTime) {
      resultType = 'PERFECT';
      penalty = 0;
    } else if (cTime < dTime) {
      resultType = 'FOUL';
      penalty = 60;
    } else {
      resultType = 'DELAY';
      penalty = Number((cTime - dTime).toFixed(1));
    }

    // Determine which player gets the penalty
    let newP1Time = p1Time;
    let newP2Time = p2Time;

    if (checkerName === p1Name) {
      newP1Time = Number((p1Time + penalty).toFixed(1));
      setP1Time(newP1Time);
    } else {
      newP2Time = Number((p2Time + penalty).toFixed(1));
      setP2Time(newP2Time);
    }

    const resultObj = {
      round: roundNumber,
      dropper: dropperName,
      checker: checkerName,
      dropTime: dTime,
      checkTime: cTime,
      type: resultType,
      penalty,
      p1TimeAfter: newP1Time,
      p2TimeAfter: newP2Time
    };

    setLastResult(resultObj);
    setRoundHistory([resultObj, ...roundHistory]);

    // Check game over condition (300s limit)
    if (newP1Time >= MAX_PENALTY_TIME || newP2Time >= MAX_PENALTY_TIME) {
      const winningPlayer = newP1Time >= MAX_PENALTY_TIME ? p2Name : p1Name;
      setWinner(winningPlayer);
      setPhase('GAME_OVER');
    } else {
      setPhase('ROUND_REVEAL');
    }
  };

  // Advance to Next Round (Swap Roles)
  const handleNextRound = () => {
    const nextDropper = checkerName;
    const nextChecker = dropperName;
    setDropperName(nextDropper);
    setCheckerName(nextChecker);

    setRoundNumber((prev) => prev + 1);
    setDropperTime(30);
    setCheckerTime(30);
    setShowDropperSecret(false);
    setPhase('DROPPER_PASS');
  };

  // Rematch Game
  const handleRematch = () => {
    setP1Time(0);
    setP2Time(0);
    setRoundNumber(1);
    setRoundHistory([]);
    setLastResult(null);
    setWinner(null);
    setDropperTime(30);
    setCheckerTime(30);
    setShowDropperSecret(false);
    setPhase('TOSS');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* TIME ACCOUNT GAUGE (Visible during active gameplay) */}
      {phase !== 'TOSS' && phase !== 'GAME_OVER' && (
        <TimeAccountGauge
          p1Name={p1Name}
          p2Name={p2Name}
          p1Time={p1Time}
          p2Time={p2Time}
          currentDropper={dropperName}
          currentChecker={checkerName}
        />
      )}

      <AnimatePresence mode="wait">
        {/* PHASE 0: COIN TOSS */}
        {phase === 'TOSS' && (
          <CoinToss
            key="handkerchief_toss"
            p1Name={p1Name}
            p2Name={p2Name}
            onTossComplete={handleTossComplete}
          />
        )}

        {/* PHASE 1: PASS TO DROPPER */}
        {phase === 'DROPPER_PASS' && (
          <motion.div
            key="dropper_pass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-base-300 border-2 border-yellow-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
              <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-full w-fit mx-auto animate-bounce">
                <Lock className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Round {roundNumber} • Dropper Turn</span>
                <h2 className="text-3xl font-black mt-1">Pass to {dropperName}</h2>
                <p className="text-xs text-base-content/70 mt-2">
                  Please hand the device to <strong className="text-emerald-400">{dropperName}</strong> to secretly choose when to drop the handkerchief.
                </p>
              </div>
              <button
                onClick={() => setPhase('DROPPER_INPUT')}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 cursor-pointer"
              >
                I am {dropperName}, Ready!
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: DROPPER TIME INPUT */}
        {phase === 'DROPPER_INPUT' && (
          <motion.div
            key="dropper_input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-base-300 border-2 border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase mb-2">
                  <UserCheck className="w-3.5 h-3.5" /> Dropper: {dropperName}
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Choose Drop Time</h2>
                <p className="text-xs text-base-content/70 mt-1">
                  Pick a secret time between <strong>0.0s and 60.0s</strong>.
                </p>
              </div>

              {/* Slider & Time Visualizer */}
              <div className="bg-base-200/80 p-6 rounded-2xl border border-base-content/10 space-y-5 text-center">
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-5xl font-black font-mono text-emerald-400">
                    {showDropperSecret ? `${Number(dropperTime).toFixed(1)}s` : '••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowDropperSecret(!showDropperSecret)}
                    className="text-xs text-base-content/60 hover:text-base-content flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {showDropperSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showDropperSecret ? 'Hide' : 'Peek'}
                  </button>
                </div>

                <input
                  type="range"
                  min="0"
                  max="60"
                  step="0.5"
                  value={dropperTime}
                  onChange={(e) => setDropperTime(Number(e.target.value))}
                  className="range range-accent w-full"
                />

                {/* Quick select presets */}
                <div className="flex justify-between gap-2 pt-2">
                  {[5, 15, 30, 45, 58].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDropperTime(t)}
                      className="px-3 py-1.5 rounded-xl bg-base-100 hover:bg-base-300 text-xs font-mono font-bold border border-base-content/10 cursor-pointer"
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLockDropperTime}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Lock Secret Drop Time <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3A: PASS TO CHECKER */}
        {phase === 'CHECKER_PASS' && (
          <motion.div
            key="checker_pass"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-base-300 border-2 border-yellow-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
              <div className="p-4 bg-cyan-500/20 text-cyan-400 rounded-full w-fit mx-auto animate-pulse">
                <Clock className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Round {roundNumber} • Checker Turn</span>
                <h2 className="text-3xl font-black mt-1">Pass to {checkerName}</h2>
                <p className="text-xs text-base-content/70 mt-2">
                  Hand the device to <strong className="text-cyan-400">{checkerName}</strong> to guess when the handkerchief was dropped!
                </p>
              </div>
              <button
                onClick={() => setPhase('CHECKER_INPUT')}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 cursor-pointer"
              >
                I am {checkerName}, Ready!
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3B: CHECKER TIME INPUT */}
        {phase === 'CHECKER_INPUT' && (
          <motion.div
            key="checker_input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-base-300 border-2 border-cyan-500/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-xs uppercase mb-2">
                  <UserCheck className="w-3.5 h-3.5" /> Checker: {checkerName}
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Guess Handkerchief Drop Time</h2>
                <p className="text-xs text-base-content/70 mt-1">
                  Guess between <strong>0.0s and 60.0s</strong>. Don't check too early or you will FOUL (+60s)!
                </p>
              </div>

              {/* Slider & Time Visualizer */}
              <div className="bg-base-200/80 p-6 rounded-2xl border border-base-content/10 space-y-5 text-center">
                <div className="flex justify-center items-baseline gap-1 font-mono">
                  <span className="text-6xl font-black text-cyan-400">
                    {Number(checkerTime).toFixed(1)}
                  </span>
                  <span className="text-xl font-bold text-base-content/60">sec</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="60"
                  step="0.5"
                  value={checkerTime}
                  onChange={(e) => setCheckerTime(Number(e.target.value))}
                  className="range range-primary w-full"
                />

                {/* Quick select presets */}
                <div className="flex justify-between gap-2 pt-2">
                  {[5, 15, 30, 45, 58].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCheckerTime(t)}
                      className="px-3 py-1.5 rounded-xl bg-base-100 hover:bg-base-300 text-xs font-mono font-bold border border-base-content/10 cursor-pointer"
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmitCheckerTime}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Check Time <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: ROUND REVEAL ANIMATION */}
        {phase === 'ROUND_REVEAL' && lastResult && (
          <motion.div
            key="round_reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="bg-base-300 border-2 border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
              {/* Outcome Badge */}
              {lastResult.type === 'PERFECT' && (
                <div className="space-y-2">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/30 animate-pulse">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-emerald-400">
                    PERFECT CHECK! 🎯
                  </h2>
                  <p className="text-xs text-base-content/70">
                    {checkerName} checked at the EXACT same moment the handkerchief dropped! <strong>+0s added</strong>!
                  </p>
                </div>
              )}

              {lastResult.type === 'FOUL' && (
                <div className="space-y-2">
                  <div className="inline-flex p-4 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/30 animate-bounce">
                    <AlertTriangle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-rose-400">
                    FOUL! TOO EARLY! ❌
                  </h2>
                  <p className="text-xs text-base-content/70">
                    {checkerName} checked at <strong>{lastResult.checkTime.toFixed(1)}s</strong> before the drop at <strong>{lastResult.dropTime.toFixed(1)}s</strong>!
                    <br /><strong className="text-rose-400">+60.0s penalty added to {checkerName}!</strong>
                  </p>
                </div>
              )}

              {lastResult.type === 'DELAY' && (
                <div className="space-y-2">
                  <div className="inline-flex p-4 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/30">
                    <Clock className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-cyan-400">
                    REACTION DELAY
                  </h2>
                  <p className="text-xs text-base-content/70">
                    Dropped at <strong>{lastResult.dropTime.toFixed(1)}s</strong> • Checked at <strong>{lastResult.checkTime.toFixed(1)}s</strong>
                    <br /><strong className="text-cyan-400">+{lastResult.penalty.toFixed(1)}s lag penalty added to {checkerName}!</strong>
                  </p>
                </div>
              )}

              {/* Time Comparison Card */}
              <div className="grid grid-cols-2 gap-4 bg-base-200/80 p-5 rounded-2xl border border-base-content/10">
                <div className="text-center p-3 bg-base-100 rounded-xl">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                    Dropper ({lastResult.dropper})
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {lastResult.dropTime.toFixed(1)}s
                  </span>
                </div>

                <div className="text-center p-3 bg-base-100 rounded-xl">
                  <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-1">
                    Checker ({lastResult.checker})
                  </span>
                  <span className="text-2xl font-black font-mono text-cyan-400">
                    {lastResult.checkTime.toFixed(1)}s
                  </span>
                </div>
              </div>

              {/* Next Round Action */}
              <button
                onClick={handleNextRound}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Next Round (Swap Roles: {checkerName} ➔ Dropper) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 5: GAME OVER / VICTORY */}
        {phase === 'GAME_OVER' && (
          <motion.div
            key="game_over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="bg-base-300 border-2 border-yellow-500 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
              <div className="p-4 bg-yellow-500/20 text-yellow-400 rounded-full w-fit mx-auto border border-yellow-500/40 shadow-xl shadow-yellow-500/30">
                <Trophy className="w-16 h-16 animate-pulse" />
              </div>

              <div>
                <span className="text-xs font-black tracking-widest text-yellow-500 uppercase">300s Limit Reached</span>
                <h2 className="text-4xl md:text-5xl font-black mt-1 text-white">
                  {winner} WINS! 👑
                </h2>
                <p className="text-xs md:text-sm text-base-content/70 mt-2">
                  The opponent reached or exceeded the 300-second threshold!
                </p>
              </div>

              {/* Final Scores Breakdown */}
              <div className="grid grid-cols-2 gap-4 bg-base-200 p-5 rounded-2xl border border-base-content/15 text-center">
                <div className={`p-4 rounded-xl ${winner === p1Name ? 'bg-emerald-950/40 border border-emerald-500/40' : 'bg-rose-950/40 border border-rose-500/40'}`}>
                  <span className="text-xs font-bold block text-base-content/70">{p1Name}</span>
                  <span className={`text-2xl font-black font-mono ${winner === p1Name ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {p1Time.toFixed(1)}s
                  </span>
                  <span className="text-[10px] font-bold block mt-1">{winner === p1Name ? 'SURVIVOR' : 'OUT (≥300s)'}</span>
                </div>

                <div className={`p-4 rounded-xl ${winner === p2Name ? 'bg-emerald-950/40 border border-emerald-500/40' : 'bg-rose-950/40 border border-rose-500/40'}`}>
                  <span className="text-xs font-bold block text-base-content/70">{p2Name}</span>
                  <span className={`text-2xl font-black font-mono ${winner === p2Name ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {p2Time.toFixed(1)}s
                  </span>
                  <span className="text-[10px] font-bold block mt-1">{winner === p2Name ? 'SURVIVOR' : 'OUT (≥300s)'}</span>
                </div>
              </div>

              {/* Rematch Button */}
              <button
                onClick={handleRematch}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" /> Play Rematch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROUND HISTORY LOG (Shown during active game) */}
      {roundHistory.length > 0 && phase !== 'TOSS' && (
        <div className="bg-base-300/60 p-5 rounded-3xl border border-base-content/10 space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-base-content/70 flex items-center gap-2">
            <History className="w-4 h-4 text-yellow-500" /> Match History ({roundHistory.length} Rounds)
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {roundHistory.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-4 py-2.5 bg-base-200/60 rounded-xl text-xs font-mono border border-base-content/5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-yellow-400">R{item.round}</span>
                  <span className="text-base-content/70">
                    Dropper: <strong>{item.dropper}</strong> ({item.dropTime.toFixed(1)}s) • Checker: <strong>{item.checker}</strong> ({item.checkTime.toFixed(1)}s)
                  </span>
                </div>

                <span
                  className={`font-black px-2 py-0.5 rounded-md ${
                    item.type === 'PERFECT'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : item.type === 'FOUL'
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                >
                  +{item.penalty.toFixed(1)}s ({item.type})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
