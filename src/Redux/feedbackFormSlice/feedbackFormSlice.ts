// src/redux/modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalFeedbackOpen: boolean;
}

const initialState: ModalState = {
  isModalFeedbackOpen: false,
};

const feedbackFormSlice = createSlice({
  name: 'modalFeedback',
  initialState,
  reducers: {
    openModalFeedback(state) {
      state.isModalFeedbackOpen = true;
    },
    closeModalFeedback(state) {
      state.isModalFeedbackOpen = false;
    },
  },
});

export const { openModalFeedback, closeModalFeedback } =
  feedbackFormSlice.actions;
export default feedbackFormSlice.reducer;
