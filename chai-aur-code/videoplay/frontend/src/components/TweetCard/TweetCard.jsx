import { dummyImg, thumbDownIcon, thumbUpIcon } from "../../assets";

const TweetCard = () => {
  return (
    <div className="  ">
      <div className=" flex-start-center gap-x-4 bg-secondary-color  px-5 py-2 ">
        <div className="size-20 rounded-full">
          <img
            src={dummyImg}
            alt=""
            className="size-full rounded-full object-cover"
          />
        </div>
        <div className="">
          <div className="flex-start-center gap-x-5  ">
            <h3 className="text-lg tracking-wide">React Patterns</h3>
            <span className="text-sm text-white/50">5 hours ago </span>
          </div>
          <p className="my-1 ">
            Exploring the latest features in JavaScript ES11! The language keeps
            evolving. 💡 #JavaScript #ES11
          </p>
          <div className="flex gap-x-4">
            <div className="flex-center gap-x-2">
              <button className="cursor-pointer">
                <img src={thumbUpIcon} alt="" />
              </button>
              <span className="text-sm">425</span>
            </div>
            <button className="cursor-pointer">
              <img src={thumbDownIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className=" white-border mx-5 h-px  border-b"></div>
    </div>
  );
};

export default TweetCard;
