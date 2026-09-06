import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Copy, Check, KeyRound, Eye, EyeOff, CheckCircle2, UserCheck, Swords, ArrowRight, ExternalLink } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../../utils/axios';
import BettingSystem from '../../../components/BettingSystem';
import FourDigitInput from '../../../components/games/FourDigitInput';
import UnravelBoard from '../../../components/games/UnravelBoard';
import VictoryScreen from '../../../components/games/VictoryScreen';
import { calculateHints } from '../gameUtils';

/**
 * GlobalUnravel Component
 * Handles online Unravel gameplay using rooms created on the Room page (/room).
 */
export default function GlobalUnravel({ user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  // Phase: 'BETTING' | 'SETUP' | 'PLAYING' | 'GAME_OVER'
  const [phase, setPhase] = useState('BETTING');

  const [myRole, setMyRole] = useState(1); // 1 = Host, 2 = Guest
  const [copiedCode, setCopiedCode] = useState(false);

  const [p1Name, setP1Name] = useState(user?.userName || user?.name || "Host Player");
  const [p2Name, setP2Name] = useState("Waiting for Opponent...");

  const [betAmount, setBetAmount] = useState(100);
  const [p1BetConfirmed, setP1BetConfirmed] = useState(false);
  const [p2BetConfirmed, setP2BetConfirmed] = useState(false);

  const [p1Secret, setP1Secret] = useState('');
  const [p2Secret, setP2Secret] = useState('');
  const [p1SecretConfirmed, setP1SecretConfirmed] = useState(false);
  const [p2SecretConfirmed, setP2SecretConfirmed] = useState(false);
  const [showSecretP1, setShowSecretP1] = useState(false);
  const [showSecretP2, setShowSecretP2] = useState(false);

  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [p1Guesses, setP1Guesses] = useState([]);
  const [p2Guesses, setP2Guesses] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningGuess, setWinningGuess] = useState('');

  const [showRules, setShowRules] = useState(false);
  const channelRef = useRef(null);

  // Load room metadata if roomId is in URL
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

  // Function to apply state received from another device/tab
  const applySyncedState = useCallback((newState) => {
    if (!newState) return;
    if (newState.phase !== undefined) setPhase(newState.phase);
    if (newState.betAmount !== undefined) setBetAmount(newState.betAmount);
    if (newState.p1Name !== undefined) setP1Name(newState.p1Name);
    if (newState.p2Name !== undefined) setP2Name(newState.p2Name);
    if (newState.p1BetConfirmed !== undefined) setP1BetConfirmed(newState.p1BetConfirmed);
    if (newState.p2BetConfirmed !== undefined) setP2BetConfirmed(newState.p2BetConfirmed);
    if (newState.p1SecretConfirmed !== undefined) setP1SecretConfirmed(newState.p1SecretConfirmed);
    if (newState.p2SecretConfirmed !== undefined) setP2SecretConfirmed(newState.p2SecretConfirmed);
    if (newState.currentTurn !== undefined) setCurrentTurn(newState.currentTurn);
    if (newState.p1Guesses !== undefined) setP1Guesses(newState.p1Guesses);
    if (newState.p2Guesses !== undefined) setP2Guesses(newState.p2Guesses);
    if (newState.winner !== undefined) setWinner(newState.winner);
    if (newState.winningGuess !== undefined) setWinningGuess(newState.winningGuess);
  }, []);

  // Cross-Device Real-Time Sync via BroadcastChannel & Storage events
  useEffect(() => {
    if (!roomId) return;

    const channelName = `unravel_global_${roomId}`;
    const bc = new BroadcastChannel(channelName);
    channelRef.current = bc;

    bc.onmessage = (event) => {
      const data = event.data;
      if (data && data.type === 'SYNC_GAME_STATE') {
        applySyncedState(data.state);
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === `unravel_state_${roomId}`) {
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
      betAmount,
      p1Name,
      p2Name,
      p1BetConfirmed,
      p2BetConfirmed,
      p1SecretConfirmed,
      p2SecretConfirmed,
      currentTurn,
      p1Guesses,
      p2Guesses,
      winner,
      winningGuess,
      ...override
    };

    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'SYNC_GAME_STATE',
        state: currentState
      });
    }

    localStorage.setItem(`unravel_state_${roomId}`, JSON.stringify(currentState));
  };

  const handleCopyRoomCode = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleConfirmBet = () => {
    if (myRole === 1) {
      setP1BetConfirmed(true);
      broadcastGameState({ p1BetConfirmed: true });
      if (p2BetConfirmed) {
        setPhase('SETUP');
        broadcastGameState({ phase: 'SETUP', p1BetConfirmed: true });
      }
    } else {
      setP2BetConfirmed(true);
      broadcastGameState({ p2BetConfirmed: true });
      if (p1BetConfirmed) {
        setPhase('SETUP');
        broadcastGameState({ phase: 'SETUP', p2BetConfirmed: true });
      }
    }
  };

  const handleLockP1Secret = () => {
    if (p1Secret.length !== 4) return;
    setP1SecretConfirmed(true);
    setShowSecretP1(false);
    broadcastGameState({ p1SecretConfirmed: true });
    if (p2SecretConfirmed) {
      setPhase('PLAYING');
      setCurrentTurn(1);
      broadcastGameState({ phase: 'PLAYING', p1SecretConfirmed: true, currentTurn: 1 });
    }
  };

  const handleLockP2Secret = () => {
    if (p2Secret.length !== 4) return;
    setP2SecretConfirmed(true);
    setShowSecretP2(false);
    broadcastGameState({ p2SecretConfirmed: true });
    if (p1SecretConfirmed) {
      setPhase('PLAYING');
      setCurrentTurn(1);
      broadcastGameState({ phase: 'PLAYING', p2SecretConfirmed: true, currentTurn: 1 });
    }
  };

  const handleMakeGuess = (e) => {
    if (e) e.preventDefault();
    if (currentGuess.length !== 4) return;

    if (currentTurn === 1) {
      const hints = calculateHints(p2Secret, currentGuess);
      const newGuessObj = {
        turn: p1Guesses.length + 1,
        guess: currentGuess,
        frames: hints.frames,
        edges: hints.edges
      };
      const updatedP1 = [newGuessObj, ...p1Guesses];
      setP1Guesses(updatedP1);
      setCurrentGuess('');

      if (hints.frames === 4) {
        setWinner(1);
        setWinningGuess(currentGuess);
        setPhase('GAME_OVER');
        broadcastGameState({
          p1Guesses: updatedP1,
          winner: 1,
          winningGuess: currentGuess,
          phase: 'GAME_OVER'
        });
      } else {
        setCurrentTurn(2);
        broadcastGameState({
          p1Guesses: updatedP1,
          currentTurn: 2
        });
      }
    } else {
      const hints = calculateHints(p1Secret, currentGuess);
      const newGuessObj = {
        turn: p2Guesses.length + 1,
        guess: currentGuess,
        frames: hints.frames,
        edges: hints.edges
      };
      const updatedP2 = [newGuessObj, ...p2Guesses];
      setP2Guesses(updatedP2);
      setCurrentGuess('');

      if (hints.frames === 4) {
        setWinner(2);
        setWinningGuess(currentGuess);
        setPhase('GAME_OVER');
        broadcastGameState({
          p2Guesses: updatedP2,
          winner: 2,
          winningGuess: currentGuess,
          phase: 'GAME_OVER'
        });
      } else {
        setCurrentTurn(1);
        broadcastGameState({
          p2Guesses: updatedP2,
          currentTurn: 1
        });
      }
    }
  };

  const handleResetGame = () => {
    setPhase('BETTING');
    setBetAmount(100);
    setP1BetConfirmed(false);
    setP2BetConfirmed(false);
    setP1Secret('');
    setP2Secret('');
    setP1SecretConfirmed(false);
    setP2SecretConfirmed(false);
    setShowSecretP1(false);
    setShowSecretP2(false);
    setCurrentTurn(1);
    setCurrentGuess('');
    setP1Guesses([]);
    setP2Guesses([]);
    setWinner(null);
    setWinningGuess('');

    broadcastGameState({
      phase: 'BETTING',
      p1BetConfirmed: false,
      p2BetConfirmed: false,
      p1SecretConfirmed: false,
      p2SecretConfirmed: false,
      currentTurn: 1,
      p1Guesses: [],
      p2Guesses: [],
      winner: null,
      winningGuess: ''
    });
  };

  // If no room is joined / selected from the Room page
  if (!roomId) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <div className="bg-base-300 border-2 border-secondary-content/60 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center space-y-6">
          <div className="p-4 bg-yellow-500/20 text-yellow-500 rounded-full w-fit mx-auto">
            <Globe className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black">Global Unravel Rooms</h2>
            <p className="text-xs md:text-sm text-base-content/70 mt-2 leading-relaxed">
              Create or join an Unravel room from the <strong>Room Page</strong> to play against opponents online.
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-base-300/60 px-4 py-2 rounded-2xl border border-yellow-500/30">
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

        <button
          onClick={() => setSearchParams({})}
          className="text-xs font-bold text-base-content/70 hover:text-error transition-colors px-3 py-1.5 rounded-xl hover:bg-error/10 cursor-pointer"
        >
          Leave Room
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: REUSABLE BETTING SYSTEM */}
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
            gameTitle="Online Room BIOS Stake"
          />
        )}

        {/* PHASE 2: SECRET SETUP */}
        {phase === 'SETUP' && (
          <motion.div
            key="global_setup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-base-300 border-2 border-secondary-content/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-yellow-500/20 text-yellow-500 rounded-full mb-2">
                  <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black">Choose Secret 4-Digit Codes</h2>
                <p className="text-xs md:text-sm text-base-content/70 mt-1">
                  Lock your secret code on your device!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* P1 Box */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${p1SecretConfirmed ? 'bg-emerald-950/20 border-emerald-500/50' : myRole === 1 ? 'bg-base-200 border-yellow-500/80' : 'bg-base-200/50 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-yellow-500" /> {p1Name}
                    </h3>
                    {p1SecretConfirmed && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {myRole === 1 && !p1SecretConfirmed ? (
                    <div>
                      <FourDigitInput value={p1Secret} onChange={setP1Secret} autoFocus={true} isMasked={!showSecretP1} />
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => setShowSecretP1(!showSecretP1)}
                          className="text-xs font-semibold text-base-content/60 flex items-center gap-1 hover:text-base-content cursor-pointer"
                        >
                          {showSecretP1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {showSecretP1 ? p1Secret || "----" : "****"}
                        </button>
                        <button
                          disabled={p1Secret.length !== 4}
                          onClick={handleLockP1Secret}
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-400 text-black border-none font-bold rounded-xl cursor-pointer"
                        >
                          Lock Code
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs font-bold text-emerald-400 mb-1">
                        {p1SecretConfirmed ? 'Secret Code Locked!' : 'Host Setting Code...'}
                      </p>
                      <p className="text-2xl font-black tracking-widest text-base-content/50">••••</p>
                    </div>
                  )}
                </div>

                {/* P2 Box */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${p2SecretConfirmed ? 'bg-emerald-950/20 border-emerald-500/50' : myRole === 2 ? 'bg-base-200 border-yellow-500/80' : 'bg-base-200/50 opacity-60'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-yellow-500" /> {p2Name}
                    </h3>
                    {p2SecretConfirmed && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {myRole === 2 && !p2SecretConfirmed ? (
                    <div>
                      <FourDigitInput value={p2Secret} onChange={setP2Secret} autoFocus={true} isMasked={!showSecretP2} />
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => setShowSecretP2(!showSecretP2)}
                          className="text-xs font-semibold text-base-content/60 flex items-center gap-1 hover:text-base-content cursor-pointer"
                        >
                          {showSecretP2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          {showSecretP2 ? p2Secret || "----" : "****"}
                        </button>
                        <button
                          disabled={p2Secret.length !== 4}
                          onClick={handleLockP2Secret}
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-400 text-black border-none font-bold rounded-xl cursor-pointer"
                        >
                          Lock Code
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs font-bold text-emerald-400 mb-1">
                        {p2SecretConfirmed ? 'Secret Code Locked!' : 'Guest Setting Code...'}
                      </p>
                      <p className="text-2xl font-black tracking-widest text-base-content/50">••••</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: PLAYING */}
        {phase === 'PLAYING' && (
          <motion.div key="global_playing" className="space-y-8">
            <div className="bg-linear-to-r from-yellow-500/20 via-base-300 to-yellow-500/20 border border-yellow-500/30 rounded-3xl p-6 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-black uppercase mb-2">
                <Swords className="w-4 h-4" /> Active Turn
              </div>
              <h2 className="text-2xl md:text-4xl font-black">
                {currentTurn === 1 ? `${p1Name}'s Turn` : `${p2Name}'s Turn`}
              </h2>

              {currentTurn === myRole ? (
                <form onSubmit={handleMakeGuess} className="mt-6 max-w-md mx-auto">
                  <p className="text-xs md:text-sm text-base-content/70 mb-2">
                    Enter your 4-digit guess for {currentTurn === 1 ? p2Name : p1Name}'s secret code:
                  </p>
                  <FourDigitInput value={currentGuess} onChange={setCurrentGuess} autoFocus={true} />
                  <button
                    type="submit"
                    disabled={currentGuess.length !== 4}
                    className="w-full py-3.5 rounded-2xl font-black text-base bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg shadow-yellow-500/20 transition-all mt-4 disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Submit Guess & Calculate Hints <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="mt-6 p-6 bg-base-200/60 rounded-2xl border border-base-content/10 max-w-md mx-auto">
                  <p className="text-sm font-bold text-yellow-400 animate-pulse">
                    ⏳ Waiting for {currentTurn === 1 ? p1Name : p2Name} to submit their guess on their device...
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <UnravelBoard playerName={p1Name} targetName={p2Name} guesses={p1Guesses} isCurrentTurn={currentTurn === 1} />
              <UnravelBoard playerName={p2Name} targetName={p1Name} guesses={p2Guesses} isCurrentTurn={currentTurn === 2} />
            </div>
          </motion.div>
        )}

        {/* PHASE 4: GAME OVER */}
        {phase === 'GAME_OVER' && (
          <VictoryScreen
            winnerName={winner === 1 ? p1Name : p2Name}
            winningGuess={winningGuess}
            betAmount={betAmount}
            totalGuesses={winner === 1 ? p1Guesses.length : p2Guesses.length}
            p1Name={p1Name}
            p2Name={p2Name}
            p1Secret={p1Secret}
            p2Secret={p2Secret}
            onRematch={handleResetGame}
          />
        )}
      </AnimatePresence>

      <UnravelRulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}
