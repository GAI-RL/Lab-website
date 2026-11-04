// src/components/Reveal.jsx
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it's visible, we don't need to keep observing it
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    ); // Triggers when 10% of the element is visible

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal ${isVisible ? "active" : ""} ${
        delay ? `reveal-delay-${delay}` : ""
      }`}
    >
      {children}
    </div>
  );
}
