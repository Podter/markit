import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { useDoc } from "~/contexts/doc";

export default function Preview() {
  const { doc } = useDoc();
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

  return <div>{content}</div>;
}
