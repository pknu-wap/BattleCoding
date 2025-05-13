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
  const typedRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typeCode = (index: number) => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }

      typedRef.current = new Typed(codeRef.current, {
        strings: [codeSnippets[index] || ""],
        typeSpeed: 30,
        backSpeed: 0,
        showCursor: false,
        loop: false,
        smartBackspace: false,
        onComplete: () => {
          setTimeout(() => {
            if (typedRef.current) {
              typedRef.current.destroy();
              if (codeRef.current) {
                codeRef.current.innerHTML = "";
              }
            }
            const nextIndex = (index + 1) % codeSnippets.length;
            setCurrentIndex(nextIndex);
          }, 500);
        },
      });
    };

    typeCode(currentIndex);

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [currentIndex]);

  // useEffect(() => {

  //   const BackCode = Code || "";
  //   const typed = new Typed(codeRef.current, {
  //     strings: [BackCode],
  //     typeSpeed: 50,
  //     backSpeed: 0,
  //     loop: true,
  //     showCursor: false,
  //     cursorChar: "_",
  //     smartBackspace: false,
  //   });

  //   return () => {
  //     typed.destroy();
  //   };
  // }, []);

  return (
    <section className="herobackground">
      <pre ref={codeRef} className="code"></pre>
    </section>
  );
}
