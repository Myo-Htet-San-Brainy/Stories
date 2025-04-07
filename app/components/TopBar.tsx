import { HiOutlinePause } from "react-icons/hi2";
import { RxResume } from "react-icons/rx";
import { Animation } from "./StoryView";

export interface TopBarProps {
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  progressBarsW: number[];
  stories: string[];
}

const TopBar: React.FC<TopBarProps> = ({
  isPaused,
  setIsPaused,
  progressBarsW,
  stories,
}) => {
  return (
    <div className="z-10 absolute top-0 left-0 w-full py-2">
      {/* PROGRESS BAR */}
      <div className="flex gap-1 w-[90%] mx-auto">
        {stories.map((val, index) => {
          let width = progressBarsW[index];
          return (
            <div key={index} className="relative grow h-1 bg-white/50">
              <div
                className="absolute left-0 top-0 h-full bg-white"
                style={{
                  width: `${width}%`,
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end px-[5%] mt-2">
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <RxResume size={30} /> : <HiOutlinePause size={30} />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
