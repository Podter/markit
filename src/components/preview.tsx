import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useAtomValue } from "jotai";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { docAtom } from "~/lib/atoms";
import { ScrollArea } from "./ui/scroll-area";

export default function Preview() {
  const doc = useAtomValue(docAtom);
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
      .process(doc)
      .then(({ result }) => setContent(result));
  }, [doc]);

  return (
    <ScrollArea className="h-[calc(100vh-2rem)]">
      <div className="prose space-y-6 p-3">{content}</div>
    </ScrollArea>
  );
}
