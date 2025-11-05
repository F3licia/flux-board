import React from 'react';
import { useAppDispatch, useAppSelector } from '../utils/reduxHooks';
import { Column } from './column/Column';
import { modalActions } from '../features/modal/modalSlice';

const MainBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.kanban.columns);

  const handleAddColumn = () => {
    dispatch(
      modalActions.openModal({
        modalType: 'add-column'
      })
    );

  };

  return (
    <div className="main-board">
      {columns.map((column) => (
        <Column
          key={column.id}
          columnId={column.id}
          title={column.title}
          tasks={column.tasks}
        />
      ))}

      <button
        onClick={handleAddColumn}
        className="main-board__add-column"
      >
        <div className="main-board__add-column__label">ADD +</div>
      </button>
    </div>
  );
};

export default MainBoard;
