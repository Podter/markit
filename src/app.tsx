import { useEffect } from "react";
import { message } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import Editor from "./components/editor";
import Preview from "./components/preview";
import { TooltipProvider } from "./components/ui/tooltip";
import { docAtom, docContentAtom, previewOpenAtom } from "./lib/atoms";

export default function App() {
  const previewOpen = useAtomValue(previewOpenAtom);
  const [doc, setDoc] = useAtom(docAtom);
  const setDocContent = useSetAtom(docContentAtom);

  useEffect(() => {
    if (!doc) return;

    readTextFile(doc)
      .then((content) => {
        setDocContent(content);
      })
      .catch(async (e) => {
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc]);

  return (
    <TooltipProvider>
      <TopBar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={25} order={1} id="editor-panel">
          <Editor />
        </ResizablePanel>
        {previewOpen && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={25} order={2} id="preview-panel">
              <Preview />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
