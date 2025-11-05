import { configureStore } from '@reduxjs/toolkit';
import kanbanSlice from '../features/kanban/kanbanSlice';
import modalSlice from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    kanban: kanbanSlice,
    modal: modalSlice,
  },
});

function saveToLocalStorage(kanban: unknown) {
  try {
    const serialized = JSON.stringify(kanban);
    localStorage.setItem('kanbanState', serialized);
  } catch (e) {
    console.error(e);
  }
}

store.subscribe(() => {
  const storeObj = store.getState();
  if (storeObj.kanban) {
    saveToLocalStorage(storeObj.kanban);
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch