import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import type { ToggleTrigger } from "../../types";

export function DrawerDesktopToggle({ isOpen, onToggle }: ToggleTrigger) {

  return (
    <div
      onClick={onToggle}
      className="hidden md:block w-12 h-full relative">
      <div className="absolute pt-1 left-1/2 -translate-x-1/2 text-2xl cursor-pointer">
        {isOpen ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
      </div>
    </div>
  )
}