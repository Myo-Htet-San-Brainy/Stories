import React, { useEffect, useState } from "react";

const useHasKeyboard = () => {
  const [hasKeyboard, setHasKeyboard] = useState(false);

  useEffect(() => {
    const checkInputType = () => {
      // Detects if the device has fine pointer (mouse/stylus)
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      // Detects if touch is supported
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Likely keyboard if fine pointer exists OR no touch
      setHasKeyboard(hasFinePointer || !hasTouch);
    };

    checkInputType();
    window.addEventListener("resize", checkInputType); // Re-check on resize
    return () => window.removeEventListener("resize", checkInputType);
  }, []);

  return hasKeyboard;
};

export default useHasKeyboard;
