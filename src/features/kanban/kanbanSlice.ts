import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Board = {
  columns: Column[];
};

let initialState: Board = {
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1-1', content: 'Hey I just tell you' },
        { id: 'task-1-2', content: 'and this is crazy' }
      ],
    },
    {
      id: 'col-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-2-1', content: 'but u forgot that' },
      ],
    },
    {
      id: 'col-3',
      title: 'Done',
      tasks: [
        { id: 'task-3-1', content: 'so Kanban maybe' },
      ],
    },
  ],
};

const columnsJson = localStorage.getItem('kanbanState');
if (columnsJson) {
  const columns = JSON.parse(columnsJson);
  initialState = columns;
}

const kanbanSlice = createSlice({
  name: 'kanban-slice',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<{ id: string; title: string }>) => {
      state.columns.push({ id: action.payload.id, title: action.payload.title, tasks: [] });
    },

    renameColumn: (state, action: PayloadAction<{ columnId: string; newTitle: string }>) => {
      const column = state.columns.find((col) => col.id === action.payload.columnId);
      if (column) column.title = action.payload.newTitle;
    },

    deleteColumn: (state, action: PayloadAction<{ id: string }>) => {
      state.columns = state.columns.filter((col) => col.id !== action.payload.id);
    },

    addTask: (state, action: PayloadAction<{ columnId: string; task: Task }>) => {
      const column = state.columns.find((col) => col.id === action.payload.columnId);
      if (column) column.tasks.push(action.payload.task);
    },

    updateTask: (state, action: PayloadAction<{ columnId: string; taskId: string; newContent: string }>) => {
      const column = state.columns.find((col) => col.id === action.payload.columnId);
      const task = column?.tasks.find((t) => t.id === action.payload.taskId);
      if (task) task.content = action.payload.newContent;
    },

    deleteTask: (state, action: PayloadAction<{ columnId: string; taskId: string }>) => {
      const column = state.columns.find((col) => col.id === action.payload.columnId);
      if (column) column.tasks = column.tasks.filter((t) => t.id !== action.payload.taskId);
    },

    moveTask: (
      state,
      action: PayloadAction<{
        sourceColId: string;
        destColId: string;
        sourceIndex: number;
        destIndex: number;
      }>
    ) => {
      const { sourceColId, destColId, sourceIndex, destIndex } = action.payload;
      const sourceCol = state.columns.find((col) => col.id === sourceColId);
      const destCol = state.columns.find((col) => col.id === destColId);

      if (!sourceCol || !destCol) return;

      const [movedTask] = sourceCol.tasks.splice(sourceIndex, 1);

      if (movedTask === undefined) return;

      destCol.tasks.splice(destIndex, 0, movedTask);
    },
  },
})

export const kanbanActions = kanbanSlice.actions;
export default kanbanSlice.reducer;