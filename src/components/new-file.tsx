import { useCallback } from "react";
import { ask } from "@tauri-apps/api/dialog";
import { useAtomValue, useSetAtom } from "jotai";
import { FilePlus2 } from "lucide-react";

import { useSaveFile } from "~/hooks/use-save-file";
import { docAtom, docContentAtom, savedAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function NewFile() {
  const setDoc = useSetAtom(docAtom);
  const setDocContent = useSetAtom(docContentAtom);
  const save = useSaveFile();
  const saved = useAtomValue(savedAtom);

  const newFile = useCallback(async () => {
    if (!saved) {
      const shouldSave = await ask(
        "You have unsaved changes. Do you want to save them before opening a new file?",
        {
          title: "Unsaved Changes",
        },
      );
      if (shouldSave) {
        await save();
      }
    }
    setDoc(null);
    setDocContent("");
  }, [save, saved, setDoc, setDocContent]);

  return (
    <Tooltip content="New">
      <Button size="iconSm" variant="ghost" onClick={newFile}>
        <FilePlus2 size={14} />
        <span className="sr-only">New</span>
      </Button>
    </Tooltip>
  );
}
