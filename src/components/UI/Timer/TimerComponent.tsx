'use client';
import { useEffect, useState } from 'react';

type TimerProps = {
  targetDate?: string; 
};

const Timer = ({ targetDate = '2025-03-29T00:00:00' }: TimerProps) => {
  const targetTime = new Date(targetDate).getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }
    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        '0'
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        '0'
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        '0'
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    
  return (
    <ul className="flex w-full justify-between items-center text-[#D6031B] font-bold gap-[10px]">
      <li className="flex flex-col items-center">
        <span className="text-[16px] tabletplus:text-[35px]">{timeLeft.days}</span>
        <span className="text-[12px]">Дні</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="text-[16px] tabletplus:text-[35px]">{timeLeft.hours}</span>
        <span className="text-[12px]">Години</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="text-[16px] tabletplus:text-[35px]">{timeLeft.minutes}</span>
        <span className="text-[12px]">Хвилини</span>
      </li>
      <li className="flex flex-col items-center">
        <span className="text-[16px] tabletplus:text-[35px]">{timeLeft.seconds}</span>
        <span className="text-[12px]">Секунди</span>
      </li>
    </ul>
  );
};

export default Timer;
