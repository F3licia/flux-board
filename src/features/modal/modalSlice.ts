import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalData {
  columnId?: string;
  taskId?: string;
  content?: string;
}
interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  data?: ModalData;
  onConfirm?: (() => void) | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  data: {},
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string; data?: ModalData, onConfirm?: () => void }>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.data = action.payload.data;
      state.onConfirm = action.payload.onConfirm;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.data = {};
      state.onConfirm = null;
    },
  }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
