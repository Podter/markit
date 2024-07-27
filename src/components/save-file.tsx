import { Save } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { useSaveFile } from "~/hooks/use-save-file";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function SaveFile() {
  const save = useSaveFile();
  useHotkeys("ctrl+s", save);

  return (
    <Tooltip content="Save">
      <Button size="iconSm" variant="ghost" onClick={save}>
        <Save size={14} />
        <span className="sr-only">Save</span>
      </Button>
    </Tooltip>
  );
}
