/**
 * Game Utility Functions and Shared Constants
 */

export const MAX_HANDKERCHIEF_PENALTY_TIME = 300;

/**
 * Calculates frames (exact match position & digit) and edges (correct digit, wrong position)
 * for the Unravel code cracking game.
 * 
 * @param {string} secretStr - 4-digit secret string
 * @param {string} guessStr - 4-digit guess string
 * @returns {{ frames: number, edges: number }}
 */
export const calculateHints = (secretStr, guessStr) => {
  if (!secretStr || !guessStr || secretStr.length !== 4 || guessStr.length !== 4) {
    return { frames: 0, edges: 0 };
  }

  const secret = secretStr.split('');
  const guess = guessStr.split('');

  let frames = 0;
  let edges = 0;

  const secretUsed = [false, false, false, false];
  const guessUsed = [false, false, false, false];

  // First pass: exact matches (Frames)
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      frames++;
      secretUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // Second pass: correct digit in different position (Edges)
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
 * Calculates round result type and penalty time for Drop the Handkerchief.
 * 
 * @param {number} dropTime - Secret drop time (0 - 60s)
 * @param {number} checkTime - Checker's guessed time (0 - 60s)
 * @returns {{ type: 'PERFECT' | 'FOUL' | 'DELAY', penalty: number }}
 */
export const calculateHandkerchiefPenalty = (dropTime, checkTime) => {
  const dTime = Number(dropTime);
  const cTime = Number(checkTime);

  if (cTime === dTime) {
    return { type: 'PERFECT', penalty: 0 };
  } else if (cTime < dTime) {
    return { type: 'FOUL', penalty: 60 };
  } else {
    return { type: 'DELAY', penalty: Number((cTime - dTime).toFixed(1)) };
  }
};
