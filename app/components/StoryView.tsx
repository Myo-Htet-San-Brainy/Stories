"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import Image from "next/image";

interface StoryView {
  stories: string[];
  onFinish: () => void;
}

//CONSTANTS
const fromBottomAniDuration = 800;
const storyDuration = 3000;
const StoryView: React.FC<StoryView> = ({ stories, onFinish }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressBarsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    async function start() {
      //first story
      if (currentStoryIndex === 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, fromBottomAniDuration)
        );
      }
      //grab element and play animation
      const element = progressBarsRef.current[currentStoryIndex];
      let width = 0;
      function step() {
        width += 0.2;
        if (width <= 100) {
          if (element) {
            element.style.width = `${width}%`;
            requestAnimationFrame(step);
          }
        } else {
          const nextStoryIndex = currentStoryIndex + 1;
          if (nextStoryIndex > stories.length - 1) {
            onFinish();
          } else {
            setCurrentStoryIndex(nextStoryIndex);
          }
        }
      }
      requestAnimationFrame(step);
    }
    start();
  }, [currentStoryIndex]);

  return createPortal(
    <motion.div
      className="absolute top-0 left-[50%] h-[100%] w-[30%] py-5"
      initial={{ y: "100%", x: "-50%" }} // Starts below viewport
      animate={{ y: 0, x: "-50%" }} // Slides up to center
      transition={{
        type: "tween", // Uses simple duration-based animation
        ease: "easeOut", // Smooth deceleration (try "linear" for constant speed)
        duration: fromBottomAniDuration / 1000, // Adjust time (in seconds) as needed
      }}
    >
      {/* MAIN */}
      <div className="relative w-[90%] h-[90%] mx-auto  isolate">
        {/* PROGRESS BAR */}
        <div className="z-10 absolute top-0 left-0 w-full py-2">
          <div className="flex gap-1">
            {stories.map((val, index) => {
              return (
                <div key={index} className="relative grow h-1 bg-white/50">
                  <div
                    ref={(el) => {
                      progressBarsRef.current[index] = el as HTMLDivElement;
                    }}
                    className="absolute left-0 top-0 h-full bg-white"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        {/* STORY/IMAGE */}
        <Image
          src={stories[currentStoryIndex]}
          alt="story"
          className="z-0 rounded-2xl object-cover"
          fill
        />
      </div>
      {/* COMMENT & REACTIONS */}
      <div>reactions</div>
    </motion.div>,
    document.body
  );
};

// const Content = () => {
//   return (
//     <motion.div
//       className="absolute   top-0 left-[50%] h-[100%] w-[40%] py-5"
//       initial={{ y: "100%", x: "-50%" }} // Start below + centered
//       animate={{ y: 0, x: "-50%" }} // Slide up + remain centered
//       transition={{
//         type: "spring", // Spring animation for bouncy effect
//         damping: 100, // Controls bounce (higher = less bounce)
//         stiffness: 300, // Spring stiffness
//       }}
//     >
//       {/* MAIN */}
//       <div className="w-[90%] h-[90%] mx-auto bg-amber-200 rounded-2xl"></div>
//       {/* COMMENT & REACTIONS */}
//       <div>reactions</div>
//     </motion.div>
//   );
// };

export default StoryView;
