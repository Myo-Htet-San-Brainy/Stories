import React, { useState } from "react";
import StoryView from "./StoryView";
import Image from "next/image";

export interface Account {
  setViewStory: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  profileImage: string;
  stories: string[];
}

const Account: React.FC<Account> = ({
  name,
  profileImage,
  stories,
  setViewStory,
}) => {
  return (
    <div
      className=" h-full w-20 flex flex-col items-center"
      onClick={() => setViewStory(true)}
    >
      {/* The Circle */}
      <div className=" border-4 border-blue-500 rounded-full p-[2px] w-[70%] h-[70%]">
        <div className="relative w-full h-full">
          <Image
            src={profileImage}
            alt="profileImage"
            className="rounded-full "
            fill
          />
        </div>
      </div>
      {/* The Name */}
      <h1>{name}</h1>
    </div>
  );
};

export default Account;
