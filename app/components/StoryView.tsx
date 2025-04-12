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
const HOLD_TIMER_DURATION = 200;
const QUICK_STEP = 2;
const NORMAL_STEP = 0.2;
const StoryView: React.FC<StoryView> = ({ stories, onFinish }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isStartAniDone, setIsStartAniDone] = useState(false);
  const [progressBarsW, setProgressBarsW] = useState<number[]>(
    Array(stories.length).fill(0)
  );
  const [animation, setAnimation] = useState<Animation | null>(null);
  const isHoldRef = useRef<Boolean>(false);
  const timeoutId = useRef<number | null>(null);
  const touchXRef = useRef<number | null>(null);

  //
  function handleTouchStart(e: React.TouchEvent<HTMLImageElement>) {
    e.preventDefault();
    touchXRef.current = e.touches[0].clientX;
    timeoutId.current = window.setTimeout(() => {
      isHoldRef.current = true;
      setIsPaused(true);
    }, HOLD_TIMER_DURATION);
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLImageElement>) {
    if (timeoutId.current !== null) {
      window.clearTimeout(timeoutId.current);
    }
    if (isHoldRef.current) {
      setIsPaused(false);
      isHoldRef.current = false;
    } else {
      handleTap(e);
    }
  }

  function handleTap(e: React.TouchEvent<HTMLImageElement>) {
    const touchX = touchXRef.current;
    if (touchX === null) return;

    if (touchX < window.innerWidth / 2) {
      if (currentStoryIndex === 0) {
        onFinish();
      } else {
        setAnimation({
          to: 0,
          step: -QUICK_STEP,
          dir: "DECREASE",
          finishedCallback: () => {
            setCurrentStoryIndex(currentStoryIndex - 1);
          },
        });
      }
    } else {
      if (currentStoryIndex === stories.length - 1) {
        onFinish();
      } else {
        setAnimation({
          to: 100,
          step: QUICK_STEP,
          dir: "INCREASE",
          finishedCallback: () => {
            setCurrentStoryIndex(currentStoryIndex + 1);
          },
        });
      }
    }
  }
  //
  useEffect(() => {
    async function wait() {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          setIsStartAniDone(true);
          resolve();
        }, fromBottomAniDuration)
      );
    }
    wait();
  }, []);

  useEffect(() => {
    if (!isStartAniDone) return;

    const newProgressBarsW = [...progressBarsW];
    newProgressBarsW[currentStoryIndex] = 0;
    setProgressBarsW(newProgressBarsW);

    setAnimation({
      to: 100,
      step: NORMAL_STEP,
      dir: "INCREASE",
      finishedCallback: () => {
        const newStory = currentStoryIndex + 1;
        if (newStory >= stories.length) {
          onFinish();
        } else {
          setCurrentStoryIndex(newStory);
        }
      },
    });
  }, [currentStoryIndex, isStartAniDone]);

  function onFinishAnimation() {
    setAnimation(null);
    if (animation?.finishedCallback) {
      animation.finishedCallback();
    }
  }
  useEffect(() => {
    if (isPaused) return;
    if (!isStartAniDone) return;
    if (animation === null) return;

    const currentWidth = progressBarsW[currentStoryIndex];
    const newState = [...progressBarsW];

    switch (animation.dir) {
      case "INCREASE":
        if (currentWidth < animation.to) {
          newState[currentStoryIndex] = Math.min(
            currentWidth + animation.step,
            animation.to
          );
          requestAnimationFrame(() => setProgressBarsW(newState));
        } else {
          onFinishAnimation();
        }
        break;
      case "DECREASE":
        if (currentWidth > animation.to) {
          newState[currentStoryIndex] = Math.max(
            currentWidth + animation.step,
            animation.to
          );
          requestAnimationFrame(() => setProgressBarsW(newState));
        } else {
          onFinishAnimation();
        }
        break;

      default:
        break;
    }
  }, [animation, isPaused, progressBarsW]);

  function onPrev() {
    setAnimation({
      to: 0,
      step: -QUICK_STEP,
      dir: "DECREASE",
      finishedCallback: () => {
        setCurrentStoryIndex(currentStoryIndex - 1);
      },
    });
  }

  function onNext() {
    setAnimation({
      to: 100,
      step: QUICK_STEP,
      dir: "INCREASE",
      finishedCallback: () => {
        setCurrentStoryIndex(currentStoryIndex + 1);
      },
    });
  }
  return createPortal(
    <motion.div
      className="h-dvh w-full md:w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[30%] min-[1750px]:w-[25%] mx-auto md:py-5 pb-[env(safe-area-inset-bottom,15px)]  flex flex-col"
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
          src={stories[currentStoryIndex]}
          alt="story"
          className="z-0 rounded-2xl object-cover"
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
          draggable={false}
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
