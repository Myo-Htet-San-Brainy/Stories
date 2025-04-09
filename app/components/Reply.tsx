import clsx from "clsx";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface ReplyProps {
  hideReactions: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onSend?: (message: string) => void; // Optional callback for sending messages
}

const Reply: React.FC<ReplyProps> = ({
  hideReactions,
  onFocus,
  onBlur,
  onSend,
}) => {
  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    setShowArrowIcon(true);
    onFocus();
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the blur event is not because of clicking the send button
    if (!e.relatedTarget || e.relatedTarget.id !== "send-button") {
      setShowArrowIcon(false);
      onBlur();
    }
  };

  const handleSend = () => {
    if (inputValue.trim() && onSend) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={clsx(
        "relative  h-fit transition-all duration-300 ease-in-out",
        {
          "min-w-full ": hideReactions,
          "min-w-[70%] ": !hideReactions,
        }
      )}
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyPress}
        className="w-full rounded-4xl border border-white p-2 md:p-2 pl-4 placeholder:text-xs text-xs placeholder-slate-400 outline-none"
        placeholder="Reply..."
      />

      {showArrowIcon && (
        <button
          id="send-button"
          onClick={handleSend}
          className={`absolute right-3 top-0 h-full w-fit flex items-center justify-center  rounded-full ${
            inputValue.trim()
              ? "text-blue-500 hover:bg-blue-50"
              : "text-gray-300"
          }`}
          disabled={!inputValue.trim()}
        >
          <IoMdSend size={20} />
        </button>
      )}
    </div>
  );
};

export default Reply;
