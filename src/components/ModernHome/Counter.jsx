'use client';
import { useEffect, useState } from 'react';

const Counter = ({ targetNumber, duration = 4000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetNumber;
    const increment = end / (duration / 50); // Плавное увеличение каждые 50 мс
    const stepTime = 50; // Интервал обновления

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end); // Устанавливаем точное конечное значение
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, [targetNumber, duration]);

  return (
    <span
      style={{
        display: 'inline-block',
        transition: 'all 0.3s ease-out',
      }}
    >
      {count.toLocaleString()}{' '}
    </span>
  );
};

export default Counter;
