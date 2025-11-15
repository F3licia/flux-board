import { useState } from "react";
import { useAppDispatch } from "../../utils/reduxHooks";
import { kanbanActions } from "../../features/kanban/kanbanSlice";
import { modalActions } from "../../features/modal/modalSlice";

interface RenameColumnFormProps {
  columnId: string;
  content: string;
}

export function RenameColumnForm({ columnId, content }: RenameColumnFormProps) {
  const dispatch = useAppDispatch();
  const [newTitle, setNewTitle] = useState(content);

  const handleSubmit = () => {
    if (newTitle.trim()) {
      dispatch(kanbanActions.renameColumn({ columnId, newTitle }));
      dispatch(modalActions.closeModal());
    }
  };

  return (
    <div>
      <div className="modal__title">
        <h2 className="text-left text-lg font-medium">Rename column</h2>
      </div>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="modal__text-input box"
        placeholder="Nuovo titolo"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex justify-end mt-4">
        <div className="w-full border-b-def"></div>
        <button className="modal__button box-hover" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
