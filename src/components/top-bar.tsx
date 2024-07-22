import { useSetAtom } from "jotai";
import { BookOpenText, Dot, FileText, FolderOpen, Save } from "lucide-react";

import { Button } from "~/components/ui/button";
import { previewOpenAtom } from "~/lib/atoms";

export default function TopBar() {
  const setPreviewOpen = useSetAtom(previewOpenAtom);

  return (
    <div className="flex h-8 w-full select-none items-center justify-between border-b bg-background px-1">
      <div className="flex items-center">
        <FileText className="mx-1" size={14} />
        <p className="text-xs">my-markdown.md</p>
        <Dot size={28} className="-ml-1.5" />
      </div>
      <div className="flex items-center space-x-1">
        <Button
          size="iconSm"
          variant="ghost"
          onClick={() => setPreviewOpen((open) => !open)}
        >
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
  );
}
