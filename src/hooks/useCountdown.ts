import { useEffect, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

function calc(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isOver: false,
  };
}

export function useCountdown(targetIso: string): TimeLeft {
  const [time, setTime] = useState<TimeLeft>(() => calc(targetIso));

  useEffect(() => {
    setTime(calc(targetIso));
    const id = setInterval(() => setTime(calc(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return time;
}
