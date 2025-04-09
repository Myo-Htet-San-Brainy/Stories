import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { Queue } from "@/lib/Queue";

interface ReactionsProps {
  hideReactions: boolean;
  setSentReactions: React.Dispatch<React.SetStateAction<string[]>>;
  onMouseEnterReactions?: () => void;
  onMouseLeaveReactions?: () => void;
}

const iconPaths = [
  "/goldenLike.lottie",
  "/loveicon.lottie",
  "/goldenLike.lottie",
  "/loveicon.lottie",
  "/goldenLike.lottie",
  "/loveicon.lottie",
];
const Reactions: React.FC<ReactionsProps> = ({
  hideReactions,
  setSentReactions,
  onMouseEnterReactions,
  onMouseLeaveReactions,
}) => {
  const playerInstancesRef = useRef<DotLottie[]>([]);

  function handleMouseEnter() {
    onMouseEnterReactions && onMouseEnterReactions();
    playerInstancesRef.current.forEach((item) => {
      item.play();
    });
  }

  function handleMouseLeave() {
    onMouseLeaveReactions && onMouseLeaveReactions();
    playerInstancesRef.current.forEach((item) => {
      item.pause();
    });
  }

  //I know there's only two icons, first  is like and second is love
  function handleReactionClick(index: number) {
    const icon = index === 0 ? "like" : "love";
    setSentReactions((prev) => {
      const newSentReactions = [...prev];
      newSentReactions.push(icon);
      if (newSentReactions.length > 5) {
        newSentReactions.shift();
      }
      return newSentReactions;
    });
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx("self-stretch  flex transition-all duration-300", {
        "w-fit": !hideReactions,
        "w-0": hideReactions,
      })}
    >
      {iconPaths.map((path, index) => {
        return (
          <div
            key={index}
            className="w-10  h-full flex items-center justify-center"
          >
            <DotLottieReact
              className="w-[70%] h-[60%] hover:w-[80%] hover:h-[80%]  transition-all duration-300"
              mode="reverse"
              onClick={() => handleReactionClick(index)}
              loop={true}
              src={path}
              dotLottieRefCallback={(dotLottie) => {
                if (dotLottie !== null) {
                  playerInstancesRef.current.push(dotLottie);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Reactions;
