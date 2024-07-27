import { useAtom } from "jotai";
import { Ellipsis } from "lucide-react";

import { syncScrollAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Dropdown() {
  const [syncScroll, setSyncScroll] = useAtom(syncScrollAtom);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="iconSm" variant="ghost">
          <Ellipsis size={14} />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="origin-top-right"
      >
        <DropdownMenuCheckboxItem>Dark mode</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={syncScroll}
          onCheckedChange={setSyncScroll}
        >
          Sync scroll
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
