import clsx from "clsx";
import React from "react";

interface ReactionsProps {
  hideReactions: boolean;
}
const Reactions: React.FC<ReactionsProps> = ({ hideReactions }) => {
  return (
    <div
      className={clsx(
        "transition-all duration-300 ease-in-out overflow-x-hidden",
        {
          "w-0 ": hideReactions,
          "w-[20%]": !hideReactions,
        }
      )}
    >
      Reactions
    </div>
  );
};

export default Reactions;
