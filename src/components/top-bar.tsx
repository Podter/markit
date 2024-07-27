import { useCallback } from "react";
import { message } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useAtomValue, useSetAtom } from "jotai";

import { docContentAtom, savedAtom } from "~/lib/atoms";
import Dropdown from "./dropdown";
import Filename from "./filename";
import { OpenFile } from "./open-file";
import { PreviewToggle } from "./preview-toggle";
import { SaveFile } from "./save-file";

export default function TopBar() {
  const setSaved = useSetAtom(savedAtom);
  const docContent = useAtomValue(docContentAtom);

  const saveFile = useCallback(
    async (savePath: string) => {
      try {
        await writeTextFile(savePath, docContent);
        setSaved(true);
      } catch (e) {
        console.error(e);
        await message("An error occurred while saving the file.", {
          title: "Error",
          type: "error",
        });
      }
    },
    [docContent, setSaved],
  );

  return (
    <div className="flex h-8 w-full select-none items-center justify-between border-b bg-background px-1">
      <Filename />
      <div className="flex items-center space-x-1">
        <PreviewToggle />
        <OpenFile />
        <SaveFile saveFile={saveFile} />
        <Dropdown saveFile={saveFile} />
      </div>
    </div>
  );
}
