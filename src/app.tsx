import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function App() {
  return (
    <>
      <TopBar />
      <div className="h-[calc(100vh-2rem)] w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>Editor</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>Viewer</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
