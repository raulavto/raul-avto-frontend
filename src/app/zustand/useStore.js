import { create } from 'zustand';

const useStore = create((set) => ({
  language: 'ua',
  setLanguage: (lang) => {
    set({ language: lang });
  },
}));

export default useStore;
