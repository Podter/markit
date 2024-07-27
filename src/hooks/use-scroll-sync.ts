import type { UIEvent as ReactUIEvent } from "react";
import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import { syncScrollAtom } from "~/lib/atoms";

export function useScrollSync<T extends Element>(target: string) {
  const syncScroll = useAtomValue(syncScrollAtom);
  const [disabled, setDisabled] = useState(false);

  const onMouseEnter = useCallback(() => setDisabled(false), []);
  const onMouseLeave = useCallback(() => setDisabled(true), []);

  const onScroll = useCallback(
    (e: ReactUIEvent<T, UIEvent>) => {
      if (disabled || !syncScroll) return;

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
    [target, disabled, syncScroll],
  );

  return { onScroll, onMouseEnter, onMouseLeave };
}
