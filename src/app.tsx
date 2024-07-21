import { useState } from "react";

import { Button } from "./components/ui/button";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount((n) => n + 1)}>Click me</Button>
    </div>
  );
}
