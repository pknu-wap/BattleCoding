import "./HeroBack.scss";
import { Code } from "./Back.tsx";
import { CodeA } from "./BackA.tsx";
import { CodeB } from "./BackB.tsx";
import { CodeC } from "./BackC.tsx";
import Typed from "typed.js";
// import Highlight from "highlight.js";
// import "highlight.js/styles/github.css";
import React, { useEffect, useRef, useState } from "react";

const codeSnippets = [Code, CodeA, CodeB, CodeC];

export default function HeroBack() {
  const codeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typed = new Typed(codeRef.current, {
      strings: [codeSnippets[currentIndex] || ""],
      typeSpeed: 20,
      backSpeed: 0,
      showCursor: false,
      loop: false,
      smartBackspace: false,
      onComplete: () => {
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 500);
      },
    });

    return () => {
      typed.destroy();
    };
  }, [currentIndex]);

  /*   useEffect(() => {

    const BackCode = Code || "";
    const typed = new Typed(codeRef.current, {
      strings: [BackCode],
      typeSpeed: 50,
      backSpeed: 0,
      loop: true,
      showCursor: false,
      cursorChar: "_",
      smartBackspace: false,
    });

    return () => {
      typed.destroy();
    };
  }, []); */

  return (
    <section className="herobackground">
      <pre ref={codeRef} className="code"></pre>
    </section>
  );
}
