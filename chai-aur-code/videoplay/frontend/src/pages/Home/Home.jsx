import { useEffect, useState } from "react";
import { playIcon } from "../../assets";
import { Empty, VideoCard } from "../../components";
import Panel from "../../components/Panel/Panel";
import { urls } from "../../constants";
import axios from "axios";

const Home = () => {
  const [listView, setListView] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/videos/",
        );
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos data from backend:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className=" custom-scrollbar relative h-[82.91dvh] overflow-y-auto">
      {videos.length < 0 && (
        <Empty
          icon={playIcon}
          title="No videos available"
          description="There are no videos here available. Please try to search some thing
      else."
        />
      )}
      <div className="">
        <div className="sticky top-0 z-20 my-2">
          <Panel listView={listView} setListView={setListView} />
        </div>
        <div
          className={`  grid size-full   gap-x-5 gap-y-6 p-5  ${listView ? "grid-cols-1" : "grid-cols-3"} `}
        >
          {videos.map((video) => (
            <VideoCard key={video._id} listView={listView} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
