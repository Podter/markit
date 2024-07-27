import { useCallback } from "react";
import { ask, message, open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useAtomValue, useSetAtom } from "jotai";
import { FolderOpen } from "lucide-react";

import { useSaveFile } from "~/hooks/use-save-file";
import { docAtom, docContentAtom, savedAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function OpenFile() {
  const setDoc = useSetAtom(docAtom);
  const setDocContent = useSetAtom(docContentAtom);
  const save = useSaveFile();
  const saved = useAtomValue(savedAtom);

  const openFile = useCallback(async () => {
    const selectedPath = await open({
      multiple: false,
      directory: false,
    });
    if (Array.isArray(selectedPath) || selectedPath === null) {
      return;
    } else {
      try {
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

        setDoc(selectedPath);
        const content = await readTextFile(selectedPath);
        setDocContent(content);
      } catch (e) {
        console.error(e);
        await message(
          "An error occurred while trying to read the file. Please try again.",
          {
            title: "Error",
            type: "error",
          },
        );
        setDoc(null);
        setDocContent("");
      }
    }
  }, [save, saved, setDoc, setDocContent]);

  return (
    <Tooltip content="Open">
      <Button size="iconSm" variant="ghost" onClick={openFile}>
        <FolderOpen size={14} />
        <span className="sr-only">Open</span>
      </Button>
    </Tooltip>
  );
}
