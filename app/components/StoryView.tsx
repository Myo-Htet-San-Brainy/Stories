"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import Image from "next/image";
import ReplyAndReact from "./ReplyAndReact";
import { clsx } from "clsx";

import TopBar from "./TopBar";
import NextPrev from "./NextPrev";

interface StoryView {
  stories: string[];
  onFinish: () => void;
}

export type Animation = {
  dir: "INCREASE" | "DECREASE";
  to: number;
  step: number;
  finishedCallback?: () => void;
};

//CONSTANTS
const fromBottomAniDuration = 800;
const storyDuration = 3000;
const StoryView: React.FC<StoryView> = ({ stories, onFinish }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStartAniDone, setIsStartAniDone] = useState(false);
  const [progressBarsW, setProgressBarsW] = useState<number[]>(
    Array(stories.length).fill(0)
  );
  const [animations, setAnimations] = useState<Animation[]>([]);

  useEffect(() => {
    async function wait() {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          setIsPaused(false);
          resolve();
        }, fromBottomAniDuration)
      );
      setIsStartAniDone(true);
    }
    wait();
  }, []);

  useEffect(() => {
    if (!isStartAniDone) return;
    const newProgressBarsW = [...progressBarsW];
    newProgressBarsW[currentStoryIndex] = 0;
    setProgressBarsW(newProgressBarsW);
    setAnimations([
      {
        to: 100,
        step: 0.2,
        dir: "INCREASE",
        finishedCallback: () => {
          const newStory = currentStoryIndex + 1;
          if (newStory >= stories.length) {
            onFinish();
          } else {
            setCurrentStoryIndex(newStory);
          }
        },
      },
    ]);
  }, [currentStoryIndex, isStartAniDone]);

  useEffect(() => {
    if (isPaused) return;
    if (animations.length === 0) return;

    const currAni = animations[0];
    // console.log(currAni);
    const condition =
      currAni.dir === "INCREASE"
        ? progressBarsW[currentStoryIndex] < currAni.to
        : progressBarsW[currentStoryIndex] > currAni.to;
    if (condition) {
      const newState = [...progressBarsW];
      newState[currentStoryIndex] = newState[currentStoryIndex] + currAni.step;
      requestAnimationFrame(() => setProgressBarsW(newState));
    } else {
      const newState = [...animations];
      const finishedAni = newState.shift();
      setAnimations([]);
      if (finishedAni?.finishedCallback) {
        finishedAni.finishedCallback();
      }
    }
  }, [animations, isPaused, progressBarsW]);

  function onPrev() {
    setAnimations([
      {
        to: 0,
        step: -1,
        dir: "DECREASE",
        finishedCallback: () => {
          setCurrentStoryIndex(currentStoryIndex - 1);
        },
      },
    ]);
  }

  function onNext() {
    setAnimations([
      {
        to: 100,
        step: 1,
        dir: "INCREASE",
        finishedCallback: () => {
          setCurrentStoryIndex(currentStoryIndex + 1);
        },
      },
    ]);
  }
  return createPortal(
    <motion.div
      className="h-screen w-full md:w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[30%] min-[1750px]:w-[25%] mx-auto md:py-5 flex flex-col"
      initial={{ y: "100%" }} // Starts below viewport
      animate={{ y: 0 }} // Slides up to center
      transition={{
        type: "tween", // Uses simple duration-based animation
        ease: "easeOut", // Smooth deceleration (try "linear" for constant speed)
        duration: fromBottomAniDuration / 1000, // Adjust time (in seconds) as needed
      }}
    >
      {/* MAIN */}
      <div className="relative w-full grow mx-auto  isolate mb-3">
        {/* Top Bar Tools And Others */}
        <TopBar
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          stories={stories}
          progressBarsW={progressBarsW}
        />
        {/* NEXT/PREV */}
        <NextPrev
          currentStoryIndex={currentStoryIndex}
          stories={stories}
          onPrev={onPrev}
          onNext={onNext}
        />
        {/* STORY/IMAGE */}
        <Image
          src={stories[currentStoryIndex]}
          alt="story"
          className="z-0 rounded-2xl object-cover"
          fill
        />
      </div>
      {/* COMMENT & REACTIONS */}
      <ReplyAndReact
        currentStoryIndex={currentStoryIndex}
        handleIsPaused={(newState) => setIsPaused(newState)}
      />
    </motion.div>,
    document.body
  );
};

export default StoryView;
