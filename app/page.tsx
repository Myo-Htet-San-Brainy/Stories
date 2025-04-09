"use client";
import React, { useState } from "react";
import StoryInterface from "./components/StoryInterface";
import StoryView from "./components/StoryView";

const Page = () => {
  const [viewStory, setViewStory] = useState(false);
  const [stories, setStories] = useState(["/me.png", "/me2.jpg", "/me3.jpg"]);

  return (
    <div>
      {/* VIEW STORY */}
      {viewStory ? (
        <StoryView stories={stories} onFinish={() => setViewStory(false)} />
      ) : (
        <StoryInterface setViewStory={setViewStory} stories={stories} />
      )}
    </div>
  );
};

export default Page;
