"use client";

import { useState } from "react";
import CreateNewStory from "./CreateNewStory";
import { getImagesFromStorage } from "@/lib/localStorageUtils";
import Account from "./Account";

const StoryInterface = ({
  setViewStory,
  stories,
}: {
  setViewStory: React.Dispatch<React.SetStateAction<boolean>>;
  stories: string[];
}) => {
  return (
    <div className="flex h-20 w-full py-2 box-content ">
      <CreateNewStory />

      {stories && stories.length > 0 && (
        <Account
          name="Brainy"
          profileImage="/me.png"
          stories={stories}
          setViewStory={setViewStory}
        />
      )}
    </div>
  );
};

export default StoryInterface;
