"use client";

import { useState } from "react";
import CreateNewStory from "./CreateNewStory";
import { getImagesFromStorage } from "@/lib/localStorageUtils";
import Account from "./Account";

const StoryInterface = () => {
  const [stories, setStories] = useState(["/me.png", "/me2.jpg", "/me3.jpg"]);

  return (
    <div className="flex h-20 w-full py-2 box-content ">
      <CreateNewStory />

      {stories && stories.length > 0 && (
        <Account name="Brainy" profileImage="/me.png" stories={stories} />
      )}
    </div>
  );
};

export default StoryInterface;
