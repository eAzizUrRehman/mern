import { useEffect, useState } from "react";
import { dummyImg } from "../../../../assets";
import { PlaylistCard, VideoCard } from "../../../../components";
import axios from "axios";

const Playlist = () => {
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

  return (
    <section className="  flex gap-x-5 p-2">
      <div className="  w-5/12">
        <PlaylistCard listView={false} />
        <div className="flex gap-x-3 p-5">
          <div className="size-20 shrink-0 rounded-full">
            <img
              src={dummyImg}
              alt=""
              className="size-full rounded-full object-cover "
            />
          </div>
          <div className="flex-center-start flex-col gap-y-1  ">
            <h3 className="text-lg tracking-wide">React Patterns</h3>
            <p className="text-sm">757K Subscribers</p>
          </div>
        </div>
      </div>
      <div className=" custom-scrollbar h-dvh w-7/12  overflow-y-auto pb-32">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            listView={true}
            showDescription={false}
            video={video}
          />
        ))}
      </div>
    </section>
  );
};

export default Playlist;
