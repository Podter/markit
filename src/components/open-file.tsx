import { useCallback } from "react";
import { message, open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useSetAtom } from "jotai";
import { FolderOpen } from "lucide-react";

import { docAtom, docContentAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function OpenFile() {
  const setDoc = useSetAtom(docAtom);
  const setDocContent = useSetAtom(docContentAtom);

  const openFile = useCallback(async () => {
    const selectedPath = await open({
      multiple: false,
      directory: false,
    });
    if (Array.isArray(selectedPath) || selectedPath === null) {
      return;
    } else {
      try {
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
  }, [setDoc, setDocContent]);

  return (
    <Tooltip content="Open">
      <Button size="iconSm" variant="ghost" onClick={openFile}>
        <FolderOpen size={14} />
        <span className="sr-only">Open</span>
      </Button>
    </Tooltip>
  );
}
