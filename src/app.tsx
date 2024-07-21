import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function App() {
  return (
    <>
      <div className="h-8 w-full border-b"></div>
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
