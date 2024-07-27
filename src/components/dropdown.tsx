import { useCallback } from "react";
import { save } from "@tauri-apps/api/dialog";
import { useAtom } from "jotai";
import { Ellipsis } from "lucide-react";

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

interface DropdownProps {
  saveFile: (savePath: string) => Promise<void>;
}

export default function Dropdown({ saveFile }: DropdownProps) {
  const [syncScroll, setSyncScroll] = useAtom(syncScrollAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  const saveAs = useCallback(async () => {
    const savePath = await save({
      filters: [
        {
          name: "Markdown",
          extensions: ["md"],
        },
      ],
    });
    if (savePath) {
      await saveFile(savePath);
    }
  }, [saveFile]);

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
        <DropdownMenuItem onSelect={saveAs}>Save as</DropdownMenuItem>
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
