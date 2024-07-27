import { useCallback } from "react";
import { message, save as saveDialog } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useAtomValue, useSetAtom } from "jotai";

import { docAtom, docContentAtom, savedAtom } from "~/lib/atoms";

export function useSaveFile(saveAs = false) {
  const setSaved = useSetAtom(savedAtom);
  const docContent = useAtomValue(docContentAtom);
  const doc = useAtomValue(docAtom);

  const save = useCallback(async () => {
    try {
      if (!doc || saveAs) {
        const newSavePath = await saveDialog({
          filters: [
            {
              name: "Markdown",
              extensions: ["md"],
            },
          ],
        });
        if (newSavePath) {
          await writeTextFile(newSavePath, docContent);
        }
      } else {
        await writeTextFile(doc, docContent);
      }
      setSaved(true);
    } catch (e) {
      console.error(e);
      await message("An error occurred while saving the file.", {
        title: "Error",
        type: "error",
      });
    }
  }, [doc, docContent, saveAs, setSaved]);

  return save;
}
