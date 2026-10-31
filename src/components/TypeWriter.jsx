import { useEffect, useState } from "react";

export default function Typewriter({
  words = [],
  typeSpeed = 75,
  deleteSpeed = 40,
  pauseTime = 1800,
  loop = true,
  className = "",
}) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex];

    // Pause after finishing typing a word
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (loop || wordIndex < words.length - 1) {
          setIsDeleting(true);
        }
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    // Typing
    if (!isDeleting && displayed.length < currentWord.length) {
      const timer = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timer);
    }

    // Finished typing — pause
    if (!isDeleting && displayed.length === currentWord.length) {
      setIsPaused(true);
      return;
    }

    // Deleting
    if (isDeleting && displayed.length > 0) {
      const timer = setTimeout(() => {
        setDisplayed(currentWord.slice(0, displayed.length - 1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    // Finished deleting — move to next word
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      if (loop) {
        setWordIndex((prev) => (prev + 1) % words.length);
      } else if (wordIndex < words.length - 1) {
        setWordIndex((prev) => prev + 1);
      }
    }
  }, [
    displayed,
    isDeleting,
    isPaused,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    pauseTime,
    loop,
  ]);

  return (
    <span className={className}>
      {displayed}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
