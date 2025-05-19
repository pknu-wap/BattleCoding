import "./HeroBack.scss";
import { Code } from "./Back.tsx";
import { CodeA } from "./BackA.tsx";
import { CodeB } from "./BackB.tsx";
import { CodeC } from "./BackC.tsx";
// import Typed from "typed.js";
// import Highlight from "highlight.js";
// import "highlight.js/styles/github.css";
import React, { useEffect, useRef, useState } from "react";

const codeSnippets = [Code, CodeA, CodeB, CodeC];
const maxVisibleLines = 24;
const typingSpeed = 80;
const lineDelay = 300;

export default function HeroBack() {
  const codeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentCode = codeSnippets[currentIndex];
    const lines = currentCode.split("\n");

    let fullLines = [];
    let currentLine = "";
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    const typeChar = () => {
      if (currentLineIndex >= lines.length) {
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 1000);
        return;
      }

      const fullLine = lines[currentLineIndex];

      if (currentCharIndex < fullLine.length) {
        currentLine += fullLine[currentCharIndex];
        currentCharIndex++;
      } else {
        fullLines.push(currentLine);
        currentLine = "";
        currentCharIndex = 0;
        currentLineIndex++;
      }

      const allVisible = [...fullLines];
      if (currentLine) allVisible.push(currentLine);

      const visible = allVisible.slice(-maxVisibleLines);

      if (codeRef.current) {
        codeRef.current.textContent = visible.join("\n");
        codeRef.current.scrollTop = codeRef.current.scrollHeight;
      }

      setTimeout(typeChar, currentCharIndex === 0 ? lineDelay : typingSpeed);
    };

    typeChar();

    return () => {
      fullLines = [];
      currentLine = "";
    };
  }, [currentIndex]);

  return (
    <section className="herobackground">
      <pre ref={codeRef} className="code"></pre>
    </section>
  );
}
