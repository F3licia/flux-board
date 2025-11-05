import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHooks";
import { kanbanActions } from "../../../features/kanban/kanbanSlice";
import { modalActions } from "../../../features/modal/modalSlice";
import { ColumnSelectInput } from "./ColumnSelectInput";

interface UpdateTaskFormProps {
  columnId: string;
  taskId: string;
  content: string;
}

export function UpdateTaskForm({ columnId, taskId, content }: UpdateTaskFormProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.kanban.columns);
  const [newContent, setNewContent] = useState(content);
  const [newColumnId, setNewColumnId] = useState<string | null>(null);

  const handleColumnChange = (newColId: string) => {
    if (newColId) { setNewColumnId(newColId); }
  };

  const handleSubmit = () => {
    if (newContent.trim()) {
      dispatch(kanbanActions.updateTask({ columnId, taskId, newContent }));

    }
    if (newColumnId) {
      const sourceCol = columns.find(c => c.id === columnId);
      const destCol = columns.find(c => c.id === newColumnId);

      if (!sourceCol || !destCol) return;

      const sourceIndex = sourceCol.tasks.findIndex(t => t.id === taskId);
      const destIndex = destCol.tasks.length;

      if (sourceIndex >= 0) {
        dispatch(
          kanbanActions.moveTask({
            sourceColId: columnId,
            destColId: newColumnId,
            sourceIndex,
            destIndex
          })
        );
      }
    }

    dispatch(modalActions.closeModal());
  };

  return (
    <div>
      <div className="modal__title">
        <h2 className="text-left text-lg font-medium">Update task</h2>
      </div>

      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        className="modal__text-input"
        placeholder="Contenuto aggiornato"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex justify-between gap-2 mt-4">
        <ColumnSelectInput columnId={columnId} onChange={handleColumnChange} />
        <button className="modal__button" onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}
