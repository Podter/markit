import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

interface DocContextType {
  doc: string;
  setDoc: (doc: string) => void;
}

const DocContext = createContext<DocContextType | undefined>(undefined);

export function useDoc() {
  const context = useContext(DocContext);
  if (!context) {
    throw new Error("useDoc must be used within a DocProvider");
  }
  return context;
}

export function DocProvider({ children }: PropsWithChildren) {
  const [doc, setDoc] = useState("# Hello, world!\n");
  return (
    <DocContext.Provider value={{ doc, setDoc }}>
      {children}
    </DocContext.Provider>
  );
}
