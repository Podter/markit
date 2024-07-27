import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useAtomValue } from "jotai";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { useScrollSync } from "~/hooks/use-scroll-sync";
import { docContentAtom } from "~/lib/atoms";
import { ScrollArea } from "./ui/scroll-area";

export default function Preview() {
  const scrollProps = useScrollSync("editor");

  const docContent = useAtomValue(docContentAtom);
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      // @ts-expect-error - the react types are missing
      .use(rehypeReact, {
        Fragment: Fragment,
        jsx: jsx,
        jsxs: jsxs,
      })
      .process(docContent)
      .then(({ result }) => setContent(result));
  }, [docContent]);

  return (
    <ScrollArea className="h-[calc(100vh-2rem)]" id="preview" {...scrollProps}>
      <div className="prose space-y-6 p-3">{content}</div>
    </ScrollArea>
  );
}
