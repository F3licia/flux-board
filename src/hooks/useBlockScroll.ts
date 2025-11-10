import { useEffect } from "react";

export function useBlockScroll(flag: boolean) {
  useEffect(() => {
    if (flag) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [flag]);

  return flag;
}