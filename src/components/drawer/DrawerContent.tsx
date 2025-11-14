import { BsAsterisk } from "react-icons/bs";
import frame from './images/frame.png';
import codebar from './images/codebar.png';

export function DrawerContent() {

  const label = <div className="flex items-center gap-2 w-full border-t border-b text-xl md:text-2xl font-bold justify-end ">
    <BsAsterisk className="text-black" />
    <div className="pr-2 pl-4 bg-black text-white relative">Redux x Kanban</div>
  </div>;

  const stack = <div className="px-2 flex justify-between border text-xs gap-2">
    <span className="whitespace-nowrap">redux-x-kanban_</span>
    <span className="text-end">
      react + redux/ typeScript/ vite/ tailwind/ react-icons/ uuid/
    </span>
  </div>;

  const description = <div className="self-end text-black text-xs text-justify w-[200px]">
    <div className="frame-wrapper mb-1">
      <img width={200} src={codebar} />
    </div>
    Single-page application designed to practice global state management using the Redux library. The Kanban board states are managed globally, while data persistence is handled through the browser's localStorage
  </div>;

  return (
    <div className="w-full flex flex-col gap-4">
      {label}
      {stack}
      {description}

      <div className="frame-wrapper absolute bottom-4 md:bottom-9 ">
        <img height={140} width={140} src={frame} />
      </div>
    </div>
  );
}