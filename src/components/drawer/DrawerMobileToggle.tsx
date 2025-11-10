import { BsAsterisk, BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import type { ToggleTrigger } from "../../types";

export function DrawerMobileToggle({ isOpen, onToggle }: ToggleTrigger) {

  return (
    <div
      onClick={onToggle}
      className="block md:hidden fixed top-0 rigth-0 pt-4 pl-4 pr-4 pb-4 z-50 min-w-full bg-white border-b-white border-t border-l border-r">
      <div className="absolute top-1/2 -translate-y-1/2 text-2xl">
        {isOpen ? <BsChevronDoubleUp /> : <BsChevronDoubleDown />}
      </div>
      <div className="flex items-center justify-end gap-2 w-full border-t border-b text-xl md:text-2xl font-bold ">
        <BsAsterisk className="text-black" />
        <div className="pr-2 pl-4 bg-black text-white relative">Redux x Kanban</div>
      </div>
    </div>
  )
}