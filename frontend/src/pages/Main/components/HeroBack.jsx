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

  /* 한 줄 한 줄 타이핑
 const codeSnippets = [Code, CodeA, CodeB, CodeC];
const maxVisibleLines = 24;
const typingSpeed = 200;

export default function HeroBack() {
  const codeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentCode = codeSnippets[currentIndex];
    const lines = currentCode.split("\n");
    let currentLineIndex = 0;
    let visibleLines = [];

    const interval = setInterval(() => {
      if (currentLineIndex < lines.length) {
        visibleLines.push(lines[currentLineIndex]);

        if (visibleLines.length > maxVisibleLines) {
          visibleLines.shift();
        }

        if (codeRef.current) {
          codeRef.current.textContent = visibleLines.join("\n");
        }

        currentLineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 500);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [currentIndex]); *\

  /* 스펠링 타이핑
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
  */

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
