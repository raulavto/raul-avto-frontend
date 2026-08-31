'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/hooks/redux-hook';
import { openModalFeedback } from '@/Redux/feedbackFormSlice/feedbackFormSlice';
import {
  canShowFeedbackModal,
  markFeedbackModalShown,
} from '@/utils/feedbackModalThrottle';

const DELAY_MS = 30 * 1000;

/**
 * Opens the callback modal 30s after a calculation, at most once per cooldown.
 * The timer intentionally survives `hasCalculated` going back to false, which
 * happens as soon as the user closes the PDF popup.
 */
export const useFeedbackModalAfterCalculation = (hasCalculated: boolean) => {
  const dispatch = useAppDispatch();
  const timerRef = useRef<number | null>(null);
  const isScheduledRef = useRef(false);

  useEffect(() => {
    if (!hasCalculated || isScheduledRef.current) return;
    if (!canShowFeedbackModal()) return;

    isScheduledRef.current = true;

    timerRef.current = window.setTimeout(() => {
      isScheduledRef.current = false;

      if (!canShowFeedbackModal()) return;

      markFeedbackModalShown();
      dispatch(openModalFeedback());
    }, DELAY_MS);
  }, [hasCalculated, dispatch]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    },
    []
  );
};
