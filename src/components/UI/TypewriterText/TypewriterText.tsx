'use client';

import { useEffect, useRef, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  className?: string;
  speedMs?: number;
  startDelayMs?: number;
};

const TypewriterText = ({
  text,
  className = '',
  speedMs = 68,
  startDelayMs = 200,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isInView, setIsInView] = useState(false);
  const [runId, setRunId] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowInView = entry.isIntersecting;

        if (nowInView && !wasInViewRef.current) {
          setDisplayedText('');
          setRunId((prev) => prev + 1);
          setIsInView(true);
        } else if (!nowInView && wasInViewRef.current) {
          setIsInView(false);
          setDisplayedText('');
        }

        wasInViewRef.current = nowInView;
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!isInView || runId === 0) return;

    let index = 0;
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [isInView, runId, text, speedMs, startDelayMs]);

  return (
    <span ref={elementRef} className={className}>
      {displayedText}
    </span>
  );
};

export default TypewriterText;
