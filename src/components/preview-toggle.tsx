import { useSetAtom } from "jotai";
import { BookOpenText } from "lucide-react";

import { previewOpenAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function PreviewToggle() {
  const setPreviewOpen = useSetAtom(previewOpenAtom);

  return (
    <Tooltip content="Toggle preview">
      <Button
        size="iconSm"
        variant="ghost"
        onClick={() => setPreviewOpen((open) => !open)}
      >
        <BookOpenText size={14} />
        <span className="sr-only">Toggle preview</span>
      </Button>
    </Tooltip>
  );
}
