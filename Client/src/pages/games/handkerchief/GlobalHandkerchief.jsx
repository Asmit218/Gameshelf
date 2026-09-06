import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Copy,
  Check,
  Clock,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck,
  Swords,
  CheckCircle2,
  Trophy,
  ExternalLink,
  Lock,
  History
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../../utils/axios';
import CoinToss from '../../../components/games/CoinToss';
import TimeAccountGauge from '../../../components/games/TimeAccountGauge';
import BettingSystem from '../../../components/BettingSystem';
import { calculateHandkerchiefPenalty, MAX_HANDKERCHIEF_PENALTY_TIME as MAX_PENALTY_TIME } from '../gameUtils';

export default function GlobalHandkerchief({ user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  // Phases: 'TOSS' | 'BETTING' | 'ROUND_INPUT' | 'ROUND_REVEAL' | 'GAME_OVER'
  const [phase, setPhase] = useState('TOSS');
  const [myRole, setMyRole] = useState(1); // 1 = Host (P1), 2 = Guest (P2)
  const [copiedCode, setCopiedCode] = useState(false);

  const [p1Name, setP1Name] = useState(user?.userName || user?.name || "Host Player");
  const [p2Name, setP2Name] = useState("Waiting for Opponent...");

  // Dropper & Checker Role tracker
  const [dropperRole, setDropperRole] = useState(1); // 1 or 2 (which player is dropper)
  const [p1Time, setP1Time] = useState(0);
  const [p2Time, setP2Time] = useState(0);

  const [betAmount, setBetAmount] = useState(100);
  const [p1BetConfirmed, setP1BetConfirmed] = useState(false);
  const [p2BetConfirmed, setP2BetConfirmed] = useState(false);

  // Round inputs
  const [dropperSecretTime, setDropperSecretTime] = useState(30);
  const [dropperLocked, setDropperLocked] = useState(false);
  const [showDropperSecret, setShowDropperSecret] = useState(false);

  const [checkerGuessTime, setCheckerGuessTime] = useState(30);
  const [checkerSubmitted, setCheckerSubmitted] = useState(false);

  const [roundNumber, setRoundNumber] = useState(1);
  const [lastResult, setLastResult] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);
  const [winner, setWinner] = useState(null);

  const channelRef = useRef(null);

  // Load Room Metadata
  useEffect(() => {
    if (!roomId || !user) return;

    const fetchRoomInfo = async () => {
      try {
        const res = await api.get(`/rooms/get/${roomId}`);
        const room = res.data?.data;
        if (room) {
          const isHost = room.playerId === user.playerId;
          setMyRole(isHost ? 1 : 2);
          setP1Name(room.createdby || "Host Player");
          if (!isHost) {
            setP2Name(user.userName || "Guest (You)");
          } else if (room.players?.length > 1) {
            setP2Name("Guest Player");
          }
        }
      } catch (err) {
        console.log("Error fetching room info:", err);
      }
    };

    fetchRoomInfo();
  }, [roomId, user]);

  // Apply state from other peer
  const applySyncedState = useCallback((newState) => {
    if (!newState) return;
    if (newState.phase !== undefined) setPhase(newState.phase);
    if (newState.p1Name !== undefined) setP1Name(newState.p1Name);
    if (newState.p2Name !== undefined) setP2Name(newState.p2Name);
    if (newState.dropperRole !== undefined) setDropperRole(newState.dropperRole);
    if (newState.p1Time !== undefined) setP1Time(newState.p1Time);
    if (newState.p2Time !== undefined) setP2Time(newState.p2Time);
    if (newState.betAmount !== undefined) setBetAmount(newState.betAmount);
    if (newState.p1BetConfirmed !== undefined) setP1BetConfirmed(newState.p1BetConfirmed);
    if (newState.p2BetConfirmed !== undefined) setP2BetConfirmed(newState.p2BetConfirmed);
    if (newState.dropperSecretTime !== undefined) setDropperSecretTime(newState.dropperSecretTime);
    if (newState.dropperLocked !== undefined) setDropperLocked(newState.dropperLocked);
    if (newState.checkerGuessTime !== undefined) setCheckerGuessTime(newState.checkerGuessTime);
    if (newState.checkerSubmitted !== undefined) setCheckerSubmitted(newState.checkerSubmitted);
    if (newState.roundNumber !== undefined) setRoundNumber(newState.roundNumber);
    if (newState.lastResult !== undefined) setLastResult(newState.lastResult);
    if (newState.roundHistory !== undefined) setRoundHistory(newState.roundHistory);
    if (newState.winner !== undefined) setWinner(newState.winner);
  }, []);

  // Broadcast channel setup
  useEffect(() => {
    if (!roomId) return;

    const channelName = `handkerchief_global_${roomId}`;
    const bc = new BroadcastChannel(channelName);
    channelRef.current = bc;

    bc.onmessage = (event) => {
      const data = event.data;
      if (data && data.type === 'SYNC_HANDKERCHIEF_STATE') {
        applySyncedState(data.state);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === `handkerchief_state_${roomId}`) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed) applySyncedState(parsed);
        } catch (err) {
          console.log(err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      bc.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [roomId, applySyncedState]);

  const broadcastGameState = (override = {}) => {
    if (!roomId) return;
    const currentState = {
      phase,
      p1Name,
      p2Name,
      dropperRole,
      p1Time,
      p2Time,
      betAmount,
      p1BetConfirmed,
      p2BetConfirmed,
      dropperSecretTime,
      dropperLocked,
      checkerGuessTime,
      checkerSubmitted,
      roundNumber,
      lastResult,
      roundHistory,
      winner,
      ...override
    };

    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'SYNC_HANDKERCHIEF_STATE',
        state: currentState
      });
    }

    localStorage.setItem(`handkerchief_state_${roomId}`, JSON.stringify(currentState));
  };

  const handleCopyRoomCode = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Toss Complete
  const handleTossComplete = (roles) => {
    const isP1Dropper = roles.dropper === p1Name;
    const assignedDropperRole = isP1Dropper ? 1 : 2;
    setDropperRole(assignedDropperRole);
    setPhase('BETTING');

    broadcastGameState({
      dropperRole: assignedDropperRole,
      phase: 'BETTING'
    });
  };

  // Confirm Bet
  const handleConfirmBet = () => {
    if (myRole === 1) {
      setP1BetConfirmed(true);
      broadcastGameState({ p1BetConfirmed: true });
      if (p2BetConfirmed) {
        setPhase('ROUND_INPUT');
        broadcastGameState({ phase: 'ROUND_INPUT', p1BetConfirmed: true });
      }
    } else {
      setP2BetConfirmed(true);
      broadcastGameState({ p2BetConfirmed: true });
      if (p1BetConfirmed) {
        setPhase('ROUND_INPUT');
        broadcastGameState({ phase: 'ROUND_INPUT', p2BetConfirmed: true });
      }
    }
  };

  // Dropper Locks Secret Time
  const handleLockDropperTime = () => {
    setDropperLocked(true);
    setShowDropperSecret(false);
    broadcastGameState({
      dropperSecretTime,
      dropperLocked: true
    });
  };

  // Checker Submits Guess & Computes Score
  const handleSubmitCheckerGuess = () => {
    setCheckerSubmitted(true);
    const dTime = Number(dropperSecretTime);
    const cTime = Number(checkerGuessTime);

    const { type: resultType, penalty } = calculateHandkerchiefPenalty(dTime, cTime);

    const checkerPlayerNum = dropperRole === 1 ? 2 : 1;
    let newP1Time = p1Time;
    let newP2Time = p2Time;

    if (checkerPlayerNum === 1) {
      newP1Time = Number((p1Time + penalty).toFixed(1));
      setP1Time(newP1Time);
    } else {
      newP2Time = Number((p2Time + penalty).toFixed(1));
      setP2Time(newP2Time);
    }

    const currentDropperName = dropperRole === 1 ? p1Name : p2Name;
    const currentCheckerName = dropperRole === 1 ? p2Name : p1Name;

    const resultObj = {
      round: roundNumber,
      dropper: currentDropperName,
      checker: currentCheckerName,
      dropTime: dTime,
      checkTime: cTime,
      type: resultType,
      penalty,
      p1TimeAfter: newP1Time,
      p2TimeAfter: newP2Time
    };

    const updatedHistory = [resultObj, ...roundHistory];
    setLastResult(resultObj);
    setRoundHistory(updatedHistory);

    if (newP1Time >= MAX_PENALTY_TIME || newP2Time >= MAX_PENALTY_TIME) {
      const winningName = newP1Time >= MAX_PENALTY_TIME ? p2Name : p1Name;
      setWinner(winningName);
      setPhase('GAME_OVER');
      broadcastGameState({
        p1Time: newP1Time,
        p2Time: newP2Time,
        lastResult: resultObj,
        roundHistory: updatedHistory,
        winner: winningName,
        phase: 'GAME_OVER'
      });
    } else {
      setPhase('ROUND_REVEAL');
      broadcastGameState({
        p1Time: newP1Time,
        p2Time: newP2Time,
        lastResult: resultObj,
        roundHistory: updatedHistory,
        phase: 'ROUND_REVEAL'
      });
    }
  };

  // Next Round
  const handleNextRound = () => {
    const nextDropper = dropperRole === 1 ? 2 : 1;
    setDropperRole(nextDropper);
    setRoundNumber((prev) => prev + 1);
    setDropperSecretTime(30);
    setDropperLocked(false);
    setCheckerGuessTime(30);
    setCheckerSubmitted(false);
    setShowDropperSecret(false);
    setPhase('ROUND_INPUT');

    broadcastGameState({
      dropperRole: nextDropper,
      roundNumber: roundNumber + 1,
      dropperSecretTime: 30,
      dropperLocked: false,
      checkerGuessTime: 30,
      checkerSubmitted: false,
      phase: 'ROUND_INPUT'
    });
  };

  // Rematch
  const handleRematch = () => {
    setP1Time(0);
    setP2Time(0);
    setRoundNumber(1);
    setRoundHistory([]);
    setLastResult(null);
    setWinner(null);
    setDropperSecretTime(30);
    setDropperLocked(false);
    setCheckerGuessTime(30);
    setCheckerSubmitted(false);
    setP1BetConfirmed(false);
    setP2BetConfirmed(false);
    setPhase('TOSS');

    broadcastGameState({
      p1Time: 0,
      p2Time: 0,
      roundNumber: 1,
      roundHistory: [],
      lastResult: null,
      winner: null,
      dropperSecretTime: 30,
      dropperLocked: false,
      checkerGuessTime: 30,
      checkerSubmitted: false,
      p1BetConfirmed: false,
      p2BetConfirmed: false,
      phase: 'TOSS'
    });
  };

  if (!roomId) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <div className="bg-base-300 border-2 border-secondary-content/60 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center space-y-6">
          <div className="p-4 bg-yellow-500/20 text-yellow-500 rounded-full w-fit mx-auto">
            <Globe className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black">Global Handkerchief Rooms</h2>
            <p className="text-xs md:text-sm text-base-content/70 mt-2 leading-relaxed">
              Create or join a Handkerchief room from the <strong>Room Page</strong> to duel opponents online across devices.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/room"
              className="btn btn-primary text-primary-content px-8 py-3.5 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              Go to Room Page <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentDropper = myRole === dropperRole;
  const currentDropperName = dropperRole === 1 ? p1Name : p2Name;
  const currentCheckerName = dropperRole === 1 ? p2Name : p1Name;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center bg-base-300/60 px-4 py-2 rounded-2xl border border-yellow-500/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-xl border border-yellow-500/40 text-xs">
            <span className="text-base-content/60 font-bold">Room ID:</span>
            <span className="font-mono font-black text-yellow-400 tracking-wider">{roomId}</span>
            <button
              onClick={handleCopyRoomCode}
              className="p-1 hover:bg-base-300 rounded cursor-pointer"
              title="Copy Room ID"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-base-content/70" />}
            </button>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
            {myRole === 1 ? '👑 Host' : '⚔️ Guest'} • You are {isCurrentDropper ? 'Dropper' : 'Checker'}
          </span>
        </div>

        <button
          onClick={() => setSearchParams({})}
          className="text-xs font-bold text-base-content/70 hover:text-error transition-colors px-3 py-1.5 rounded-xl hover:bg-error/10 cursor-pointer"
        >
          Leave Room
        </button>
      </div>

      {/* Dual Time Account Meter */}
      {phase !== 'TOSS' && phase !== 'BETTING' && phase !== 'GAME_OVER' && (
        <TimeAccountGauge
          p1Name={p1Name}
          p2Name={p2Name}
          p1Time={p1Time}
          p2Time={p2Time}
          currentDropper={currentDropperName}
          currentChecker={currentCheckerName}
        />
      )}

      <AnimatePresence mode="wait">
        {/* PHASE 0: TOSS */}
        {phase === 'TOSS' && (
          <CoinToss
            key="global_toss"
            p1Name={p1Name}
            p2Name={p2Name}
            onTossComplete={handleTossComplete}
          />
        )}

        {/* PHASE 1: BETTING */}
        {phase === 'BETTING' && (
          <BettingSystem
            key="global_betting"
            betAmount={betAmount}
            setBetAmount={(val) => {
              setBetAmount(val);
              broadcastGameState({ betAmount: val });
            }}
            p1Name={p1Name}
            p2Name={p2Name}
            p1BetConfirmed={p1BetConfirmed}
            p2BetConfirmed={p2BetConfirmed}
            myRole={myRole}
            isOnline={true}
            onConfirmBet={handleConfirmBet}
            gameTitle="Handkerchief Online Stake"
          />
        )}

        {/* PHASE 2: ROUND INPUT (DROPPER & CHECKER TIMING) */}
        {phase === 'ROUND_INPUT' && (
          <motion.div
            key="round_input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dropper Card */}
              <div
                className={`p-6 rounded-3xl border-2 transition-all ${
                  isCurrentDropper
                    ? 'bg-base-300 border-emerald-500/80 shadow-lg'
                    : 'bg-base-200/50 border-base-content/10 opacity-70'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-base flex items-center gap-2 text-emerald-400">
                    <UserCheck className="w-5 h-5" /> Dropper: {currentDropperName}
                  </h3>
                  {dropperLocked && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Drop Time Locked
                    </span>
                  )}
                </div>

                {isCurrentDropper && !dropperLocked ? (
                  <div className="space-y-4">
                    <p className="text-xs text-base-content/70">
                      Choose secret drop time (0.0s – 60.0s):
                    </p>
                    <div className="bg-base-200 p-4 rounded-2xl text-center space-y-3">
                      <div className="flex justify-center items-baseline gap-2">
                        <span className="text-4xl font-black font-mono text-emerald-400">
                          {showDropperSecret ? `${Number(dropperSecretTime).toFixed(1)}s` : '••••'}
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
                        value={dropperSecretTime}
                        onChange={(e) => setDropperSecretTime(Number(e.target.value))}
                        className="range range-accent w-full"
                      />
                    </div>

                    <button
                      onClick={handleLockDropperTime}
                      className="btn btn-primary text-primary-content w-full py-3.5 rounded-2xl font-black text-sm shadow-md cursor-pointer"
                    >
                      Lock Secret Drop Time
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      {dropperLocked ? 'Drop Time Locked!' : 'Dropper is selecting time...'}
                    </p>
                    <p className="text-2xl font-black tracking-widest text-base-content/40">••••</p>
                  </div>
                )}
              </div>

              {/* Checker Card */}
              <div
                className={`p-6 rounded-3xl border-2 transition-all ${
                  !isCurrentDropper
                    ? 'bg-base-300 border-cyan-500/80 shadow-lg'
                    : 'bg-base-200/50 border-base-content/10 opacity-70'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-base flex items-center gap-2 text-cyan-400">
                    <Clock className="w-5 h-5" /> Checker: {currentCheckerName}
                  </h3>
                  {checkerSubmitted && (
                    <span className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Guess Submitted
                    </span>
                  )}
                </div>

                {!isCurrentDropper && !checkerSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-xs text-base-content/70">
                      Guess drop time (Foul if earlier than drop):
                    </p>
                    <div className="bg-base-200 p-4 rounded-2xl text-center space-y-3">
                      <div className="text-4xl font-black font-mono text-cyan-400">
                        {Number(checkerGuessTime).toFixed(1)}s
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="60"
                        step="0.5"
                        value={checkerGuessTime}
                        onChange={(e) => setCheckerGuessTime(Number(e.target.value))}
                        className="range range-primary w-full"
                      />
                    </div>

                    <button
                      disabled={!dropperLocked}
                      onClick={handleSubmitCheckerGuess}
                      className="btn btn-primary text-primary-content w-full py-3.5 rounded-2xl font-black text-sm shadow-md disabled:opacity-40 cursor-pointer"
                    >
                      {dropperLocked ? 'Submit Timing Check' : 'Waiting for Dropper to Lock...'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs font-bold text-cyan-400 mb-1">
                      {checkerSubmitted ? 'Check Submitted!' : 'Waiting for Checker timing guess...'}
                    </p>
                    <p className="text-2xl font-black font-mono text-base-content/40">⏳</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: ROUND REVEAL */}
        {phase === 'ROUND_REVEAL' && lastResult && (
          <motion.div
            key="round_reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="bg-base-300 border-2 border-yellow-500/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
              {lastResult.type === 'PERFECT' && (
                <div className="space-y-2">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/30 animate-pulse">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-emerald-400">
                    PERFECT CHECK! 🎯
                  </h2>
                  <p className="text-xs text-base-content/70">
                    {lastResult.checker} checked at the EXACT same moment! <strong>+0s added</strong>!
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
                    Checked at <strong>{lastResult.checkTime.toFixed(1)}s</strong> before drop at <strong>{lastResult.dropTime.toFixed(1)}s</strong>!
                    <br /><strong className="text-rose-400">+60.0s penalty added to {lastResult.checker}!</strong>
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
                    <br /><strong className="text-cyan-400">+{lastResult.penalty.toFixed(1)}s lag penalty added to {lastResult.checker}!</strong>
                  </p>
                </div>
              )}

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

              <button
                onClick={handleNextRound}
                className="btn btn-primary text-primary-content w-full py-4 rounded-2xl font-black text-base shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Next Round (Rotate Roles) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: GAME OVER */}
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
                  Claimed the <strong>{betAmount * 2} BIOS</strong> pot!
                </p>
              </div>

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

      {/* Round History */}
      {roundHistory.length > 0 && phase !== 'TOSS' && phase !== 'BETTING' && (
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
