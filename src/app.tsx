import { useState } from "react";

import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import Editor from "./components/editor";
import Preview from "./components/preview";

export default function App() {
  const [doc, setDoc] = useState("# Hello, world!\n");

  return (
    <>
      <TopBar />
      <div className="h-[calc(100vh-2rem)] w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Preview doc={doc} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
