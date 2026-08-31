const STORAGE_KEY = 'feedbackModalLastShownAt';

export const FEEDBACK_MODAL_COOLDOWN_MS = 10 * 60 * 1000;

export const canShowFeedbackModal = (): boolean => {
  if (typeof window === 'undefined') return false;

  const lastShownAt = Number(
    window.localStorage.getItem(STORAGE_KEY) ?? Number.NaN
  );

  if (Number.isNaN(lastShownAt)) return true;

  return Date.now() - lastShownAt >= FEEDBACK_MODAL_COOLDOWN_MS;
};

export const markFeedbackModalShown = (): void => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
};
