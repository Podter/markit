import { BookOpenText, Dot, FileText, FolderOpen, Save } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function App() {
  return (
    <>
      <div className="flex h-8 w-full select-none items-center justify-between border-b px-1">
        <div className="flex items-center">
          <FileText className="mx-1" size={14} />
          <p className="text-xs">my-markdown.md</p>
          <Dot size={28} className="-ml-1.5" />
        </div>
        <div className="flex items-center space-x-1">
          <Button size="iconSm" variant="ghost">
            <BookOpenText size={14} />
            <span className="sr-only">Toggle preview</span>
          </Button>
          <Button size="iconSm" variant="ghost">
            <FolderOpen size={14} />
            <span className="sr-only">Open</span>
          </Button>
          <Button size="iconSm" variant="ghost">
            <Save size={14} />
            <span className="sr-only">Save</span>
          </Button>
        </div>
      </div>
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
