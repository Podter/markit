import { useCallback } from "react";
import { save as saveDialog } from "@tauri-apps/api/dialog";
import { useAtomValue } from "jotai";
import { Save } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { docAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

interface SaveFileProps {
  saveFile: (savePath: string) => Promise<void>;
}

export function SaveFile({ saveFile }: SaveFileProps) {
  const doc = useAtomValue(docAtom);

  const save = useCallback(async () => {
    if (doc) {
      await saveFile(doc);
    } else {
      const savePath = await saveDialog({
        filters: [
          {
            name: "Markdown",
            extensions: ["md"],
          },
        ],
      });
      if (savePath) {
        await saveFile(savePath);
      }
    }
  }, [doc, saveFile]);

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
