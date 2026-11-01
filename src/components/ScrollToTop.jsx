import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh/load
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (hash) {
      // If there is a hash, scroll smoothly to the target section
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      // If there is no hash, scroll immediately to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
