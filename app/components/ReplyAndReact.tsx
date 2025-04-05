import React, { useState } from "react";
import Reply from "./Reply";
import Reactions from "./Reactions";
import toast from "react-hot-toast";
interface ReplyAndReactProps {
  handleIsPaused: (newState: boolean) => void;
}
const ReplyAndReact: React.FC<ReplyAndReactProps> = ({ handleIsPaused }) => {
  const [hideReactions, setHideReactions] = useState(false);
  return (
    <div className="mt-3 w-full h-7 flex gap-2">
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
      <Reactions hideReactions={hideReactions} />
    </div>
  );
};

export default ReplyAndReact;
