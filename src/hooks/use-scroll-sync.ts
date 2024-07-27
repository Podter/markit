import type { UIEvent as ReactUIEvent } from "react";
import { useCallback, useState } from "react";

export function useScrollSync<T extends Element>(target: string) {
  const [disabled, setDisabled] = useState(false);

  const onMouseEnter = useCallback(() => setDisabled(false), []);
  const onMouseLeave = useCallback(() => setDisabled(true), []);

  const onScroll = useCallback(
    (e: ReactUIEvent<T, UIEvent>) => {
      if (disabled) return;

      const ratio =
        e.currentTarget.scrollTop /
        (e.currentTarget.scrollHeight - e.currentTarget.clientHeight);

      const targetElement = document.getElementById(target);
      if (targetElement) {
        const targetY =
          (targetElement.scrollHeight - targetElement.clientHeight) * ratio;
        targetElement.scrollTo(0, targetY);
      }
    },
    [target, disabled],
  );

  return { onScroll, onMouseEnter, onMouseLeave };
}
