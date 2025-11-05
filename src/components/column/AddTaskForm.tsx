import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../utils/reduxHooks";
import { kanbanActions } from "../../features/kanban/kanbanSlice";
import { modalActions } from "../../features/modal/modalSlice";

interface AddTaskProps {
  columnId: string;
}

export function AddTaskForm({ columnId }: AddTaskProps) {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      dispatch(kanbanActions.addTask({ columnId, task: { id: uuidv4(), content } }));
      dispatch(modalActions.closeModal());
    }
  };

  return (
    <div>
      <div className="modal__title">
        <h2 className="text-left text-lg font-medium">Add new task</h2>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="modal__text-input"
        placeholder="What will it be?"
      />
      <div className="flex justify-end mt-4">
        <div className="w-full border-b"></div>
        <button className="modal__button" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
