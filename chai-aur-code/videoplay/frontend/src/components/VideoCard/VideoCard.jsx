import { Link } from "react-router-dom";
import { dummyImg } from "../../assets";
import moment from "moment";
import { useState } from "react";

const VideoCard = ({ listView = false, showDescription = true, video }) => {
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(false);

  const secondsToHms = (seconds) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    const hDisplay = h > 0 ? (h < 10 ? "0" : "") + h + ":" : "";
    const mDisplay = (m < 10 ? "0" : "") + m + ":";
    const sDisplay = (s < 10 ? "0" : "") + s;
    return hDisplay + mDisplay + sDisplay;
  };

  return (
    <Link to={`videos/${video._id}`}>
      <div
        className={`    ${listView ? " flex-start-end flex-row gap-x-5 " : " flex   w-80 flex-col"} border-br white-border rounded bg-secondary-color`}
      >
        <div className="relative shrink-0 overflow-hidden">
          <div
            className={`${listView ? "w-96" : "w-full"}      relative h-full max-h-52 min-h-52 rounded bg-black`}
          >
            <video
              src={video.videoFile}
              className=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onMouseEnter={(event) => event.target.play()}
              onMouseLeave={(event) => event.target.pause()}
            />
            {!isThumbnailVisible && (
              <img
                src={video.thumbnail}
                alt=""
                className={`absolute left-0 top-0 size-full rounded object-cover ${isThumbnailVisible ? "hidden" : "block"}`}
                onMouseEnter={() => setIsThumbnailVisible(true)}
                onMouseLeave={() => setIsThumbnailVisible(false)}
              />
            )}
          </div>
          <span className="absolute bottom-1 right-1 rounded bg-black p-1 text-xs text-white">
            {secondsToHms(video.duration)}
          </span>
        </div>
        <div className="flex-start-center mt-2 h-full gap-x-3  px-4 py-2 ">
          {!listView && (
            <Link to="/channel">
              <button className="size-10 shrink-0 cursor-pointer rounded-full ">
                <img
                  src={dummyImg}
                  alt=""
                  className=" size-full rounded-full object-cover"
                />
              </button>
            </Link>
          )}
          <div
            className={`${listView ? "flex-between-start flex-col gap-y-2" : "flex flex-col"}   h-full  `}
          >
            <h2
              className={` font-semibold ${listView ? "max-w-md text-xl" : "text-sm"}`}
            >
              {video.title}
            </h2>
            <p className="flex-start-center gap-x-1">
              <span className={`${listView ? "text-sm" : "text-xs"}`}>
                10.3k Views
              </span>
              <span>·</span>
              <span className={`${listView ? "text-sm" : "text-xs"}`}>
                {moment(video.createdAt).fromNow()}
              </span>
            </p>
            <div className="flex-start-center gap-x-3">
              {listView && (
                <Link to="/channel">
                  <button className="size-10 shrink-0 cursor-pointer rounded-full ">
                    <img
                      src={dummyImg}
                      alt=""
                      className=" size-full rounded-full object-cover"
                    />
                  </button>
                </Link>
              )}
              <span
                className={`font-semibold tracking-widest  ${listView ? "text-sm" : "text-xs"}`}
              >
                Code Master
              </span>
            </div>
            {showDescription && (
              <div className="">
                {listView && (
                  <p className="max-w-sm text-sm tracking-wide">
                    {video.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
