import React, { useState } from 'react';
import { kanbanActions } from '../../../features/kanban/kanbanSlice';
import { useAppDispatch } from '../../../utils/reduxHooks';
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { modalActions } from '../../../features/modal/modalSlice';

type Props = {
  taskId: string;
  columnId: string;
  content: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;

};

const TaskCard: React.FC<Props> = ({ taskId, columnId, content, onDragStart }) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);

  const handleRemoveTask = (taskId: string) => {
    dispatch(kanbanActions.deleteTask({ columnId, taskId }));
  };

  const handleUpdateTask = (taskId: string) => {
    dispatch(
      modalActions.openModal({
        modalType: 'update-task',
        data: { columnId: columnId, taskId: taskId, content: content }
      })
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStart(e);

    // Idealmente andrebbe centrato al cursore
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
    </svg>
  `;
    const img = new Image();
    img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    e.dataTransfer.setDragImage(img, 70, 20);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`task-card border-def cursor-grab active:cursor-grabbing transition 
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <p className="task-card__paragraph text-box border-def">{content}</p>

      <div className='task-card__button-group'>
        <button
          onClick={() => handleUpdateTask(taskId)}
          className="task-card__button-group__button box-hover border-def"
        >
          <BsPencilSquare />
        </button>
        <button
          onClick={() => handleRemoveTask(taskId)}
          className="task-card__button-group__button box-hover border-def"
        >
          <BsTrash3 />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
