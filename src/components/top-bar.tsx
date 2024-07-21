import { BookOpenText, Dot, FileText, FolderOpen, Save } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex h-8 w-full select-none items-center justify-between border-b bg-background px-1">
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
  );
}
