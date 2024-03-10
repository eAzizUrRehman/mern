import { useState } from "react";
import { twoUsersIcon } from "../../../assets";
import { Empty, Panel, SubscribedCard } from "../../../components";

const Subscribed = () => {
  const [listView, setListView] = useState(false);
  return (
    <div className="   ">
      {/* <Empty
        title="No people subscribers"
        description="This channel has yet to subscribe a new channel."
        icon={twoUsersIcon}
      /> */}
      <div className=" py-2 ">
        <Panel listView={listView} setListView={setListView} />

        <div
          className={`padding-X-2  grid gap-x-5 ${listView ? "grid-cols-1" : "grid-cols-2 "}`}
        >
          {[...Array(25)].map((i) => (
            <div className="mt-2">
              <SubscribedCard listView={listView} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscribed;
