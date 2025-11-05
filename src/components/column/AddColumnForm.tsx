import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../utils/reduxHooks";
import { kanbanActions } from "../../features/kanban/kanbanSlice";
import { modalActions } from "../../features/modal/modalSlice";

export function AddColumnForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(kanbanActions.addColumn({ id: uuidv4(), title }));
      dispatch(modalActions.closeModal());
    }
  };

  return (
    <div>
      <div className="modal__title">
        <h2 className="text-left text-lg font-medium">Add column</h2>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="modal__text-input"
        placeholder="Choose a title"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex justify-end gap-2 mt-4">
        <button className="modal__button" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
