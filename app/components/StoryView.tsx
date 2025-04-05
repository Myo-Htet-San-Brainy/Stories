"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import Image from "next/image";
import ReplyAndReact from "./ReplyAndReact";
import { clsx } from "clsx";
import { HiOutlinePause } from "react-icons/hi2";
import { RxResume } from "react-icons/rx";

interface StoryView {
  stories: string[];
  onFinish: () => void;
}

//CONSTANTS
const fromBottomAniDuration = 800;
const storyDuration = 3000;
const StoryView: React.FC<StoryView> = ({ stories, onFinish }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressBarsW, setProgressBarsW] = useState<number[]>(
    Array(stories.length).fill(0)
  );
  useEffect(() => {
    async function start() {
      if (currentStoryIndex === 0 && progressBarsW[currentStoryIndex] === 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, fromBottomAniDuration)
        );
      }
      if (isPaused) return;
      let newProgressBarsW = [...progressBarsW];
      newProgressBarsW[currentStoryIndex] =
        newProgressBarsW[currentStoryIndex] + 0.2;
      if (newProgressBarsW[currentStoryIndex] <= 100) {
        requestAnimationFrame(() => setProgressBarsW(newProgressBarsW));
      } else {
        const newStory = currentStoryIndex + 1;
        if (newStory >= stories.length) {
          onFinish();
        } else {
          setCurrentStoryIndex(newStory);
        }
      }
    }
    start();
  }, [currentStoryIndex, isPaused, progressBarsW]);

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
      <div className="relative w-[90%] h-[90%] mx-auto  isolate mb-2">
        {/* TOP BTNS */}
        <div className="z-10 absolute top-0 left-0 w-full py-2">
          {/* PROGRESS BAR */}
          <div className="flex gap-1 w-[90%] mx-auto">
            {stories.map((val, index) => {
              const width = progressBarsW[index];
              return (
                <div key={index} className="relative grow h-1 bg-white/50">
                  <div
                    className="absolute left-0 top-0 h-full bg-white"
                    style={{
                      width: `${width}%`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-end px-[5%] mt-2">
            <button onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <RxResume size={30} /> : <HiOutlinePause size={30} />}
            </button>
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
      <ReplyAndReact handleIsPaused={(newState) => setIsPaused(newState)} />
    </motion.div>,
    document.body
  );
};

export default StoryView;
