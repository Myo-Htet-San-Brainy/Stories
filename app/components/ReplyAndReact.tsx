import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import Reactions from "./Reactions";
import toast from "react-hot-toast";
import { Queue } from "@/lib/Queue";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";

interface ReplyAndReactProps {
  handleIsPaused: (newState: boolean) => void;
  currentStoryIndex: number;
}
const ReplyAndReact: React.FC<ReplyAndReactProps> = ({
  handleIsPaused,
  currentStoryIndex,
}) => {
  const [hideReactions, setHideReactions] = useState(false);
  const [sentReactions, setSentReactions] = useState<string[]>([]);

  useEffect(() => {
    setSentReactions([]);
  }, [currentStoryIndex]);
  return (
    <div className="relative w-full flex gap-2">
      <Reply
        onFocus={() => {
          setHideReactions(true);
          handleIsPaused(true);
        }}
        onBlur={() => {
          setHideReactions(false);
          handleIsPaused(false);
        }}
        hideReactions={hideReactions}
        onSend={(msg) => toast.success(`sent "${msg}"`)}
      />
      <Reactions
        hideReactions={hideReactions}
        setSentReactions={setSentReactions}
        onMouseEnterReactions={() => handleIsPaused(true)}
        onMouseLeaveReactions={() => handleIsPaused(false)}
      />
      {/* Sent Reactions Display */}
      {
        <div className="absolute top-0 left-[5%] -translate-y-[120%] w-[90%] h-[80%] flex justify-start pl-4">
          {sentReactions.map((reaction, index) => {
            return (
              <div key={index} className="h-full w-fit flex items-center">
                {reaction === "like" ? (
                  <AiFillLike className="text-blue-500" />
                ) : (
                  <FcLike />
                )}
              </div>
            );
          })}
          {sentReactions.length > 0 && (
            <p className="ml-2 h-full w-fit flex items-center">
              Sent to Brainy.
            </p>
          )}
        </div>
      }
    </div>
  );
};

export default ReplyAndReact;
