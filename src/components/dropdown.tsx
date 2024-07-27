import { useAtom } from "jotai";
import { Ellipsis } from "lucide-react";

import { useSaveFile } from "~/hooks/use-save-file";
import { syncScrollAtom, themeAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Dropdown() {
  const [syncScroll, setSyncScroll] = useAtom(syncScrollAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const save = useSaveFile(true);

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
        <DropdownMenuItem onSelect={save}>Save as</DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={syncScroll}
          onCheckedChange={setSyncScroll}
        >
          Sync scroll
        </DropdownMenuCheckboxItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
