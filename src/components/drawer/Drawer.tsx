import { useState } from "react";
import { DrawerContent } from "./DrawerContent";
import { DrawerMobileToggle } from "./DrawerMobileToggle";
import { DrawerDesktopToggle } from "./DrawerDesktopToggle";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useBlockScroll } from "../../hooks/useBlockScroll";

export function Drawer() {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();
  useBlockScroll(isOpen && isMobile);

  return (
    <>
      <DrawerMobileToggle isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)} />
      <div
        className={`
        drawer
        ${isOpen
            ? 'translate-y-0 md:translate-y-0 md:translate-x-0'
            : '-translate-y-[calc(100dvh-64px)] md:translate-y-0 md:translate-x-[91%]'
          }
      `}
      >
        <DrawerDesktopToggle isOpen={isOpen} onToggle={() => setIsOpen(p => !p)} />
        <DrawerContent />
      </div>
    </>
  )
}