import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  /** Duration in hours (default: 24) */
  durationHours?: number;
  /** Custom title text */
  title?: string;
  /** Show warning when less than 2 hours remaining */
  showWarning?: boolean;
}

/**
 * Countdown Timer Component
 * Displays a prominent countdown timer to create urgency
 * Stores expiration time in localStorage to persist across page refreshes
 */
export function CountdownTimer({
  durationHours = 24,
  title = "OFFER EXPIRES IN",
  showWarning = true,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [isExpired, setIsExpired] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    // Get or create expiration time
    const storageKey = `countdown-expiration-${durationHours}h`;
    let expirationTime = localStorage.getItem(storageKey);

    if (!expirationTime) {
      // Create new expiration time
      const now = new Date();
      const expiration = new Date(now.getTime() + durationHours * 60 * 60 * 1000);
      expirationTime = expiration.toISOString();
      localStorage.setItem(storageKey, expirationTime);
    }

    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date();
      const expiration = new Date(expirationTime!);
      const diff = expiration.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });

        // Show warning when less than 2 hours remaining
        if (showWarning && hours < 2 && hours > 0) {
          setIsWarning(true);
        } else if (hours >= 2) {
          setIsWarning(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [durationHours, showWarning]);

  if (!timeLeft) {
    return null;
  }

  const bgColor = isExpired
    ? "bg-red-600"
    : isWarning
      ? "bg-orange-500"
      : "bg-blue-600";

  const borderColor = isExpired
    ? "border-red-700"
    : isWarning
      ? "border-orange-600"
      : "border-blue-700";

  return (
    <div
      className={`${bgColor} ${borderColor} border-2 rounded-xl p-4 md:p-6 shadow-2xl mb-8 animate-pulse`}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
        <p className="text-white font-bold text-sm md:text-base">{title}</p>
      </div>

      {/* Timer Display */}
      {isExpired ? (
        <div className="text-center">
          <p className="text-white font-bold text-2xl md:text-3xl">
            OFFER EXPIRED
          </p>
          <p className="text-red-100 text-sm mt-2">
            This offer is no longer available
          </p>
        </div>
      ) : (
        <div className="flex justify-center gap-2 md:gap-4">
          {/* Hours */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 md:p-4 min-w-16 md:min-w-20">
            <p className="text-white font-bold text-2xl md:text-4xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            <p className="text-white text-xs md:text-sm font-semibold">HOURS</p>
          </div>

          {/* Separator */}
          <div className="flex items-center">
            <p className="text-white font-bold text-2xl md:text-3xl">:</p>
          </div>

          {/* Minutes */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 md:p-4 min-w-16 md:min-w-20">
            <p className="text-white font-bold text-2xl md:text-4xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            <p className="text-white text-xs md:text-sm font-semibold">MINS</p>
          </div>

          {/* Separator */}
          <div className="flex items-center">
            <p className="text-white font-bold text-2xl md:text-3xl">:</p>
          </div>

          {/* Seconds */}
          <div className="bg-white bg-opacity-20 rounded-lg p-3 md:p-4 min-w-16 md:min-w-20">
            <p className="text-white font-bold text-2xl md:text-4xl">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
            <p className="text-white text-xs md:text-sm font-semibold">SECS</p>
          </div>
        </div>
      )}

      {/* Warning Message */}
      {isWarning && !isExpired && (
        <p className="text-white text-center text-xs md:text-sm font-bold mt-3 animate-bounce">
          ⚠️ HURRY! Less than 2 hours remaining
        </p>
      )}
    </div>
  );
}
