import React, { useRef } from 'react';

/**
 * FourDigitInput Component
 * Styled 4-digit PIN input with backspace, auto-focus navigation, and masking support.
 */
export default function FourDigitInput({
  value = "",
  onChange,
  disabled = false,
  autoFocus = false,
  isMasked = false
}) {
  const inputRefs = useRef([]);

  const handleCharChange = (val, index) => {
    if (!/^\d*$/.test(val)) return;
    const digits = value.padEnd(4, ' ').split('');

    if (val.length > 1) {
      const pasted = val.slice(0, 4).split('');
      const newDigits = [...digits];
      pasted.forEach((d, i) => {
        if (index + i < 4) newDigits[index + i] = d;
      });
      const finalVal = newDigits.join('').replace(/\s/g, '');
      onChange(finalVal);
      const nextFocus = Math.min(index + pasted.length, 3);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    digits[index] = val || ' ';
    const result = digits.join('').replace(/\s/g, '');
    onChange(result);

    if (val && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const digits = value.padEnd(4, ' ').split('');
      if (digits[index] && digits[index] !== ' ') {
        digits[index] = ' ';
        onChange(digits.join('').replace(/\s/g, ''));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center my-2">
      {[0, 1, 2, 3].map((idx) => {
        const char = value[idx] || '';
        return (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type={isMasked ? "password" : "text"}
            inputMode="numeric"
            maxLength={4}
            disabled={disabled}
            value={char}
            onChange={(e) => handleCharChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-14 h-16 text-center text-3xl font-extrabold rounded-2xl border-2 border-base-content/20 bg-base-100 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 focus:outline-none transition-all shadow-inner disabled:opacity-50"
            autoFocus={autoFocus && idx === 0}
          />
        );
      })}
    </div>
  );
}

