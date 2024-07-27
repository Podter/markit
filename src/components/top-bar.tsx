import { useCallback, useMemo } from "react";
import { message, open, save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { BookOpenText, Dot, FileText, FolderOpen, Save } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  docAtom,
  docContentAtom,
  previewOpenAtom,
  savedAtom,
} from "~/lib/atoms";
import Dropdown from "./dropdown";
import { Tooltip } from "./ui/tooltip";

export default function TopBar() {
  const setPreviewOpen = useSetAtom(previewOpenAtom);
  const [doc, setDoc] = useAtom(docAtom);
  const [saved, setSaved] = useAtom(savedAtom);
  const docContent = useAtomValue(docContentAtom);

  const filename = useMemo(() => {
    if (doc === null) {
      return "Untitled";
    } else {
      return doc.split("/").pop();
    }
  }, [doc]);

  const openFile = useCallback(async () => {
    const selectedPath = await open({
      multiple: false,
      directory: false,
    });
    if (Array.isArray(selectedPath) || selectedPath === null) {
      return;
    } else {
      setDoc(selectedPath);
    }
  }, [setDoc]);

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
    <div className="flex h-8 w-full select-none items-center justify-between border-b bg-background px-1">
      <div className="flex cursor-default select-none items-center">
        <FileText className="mx-1" size={14} />
        <p className="text-xs">{filename}</p>
        {!saved && <Dot size={28} className="-ml-1.5" />}
      </div>
      <div className="flex items-center space-x-1">
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
        <Tooltip content="Open">
          <Button size="iconSm" variant="ghost" onClick={openFile}>
            <FolderOpen size={14} />
            <span className="sr-only">Open</span>
          </Button>
        </Tooltip>
        <Tooltip content="Save">
          <Button size="iconSm" variant="ghost" onClick={saveBtn}>
            <Save size={14} />
            <span className="sr-only">Save</span>
          </Button>
        </Tooltip>
        <Dropdown saveFile={saveFile} />
      </div>
    </div>
  );
}
