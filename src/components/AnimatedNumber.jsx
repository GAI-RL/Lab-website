import { useEffect, useState, useRef } from "react";

export default function AnimatedNumber({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const targetNumber = parseInt(String(value).replace(/\D/g, ""), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element enters the screen
        if (entry.isIntersecting) {
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(easeOut * targetNumber));

            if (progress < duration) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
        // When the element leaves the screen
        else {
          // Cancel the animation and reset to 0 so it can fire again next time
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          setCount(0);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetNumber, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
