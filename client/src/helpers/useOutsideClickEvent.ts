import { useCallback, useEffect } from "react";

export function useOutsideClickEvent<T extends HTMLElement>(target: React.RefObject<T>, onClickOutside: () => void) {
  
  const handleClickOutside = useCallback((event: Event) => {
    if (target && event.target instanceof Node && target.current && !target.current.contains(event.target)) {
      onClickOutside();
    }
  }, [target, onClickOutside]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }, [handleClickOutside]);
}