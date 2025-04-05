import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

interface ReactionsProps {
  hideReactions: boolean;
}

const iconPaths = ["/goldenLike.lottie", "/loveicon.lottie"];
const Reactions: React.FC<ReactionsProps> = ({ hideReactions }) => {
  const playerInstancesRef = useRef<DotLottie[]>([]);

  function handleMouseEnter() {
    playerInstancesRef.current.forEach((item) => {
      item.play();
    });
  }

  function handleMouseLeave() {
    playerInstancesRef.current.forEach((item) => {
      item.pause();
    });
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "self-stretch transition-all duration-300 ease-in-out overflow-x-hidden flex gap-2",
        {
          "w-0 ": hideReactions,
          "w-[20%]": !hideReactions,
        }
      )}
    >
      {iconPaths.map((path, index) => {
        return (
          <div
            key={path}
            className="w-full h-full flex items-center justify-center"
          >
            <DotLottieReact
              className="w-[80%] h-[80%] hover:w-full hover:h-full  transition-all duration-300"
              mode="reverse"
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
