import { useCallback } from "react";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  defaultHighlightStyle,
  HighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { whiteDark, whiteLight } from "@uiw/codemirror-theme-white";
import CodeMirror from "@uiw/react-codemirror";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { useScrollSync } from "~/hooks/use-scroll-sync";
import { docContentAtom, resolvedThemeAtom, savedAtom } from "~/lib/atoms";
import { ScrollArea } from "./ui/scroll-area";

const headingStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    class: "text-4xl font-bold",
  },
  {
    tag: tags.heading2,
    class: "text-3xl font-semibold",
  },
  {
    tag: tags.heading3,
    class: "text-2xl font-semibold",
  },
  {
    tag: tags.heading4,
    class: "text-xl font-semibold",
  },
]);

export default function Editor() {
  const scrollProps = useScrollSync("preview");
  const [docContent, setDocContent] = useAtom(docContentAtom);
  const setSaved = useSetAtom(savedAtom);
  const resolvedTheme = useAtomValue(resolvedThemeAtom);

  const onChange = useCallback(
    (content: string) => {
      setDocContent(content);
      setSaved(false);
    },
    [setDocContent, setSaved],
  );

  return (
    <ScrollArea className="h-[calc(100vh-2rem)]" id="editor" {...scrollProps}>
      <CodeMirror
        value={docContent}
        onChange={onChange}
        theme={resolvedTheme === "dark" ? whiteDark : whiteLight}
        extensions={[
          keymap.of([...defaultKeymap, ...historyKeymap]),
          lineNumbers(),
          highlightActiveLineGutter(),
          history(),
          indentOnInput(),
          bracketMatching(),
          syntaxHighlighting(defaultHighlightStyle),
          syntaxHighlighting(headingStyle),
          highlightActiveLine(),
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true,
          }),
          EditorView.lineWrapping,
        ]}
      />
    </ScrollArea>
  );
}
