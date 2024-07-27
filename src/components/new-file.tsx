import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { FilePlus2 } from "lucide-react";

import { docAtom, docContentAtom } from "~/lib/atoms";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";

export function NewFile() {
  const setDoc = useSetAtom(docAtom);
  const setDocContent = useSetAtom(docContentAtom);

  const newFile = useCallback(async () => {
    setDoc(null);
    setDocContent("");
  }, [setDoc, setDocContent]);

  return (
    <Tooltip content="New">
      <Button size="iconSm" variant="ghost" onClick={newFile}>
        <FilePlus2 size={14} />
        <span className="sr-only">New</span>
      </Button>
    </Tooltip>
  );
}
