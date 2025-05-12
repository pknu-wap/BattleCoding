import "./HeroBack.scss";
import { Code } from "./Back.tsx";
import Typed from "typed.js";
import React, { useEffect, useRef } from "react";

export default function HeroBack() {
  const codeRef = useRef(null);

  useEffect(() => {
    const BackCode = Code || "";
    const typed = new Typed(codeRef.current, {
      strings: [BackCode],
      typeSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "_",
      smartBackspace: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="herobackground">
      <pre ref={codeRef} className="code"></pre>
    </section>
  );
}
