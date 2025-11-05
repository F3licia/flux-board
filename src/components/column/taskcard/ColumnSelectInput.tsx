import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../utils/reduxHooks";

type Props = {
  columnId: string;
  onChange: (newColumnId: string) => void;
};

export function ColumnSelectInput({ columnId, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const columns = useAppSelector((state) => state.kanban.columns);
  const currentCol = columns.find((col) => col.id === columnId);
  const [selectedColumn, setSelectedColumn] = useState(currentCol);

  // chiude al click esterno
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    const col = columns.find((c) => c.id === id);
    if (!col) return;
    setSelectedColumn(col);
    onChange(col.id);
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative">
      {selectedColumn && (
        <div className="custom-select__wrapper">
          <button className="custom-select" onClick={() => setIsOpen((prev) => !prev)}>
            {selectedColumn.title}
          </button></div>
      )}

      {isOpen && (
        <div
          className="custom-select__dropdown">
          {columns.filter((column) => column.id !== selectedColumn?.id)
            .map((column) => (
              <div className="custom-select__wrapper">
                <button className="custom-select"
                  onClick={() => handleSelect(column.id)}
                  key={column.id}
                >
                  {column.title}
                </button>
              </div>
            ))}
        </div>)}
    </div>
  );
}