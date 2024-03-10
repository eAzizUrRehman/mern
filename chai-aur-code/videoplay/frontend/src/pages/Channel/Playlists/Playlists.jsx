import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Empty, Panel, PlaylistCard } from "../../../components";
import { fileIcon } from "../../../assets";

const Playlist = () => {
  const [listView, setListView] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/* <Empty
        icon={fileIcon}
        title="No playlist created"
        description="There are no playlist created on this channel."
      /> */}
      <div className=" py-2">
        <Panel listView={listView} setListView={setListView} />
        <ul
          className={`  padding-X-2  grid size-full gap-x-5 gap-y-6 py-5  ${listView ? "grid-cols-1" : "grid-cols-2"} `}
        >
          {[...Array(25)].map((i) => (
            <li>
              <button
                onClick={() => navigate("playlist")}
                className="w-full cursor-pointer"
              >
                <PlaylistCard listView={listView} i={i} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
