import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeInputProps {
  onSubmit: (code: string) => void;
  onValidate: (code: string) => boolean;
  teamColor: string;
}

export const CodeInput = ({ onSubmit, onValidate, teamColor }: CodeInputProps) => {
  const [digits, setDigits] = useState<string[]>(['', '', '']);
  const [isValidating, setIsValidating] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setShowError(false);

    // Auto-focus next input
    if (value && index < 2) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    // Handle Enter to submit
    if (e.key === 'Enter' && digits.every((d) => d !== '')) {
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 3);
    if (/^\d{3}$/.test(pastedData)) {
      const newDigits = pastedData.split('');
      setDigits(newDigits);
      inputRefs[2].current?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = digits.join('');
    if (code.length !== 3) return;

    setIsValidating(true);

    // Add a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isValid = onValidate(code);

    if (isValid) {
      onSubmit(code);
    } else {
      setShowError(true);
      setIsValidating(false);

      // Clear inputs after error
      setTimeout(() => {
        setDigits(['', '', '']);
        setShowError(false);
        inputRefs[0].current?.focus();
      }, 1000);
    }
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Input Container */}
      <motion.div
        animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex justify-center gap-3 mb-6">
          {digits.map((digit, index) => (
            <motion.input
              key={index}
              ref={inputRefs[index]}
              type="number"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`code-digit-compact ${showError ? 'border-crimson' : ''}`}
              style={
                digit && !showError
                  ? {
                      borderColor: teamColor,
                      color: teamColor,
                    }
                  : showError
                  ? {
                      borderColor: '#8b0000',
                      color: '#8b0000',
                    }
                  : {}
              }
              disabled={isValidating}
            />
          ))}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-4"
            >
              <p className="text-crimson font-bold text-lg">
                ❌ Código Incorrecto
              </p>
              <p className="text-amber-dark text-sm mt-1">
                Intenta nuevamente...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0.5 }}
        className="flex justify-center mt-2"
      >
        <button
          onClick={handleSubmit}
          disabled={!isComplete || isValidating}
          className="mystery-btn text-lg px-8 py-3 no-select w-full"
          style={
            isComplete && !isValidating
              ? {
                  backgroundColor: teamColor,
                  boxShadow: `0 4px 20px ${teamColor}60`,
                }
              : {}
          }
        >
          {isValidating ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                🔍
              </motion.span>
              Verificando...
            </span>
          ) : (
            'Verificar Código'
          )}
        </button>
      </motion.div>

    </div>
  );
};
