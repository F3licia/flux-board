
import React, { useState } from 'react';
import ColumnHeader from './ColumnHeader';
import TaskCard from './taskcard/TaskCard';
import { useAppDispatch } from "../../utils/reduxHooks";
import { modalActions } from '../../features/modal/modalSlice';
import { kanbanActions } from "../../features/kanban/kanbanSlice";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

type Props = { columnId: string; title: string; tasks: { id: string; content: string }[]; };

export function Column({ columnId, title, tasks }: Props) {
  const dispatch = useAppDispatch();
  const [isOver, setIsOver] = useState<boolean>(false);
  const handleAddTask = () => {
    dispatch(
      modalActions.openModal({
        modalType: 'add-task',
        data: { columnId }
      })
    );
  };
  const handleRemoveColumn = (id: string) => {
    dispatch(kanbanActions.deleteColumn({ id }));
  };
  const handleRenameColumn = (id: string) => {
    dispatch(
      modalActions.openModal({
        modalType: 'rename-column',
        data: { columnId: id, content: title }
      })
    );
  };

  // Salva i dati dell'elemento trascinato
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ taskId, sourceColId: columnId }));
  };
  // Permette il drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsOver(true);
  };
  // Resetta lo stato visivo
  const handleDragLeave = () => setIsOver(false);
  // Sposta il task nella colonna corrente
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return; const { taskId, sourceColId } = JSON.parse(data);
    dispatch(kanbanActions.moveTask({ sourceColId, destColId: columnId, sourceIndex: 0, destIndex: tasks.length }));
  };

  return (
    <div className='column'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <ColumnHeader columnTitle={title}
        actions={[{
          icon: <BsFillPencilFill />,
          label: "Modifica",
          onClick: () => handleRenameColumn(columnId),
        }, {
          icon: <BsFillTrash3Fill />,
          label: "Elimina",
          onClick: () => handleRemoveColumn(columnId),
        },]}
      />
      <div className="column__content">
        {tasks.map((task) => (
          <TaskCard key={task.id} taskId={task.id} columnId={columnId} content={task.content}
            onDragStart={(e) => handleDragStart(e, task.id)} />))}
      </div>

      <button className='column__add-task'
        onClick={handleAddTask} >
        <div className='leading-[-1]'>ADD</div>
        <div className="column__add-task__label">+</div>
      </button>
      <div className="w-full border-b"></div>
    </div >
  );
}