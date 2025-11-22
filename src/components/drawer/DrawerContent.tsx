import { BsAsterisk, BsFolder2Open, BsGithub, BsLinkedin } from "react-icons/bs";
import codebar from '../../assets/images/codebar.png';

export function DrawerContent() {

  const label = <div className="flex items-center gap-2 w-full border-x-def text-xl md:text-2xl font-bold justify-end">
    <BsAsterisk className="text-box" />
    <div className="pr-2 pl-4 relative negative-text-box">FluxBoard</div>
  </div>;

  const stack = <div className="px-2 flex justify-between border-def text-xs gap-2">
    <span className="whitespace-nowrap">flux-board_</span>
    <span className="text-end">
      react + redux/ typeScript/ vite/ tailwind/ react-icons/ uuid/
    </span>
  </div>;

  const description = <div className="self-end text-xs text-justify w-[200px] text-box">
    <div className="frame-wrapper mb-1">
      <img width={200} src={codebar} />
    </div>
    Single-page application designed to practice global state management using the Redux library. The Kanban board states are managed globally, while data persistence is handled through the browser's localStorage.
  </div>;

  return (
    <div className="w-full flex flex-col gap-4">
      {label}
      {stack}
      {description}

      <div className="absolute bottom-4 md:bottom-9 cursor-pointer flex gap-4">
        <a className="p-1 text-box-hover" href="https://github.com/F3licia/flux-board/" target="_blank"><BsFolder2Open className="text-2xl" /></a>
        <a className="p-1 text-box-hover" href="https://github.com/F3licia/" target="_blank"><BsGithub className="text-2xl" /></a>
        <a className="p-1 text-box-hover" href="https://www.linkedin.com/in/felicia-romeo-9b607411b/" target="_blank"><BsLinkedin className="text-2xl" /></a>
      </div>
    </div>
  );
}