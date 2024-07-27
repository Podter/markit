import Dropdown from "./dropdown";
import Filename from "./filename";
import { NewFile } from "./new-file";
import { OpenFile } from "./open-file";
import { PreviewToggle } from "./preview-toggle";
import { SaveFile } from "./save-file";

export default function TopBar() {
  return (
    <div className="flex h-8 w-full select-none items-center justify-between border-b bg-background px-1">
      <Filename />
      <div className="flex items-center space-x-1">
        <PreviewToggle />
        <NewFile />
        <OpenFile />
        <SaveFile />
        <Dropdown />
      </div>
    </div>
  );
}
