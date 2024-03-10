import { useEffect, useState } from "react";
import {
  checkMarkIcon,
  fileUploadIcon,
  goBackIcon,
  playIcon,
  plusIcon,
  videoFileIcon,
} from "../../../assets";
import { Button, Empty, Panel, VideoCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Videos = ({ isMe = true }) => {
  const [listView, setListView] = useState(false);
  const [isUploadVideoModalOpen, setIsUploadVideoModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/videos/",
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleUploadVideoClick = () => {
    setIsUploadVideoModalOpen(false);
    setIsSecondModalOpen(true);
  };
  return (
    <div className="  relative   h-full  ">
      {videos.length < 0 && (
        <Empty
          icon={playIcon}
          title={isMe ? "No videos uploaded" : "No videos available"}
          description={
            isMe
              ? "This page has yet to upload a video. Search another page in order to find more videos."
              : "There are no videos here available. Please try to search some thing else."
          }
        />
      )}
      {videos.length < 0 && isMe && (
        <div className="mx-auto w-fit">
          <Button
            icon={plusIcon}
            text="Upload Video"
            onClick={() => {
              setIsUploadVideoModalOpen(true);
              setIsSecondModalOpen(false);
            }}
          />
        </div>
      )}
      <div className="  py-2">
        <Panel
          listView={listView}
          setListView={setListView}
          searchPlaceholder="Search Videos..."
        />
        {(isUploadVideoModalOpen || isSecondModalOpen) && (
          <div className="absolute top-0 z-30 size-full backdrop-blur-sm  ">
            <div
              className=" flex-center-start    size-full   p-20"
              onClick={() => {
                // TODO: if (e.currentTarget)
                setIsUploadVideoModalOpen(false);
              }}
            >
              {isUploadVideoModalOpen && (
                <div className="white-border  rounded  border bg-secondary-color p-5">
                  <div className="flex-between-center white-border gap-x-5 border-b pb-2">
                    <div className="flex-center gap-x-4">
                      <button
                        className="size-6 cursor-pointer"
                        onClick={() => {
                          setIsUploadVideoModalOpen(false);
                        }}
                      >
                        <img src={goBackIcon} alt="" />
                      </button>
                      <h2 className="text-xl">Upload Videos</h2>
                    </div>
                    <Button text="Upload" onClick={handleUploadVideoClick} />
                  </div>
                  <div className="white-border flex-center mx-20 my-10 flex-col gap-y-4 rounded border-2 border-dashed px-20 py-10">
                    <div className="size-20 rounded-full  bg-white p-4 ">
                      <img src={fileUploadIcon} alt="" className="size-full" />
                    </div>
                    <h4 className="text-lg">
                      Drag and drop video files to upload
                    </h4>
                    <p className="my-2">
                      Your videos will be private until you publish them.
                    </p>
                    <label htmlFor="video">
                      <Button text="Select Files" />
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      id="video"
                      className="hidden"
                    />
                  </div>
                  <label className="block">Thumbnail*</label>
                  <div className="white-border mb-5 rounded border py-2 pr-2">
                    <label
                      htmlFor="thumbnail"
                      className="  mr-5 cursor-pointer rounded    bg-primary-color px-5 py-2"
                    >
                      Choose File
                    </label>
                    <span>No file chosen</span>
                    <input
                      type="file"
                      accept="image/*"
                      id="thumbnail"
                      className="hidden"
                    />
                  </div>
                  <label htmlFor="title" className="block">
                    Title*
                  </label>
                  <input
                    type="text"
                    className="white-border mb-5 h-fit w-full rounded border bg-secondary-color px-5  py-2 outline-none"
                  />
                  <label htmlFor="description" className="block">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    className="white-border h-40 w-full  rounded border  bg-secondary-color px-5 py-2 outline-none"
                  ></textarea>
                  <Button
                    text="Upload"
                    onClick={handleUploadVideoClick}
                    className="mx-auto bg-tertiary-color   hover:bg-primary-color"
                  />
                </div>
              )}
              {isSecondModalOpen && (
                <div className=" white-border h-fit max-w-md rounded border bg-secondary-color p-5">
                  <h5 className="text-lg font-semibold">Uploading Video...</h5>
                  <p className="text-sm text-white/50">
                    Track your video uploading process.
                  </p>
                  <div className="flex gap-x-2 py-2">
                    <div className="size-10 rounded-full bg-white p-1">
                      <img src={videoFileIcon} alt="" className="size-full" />
                    </div>
                    <div className="">
                      <span className="block text-sm">
                        Dashboard prototype recording.mp4
                      </span>
                      <span className="block text-xs">16 MB</span>
                    </div>
                  </div>
                  <div className="flex-start-center gap-x-2 pl-12">
                    <div className="size-5 rounded-full bg-white p-0.5">
                      {/* <div className="rounded-full size-full bg-secondary-color"></div> */}
                      <div className="rounded-full bg-white ">
                        <div className="size-5 rounded-full   p-0.5">
                          <img
                            src={checkMarkIcon}
                            alt=""
                            className="rounded-full   "
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">Uploading...</p>
                  </div>
                  <div className="flex w-full gap-x-2 py-2">
                    <Button
                      text="Cancel"
                      className="w-full  bg-primary-color hover:bg-secondary-color"
                      onClick={() => {
                        setIsSecondModalOpen(false);
                        setIsSecondModalOpen(false);
                      }}
                    />
                    <Button
                      text="Finish"
                      className=" w-full  bg-primary-color hover:bg-secondary-color"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <ul
          className={` _hme  padding-X-2  grid size-full gap-x-5 gap-y-6 py-5  ${listView ? "grid-cols-1" : "grid-cols-3"} `}
        >
          {[...Array(25)].map((i) => (
            <li>
              <button
                onClick={() => navigate("video")}
                className="w-full cursor-pointer"
              >
                {videos.map((video) => (
                  <VideoCard
                    key={video._id}
                    listView={listView}
                    video={video}
                  />
                ))}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Videos;
