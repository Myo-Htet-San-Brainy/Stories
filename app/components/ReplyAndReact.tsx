import React from "react";
import Reply from "./Reply";
import Reactions from "./Reactions";

const ReplyAndReact = () => {
  return (
    <div className="w-full h-7 flex">
      <Reply />
      <Reactions />
    </div>
  );
};

export default ReplyAndReact;
