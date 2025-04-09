import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

export interface NextPrevProps {
  currentStoryIndex: number;
  stories: string[];
  onPrev: () => void;
  onNext: () => void;
}
const NextPrev: React.FC<NextPrevProps> = ({
  currentStoryIndex,
  stories,
  onPrev,
  onNext,
}) => {
  function handlePrev() {
    onPrev();
  }
  function handleNext() {
    onNext();
  }
  return (
    <div className="hidden md:block">
      {currentStoryIndex !== 0 && (
        <div
          onClick={handlePrev}
          className=" z-10 absolute top-1/2 -translate-y-1/2 -left-1/8"
        >
          <GrPrevious
            className="bg-slate-200 text-black rounded-full p-2"
            size={40}
          />
        </div>
      )}
      {currentStoryIndex !== stories.length - 1 && (
        <div
          onClick={handleNext}
          className="z-10 absolute top-1/2 -translate-y-1/2 -right-1/8"
        >
          <GrNext
            className="bg-slate-200 text-black rounded-full p-2"
            size={40}
          />
        </div>
      )}
    </div>
  );
};

export default NextPrev;
