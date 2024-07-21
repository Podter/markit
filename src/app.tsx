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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Editor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Preview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </DocProvider>
  );
}
