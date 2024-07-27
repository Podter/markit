import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Dot, FileText } from "lucide-react";

import { docAtom, savedAtom } from "~/lib/atoms";

export default function Filename() {
  const doc = useAtomValue(docAtom);
  const saved = useAtomValue(savedAtom);

  const filename = useMemo(() => {
    if (doc === null) {
      return "Untitled";
    } else {
      return doc.split("/").pop();
    }
  }, [doc]);

  return (
    <div className="flex cursor-default select-none items-center">
      <FileText className="mx-1" size={14} />
      <p className="text-xs">{filename}</p>
      {!saved && <Dot size={28} className="-ml-1.5" />}
    </div>
  );
}
