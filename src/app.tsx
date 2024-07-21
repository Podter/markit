import TopBar from "~/components/top-bar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import Editor from "./components/editor";
import Preview from "./components/preview";
import { DocProvider } from "./contexts/doc";

export default function App() {
  return (
    <DocProvider>
      <TopBar />
      <div className="h-[calc(100vh-2rem)] w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <Editor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Preview />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DocProvider>
  );
}
