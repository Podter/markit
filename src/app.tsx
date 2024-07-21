import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import Editor from "./components/editor";
import Preview from "./components/preview";

export default function App() {
  return (
    <>
      <TopBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-2rem)]"
      >
        <ResizablePanel minSize={25}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={25}>
          <Preview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
