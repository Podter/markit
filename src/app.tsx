import { useState } from "react";

import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { useProcessor } from "./hooks/use-processor";

export default function App() {
  const [doc, setDoc] = useState("# Hello, world!\n");
  const content = useProcessor(doc);

  return (
    <>
      <TopBar />
      <div className="h-[calc(100vh-2rem)] w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>Editor</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>{content}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
