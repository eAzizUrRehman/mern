import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/${videoId}`,
        );
        setVideo(response.data.data);
      } catch (error) {
        console.error("Error fetching single video data from backend:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <img src={video.thumbnail} alt="" />
      {video.title}
    </section>
  );
};

export default Video;
