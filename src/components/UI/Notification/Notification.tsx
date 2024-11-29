'use client';
import { useState, useEffect } from 'react';
import useStore from '@/app/zustand/useStore';
import translations from '../../../app/lang/successMessageNotification.json';

interface NotificationProps {
  duration?: number;
  onHide?: () => void;
}

const Notification = ({ duration = 5000, onHide }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const language = useStore((state) => state.language);
  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onHide) onHide();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide]);

  return (
    <div className={`notification ${!isVisible ? 'fade-out' : ''}`}>
      <span>{t.success_message}</span>
    </div>
  );
};

export default Notification;
