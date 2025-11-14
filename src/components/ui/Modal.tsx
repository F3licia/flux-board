import { createPortal } from "react-dom";
import { modalActions } from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { BsX } from "react-icons/bs";
import { UpdateTaskForm } from "../column/taskcard/UpdateTaskForm";
import { AddColumnForm } from "../column/AddColumnForm";
import { RenameColumnForm } from "../column/RenameColumnForm";
import { AddTaskForm } from "../column/AddTaskForm";
import { useBlockScroll } from "../../hooks/useBlockScroll";

export function Modal() {
  const dispatch = useAppDispatch();
  const { isOpen, modalType, data } = useAppSelector((state) => state.modal);
  const { columnId, taskId, content } = data || {};

  useBlockScroll(isOpen);

  let toRender = null;
  if (modalType === 'update-task') {
    toRender = < UpdateTaskForm columnId={columnId!} taskId={taskId!} content={content!} />
  } else if (modalType === 'add-column') {
    toRender = < AddColumnForm />
  } else if (modalType === 'rename-column') {
    toRender = < RenameColumnForm columnId={columnId!} content={content!} />
  } else if (modalType === 'add-task') {
    toRender = <AddTaskForm columnId={columnId!} />
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="modal__bg fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal p-7 w-full max-w-md text-center"
      >
        <button
          onClick={() => dispatch(modalActions.closeModal())}
          className="absolute right-0 top-0 modal__close-button"
        ><BsX className="text-black hover:text-white" />
        </button>
        {toRender}
      </div>
    </div>,
    document.body
  );
}