import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, Eye, EyeOff, CheckCircle2, UserCheck, Swords, ArrowRight, Smartphone } from 'lucide-react';
import FourDigitInput from '../../../components/games/FourDigitInput';
import UnravelBoard from '../../../components/games/UnravelBoard';
import VictoryScreen from '../../../components/games/VictoryScreen';
import UnravelRulesModal from '../../../components/games/UnravelRulesModal';

// Frame & Edge Hint Calculation Logic
const calculateHints = (secretStr, guessStr) => {
  const secret = secretStr.split('');
  const guess = guessStr.split('');

  let frames = 0;
  let edges = 0;

  const secretUsed = [false, false, false, false];
  const guessUsed = [false, false, false, false];

  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      frames++;
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (!guessUsed[i]) {
      for (let j = 0; j < 4; j++) {
        if (!secretUsed[j] && guess[i] === secret[j]) {
          edges++;
          secretUsed[j] = true;
          break;
        }
      }
    }
  }

  return { frames, edges };
};

/**
 * LocalUnravel Component
 * Handles single-device local pass-and-play 2-player Unravel game (no BIOS betting).
 */
export default function LocalUnravel({ user }) {
  // Phase: 'SETUP' | 'PLAYING' | 'GAME_OVER'
  const [phase, setPhase] = useState('SETUP');

  const p1Name = user?.name || user?.username || "Player 1";
  const p2Name = "Player 2";

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

  const handleLockP1Secret = () => {
    if (p1Secret.length !== 4) return;
    setP1SecretConfirmed(true);
    setShowSecretP1(false);
    if (p2SecretConfirmed) {
      setPhase('PLAYING');
      setCurrentTurn(1);
    }
  };

  const handleLockP2Secret = () => {
    if (p2Secret.length !== 4) return;
    setP2SecretConfirmed(true);
    setShowSecretP2(false);
    if (p1SecretConfirmed) {
      setPhase('PLAYING');
      setCurrentTurn(1);
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
      } else {
        setCurrentTurn(2);
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
      } else {
        setCurrentTurn(1);
      }
    }
  };

  const handleResetGame = () => {
    setPhase('SETUP');
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
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {/* PHASE 1: SECRET SETUP */}
        {phase === 'SETUP' && (
          <motion.div
            key="local_setup"
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
                  Pass the device to each player to lock secret codes!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* P1 Box */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${p1SecretConfirmed ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-base-200 border-yellow-500/80'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-yellow-500" /> {p1Name}'s Secret
                    </h3>
                    {p1SecretConfirmed && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {!p1SecretConfirmed ? (
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
                          Lock Secret
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs font-bold text-emerald-400 mb-1">Secret Code Saved!</p>
                      <p className="text-2xl font-black tracking-widest text-base-content/50">••••</p>
                    </div>
                  )}
                </div>

                {/* P2 Box */}
                <div className={`p-6 rounded-3xl border-2 transition-all ${p2SecretConfirmed ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-base-200 border-yellow-500/80'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-yellow-500" /> {p2Name}'s Secret
                    </h3>
                    {p2SecretConfirmed && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>

                  {!p2SecretConfirmed ? (
                    <div>
                      <FourDigitInput value={p2Secret} onChange={setP2Secret} isMasked={!showSecretP2} />
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
                          Lock Secret
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-xs font-bold text-emerald-400 mb-1">Secret Code Saved!</p>
                      <p className="text-2xl font-black tracking-widest text-base-content/50">••••</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: PLAYING */}
        {phase === 'PLAYING' && (
          <motion.div key="local_playing" className="space-y-8">
            <div className="bg-gradient-to-r from-yellow-500/20 via-base-300 to-yellow-500/20 border border-yellow-500/30 rounded-3xl p-6 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-black uppercase mb-2">
                <Swords className="w-4 h-4" /> Active Turn
              </div>
              <h2 className="text-2xl md:text-4xl font-black">
                {currentTurn === 1 ? `${p1Name}'s Turn` : `${p2Name}'s Turn`}
              </h2>
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
                  Submit Guess <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <UnravelBoard playerName={p1Name} targetName={p2Name} guesses={p1Guesses} isCurrentTurn={currentTurn === 1} />
              <UnravelBoard playerName={p2Name} targetName={p1Name} guesses={p2Guesses} isCurrentTurn={currentTurn === 2} />
            </div>
          </motion.div>
        )}

        {/* PHASE 3: GAME OVER */}
        {phase === 'GAME_OVER' && (
          <VictoryScreen
            winnerName={winner === 1 ? p1Name : p2Name}
            winningGuess={winningGuess}
            betAmount={0}
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

