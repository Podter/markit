import { useAtomValue } from "jotai";

import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import Editor from "./components/editor";
import Preview from "./components/preview";
import { previewOpenAtom } from "./lib/atoms";

export default function App() {
  const previewOpen = useAtomValue(previewOpenAtom);

  return (
    <>
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
    </>
  );
}
