import { useState, useEffect } from "react";
var scrollDirection = "down";
var windowScrollY = 0;

export function scroll() {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = async () => {
    scrollDirection = (windowScrollY < window.scrollY) ? "down" : "up";
    windowScrollY = window.scrollY;

    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollX,
    scrollY,
    scrollDirection
  };
}
