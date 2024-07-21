import { useEffect, useRef } from "react";
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
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { tags } from "@lezer/highlight";

import { useDoc } from "~/contexts/doc";

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
  const { doc, setDoc } = useDoc();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const startState = EditorState.create({
      doc,
      extensions: [
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
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            setDoc(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: ref.current,
    });

    () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return <div ref={ref}></div>;
}
