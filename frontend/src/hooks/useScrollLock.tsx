import { useCallback, useEffect, useState } from "react";

const preventDefault = (e: Event) => {
  if (e.preventDefault) {
    e.preventDefault();
  }
};

const disableBodyScroll = () =>
  document && document.addEventListener("wheel", preventDefault, { passive: false });

const enableBodyScroll = () =>
  document && document.removeEventListener("wheel", preventDefault, false);

const useScrollLock = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
    return enableBodyScroll;
  }, [hidden]);

  const disableScroll = useCallback(() => {
    setHidden(true);
  }, []);

  const enableScroll = useCallback(() => {
    setHidden(false);
  }, []);

  return [disableScroll, enableScroll];
};

export default useScrollLock;
