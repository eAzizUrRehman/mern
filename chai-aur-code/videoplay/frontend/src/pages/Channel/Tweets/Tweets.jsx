import { emojiIcon, threeDotsIcon, twoUsersIcon } from "../../../assets";
import { Button, Empty, TweetCard } from "../../../components";

const Tweets = ({ isMe = true }) => {
  return (
    <div className=" padding-X-2 py-5">
      {isMe ? (
        <div className="">
          <div className="relative w-full rounded    ">
            <textarea
              className="custom-scrollbar  white-border size-full h-40   resize-none overflow-y-auto rounded border bg-secondary-color px-10 pb-20 pt-5 text-white outline-none"
              placeholder="Write a tweet..."
            ></textarea>
            <div className="   flex-end-center absolute z-20 w-full -translate-y-[3.40rem] gap-2 rounded-b px-5 py-1">
              <button className="size-5 cursor-pointer hover:opacity-50">
                <img src={emojiIcon} alt="" className="size-full" />
              </button>
              <button className="size-5 cursor-pointer hover:opacity-50">
                <img src={threeDotsIcon} alt="" className="size-full" />
              </button>
              <Button text="Save" />
            </div>
          </div>
          <Empty
            title="No Tweets"
            description="This channel has yet to make a Tweet."
            icon={twoUsersIcon}
          />
        </div>
      ) : (
        <div className="">
          <Empty
            title="No tweets available"
            description="This channel has yet to make a Tweet."
            icon={twoUsersIcon}
          />
        </div>
        // <div className="">
        //   {[...Array(25)].map((i) => (
        //     <div className="mb-4">
        //       <TweetCard />
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  );
};

export default Tweets;
