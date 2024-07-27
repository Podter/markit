import { useCallback } from "react";
import { save } from "@tauri-apps/api/dialog";
import { useAtomValue } from "jotai";
import { Save } from "lucide-react";

import { docAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

interface SaveFileProps {
  saveFile: (savePath: string) => Promise<void>;
}

export function SaveFile({ saveFile }: SaveFileProps) {
  const doc = useAtomValue(docAtom);

  const saveBtn = useCallback(async () => {
    if (doc) {
      await saveFile(doc);
    } else {
      const savePath = await save({
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

  return (
    <Tooltip content="Save">
      <Button size="iconSm" variant="ghost" onClick={saveBtn}>
        <Save size={14} />
        <span className="sr-only">Save</span>
      </Button>
    </Tooltip>
  );
}
