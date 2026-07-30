import { useState, useRef, useCallback, useEffect } from "react";

const HOLD_SECONDS = import.meta.env.VITE_SLOT_HELD_SECONDS;

export function useSlotHold() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    sessionStorage.removeItem("slotHoldExpiresAt");
  }, []);
  
  const startTimer = useCallback(
      (expiresAt?: Date) => {
      clearTimer();
      setIsExpired(false);
      const expiry = expiresAt
        ? expiresAt.getTime()
        : Date.now() + HOLD_SECONDS * 1000;
      sessionStorage.setItem("slotHoldExpiresAt", expiry.toString());
      const initialRemaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setTimeLeft(initialRemaining);

      intervalRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
        setTimeLeft(remaining);
        if (remaining === 0) {
          clearTimer();
          setIsExpired(true);
        }
      }, 1000);
    },
    [clearTimer],
  );
  const resetTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(0);
    setIsExpired(false);
  }, [clearTimer]);

  useEffect(() => {
    const stored = sessionStorage.getItem("slotHoldExpiresAt");
    if (stored) {
      const expiry = Number(stored);
      if (!isNaN(expiry) && expiry > Date.now()) {
        startTimer(new Date(expiry));
      } else {
        sessionStorage.removeItem("slotHoldExpiresAt");
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startTimer, clearTimer]);

  return { timeLeft, isExpired, startTimer, resetTimer };
}
