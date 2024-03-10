import { dummyImg } from "../../assets";

const PlaylistCard = ({ listView, i }) => {
  return (
    <div
      key={i}
      className={`    ${listView ? " flex-start-end flex-row gap-x-5" : "flex flex-col"} border-br white-border rounded bg-secondary-color`}
    >
      <div className={`relative shrink-0 ${listView ? " w-1/2 " : "w-full"}`}>
        <div className={` h-60 rounded  `}>
          <img src={dummyImg} alt="" className=" size-full  object-cover" />
        </div>
        <div className="absolute   bottom-0 left-0 w-full   border-t bg-white/30 px-6 py-3  text-white backdrop-blur-sm before:absolute before:inset-0  before:bg-black/40 ">
          <div className="relative z-20">
            <div className="flex-between-center gap-5">
              <h4 className="">Playlist</h4>
              <span>2 videos</span>
            </div>
            <p className="flex-start-center gap-x-1">
              <span className={`${listView ? "text-sm" : "text-xs"}`}>
                10.3k Views
              </span>
              <span>·</span>
              <span className={`${listView ? "text-sm" : "text-xs"}`}>
                44 minutes ago
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="    h-full    px-4 py-2 ">
        <div
          className={`${listView ? "flex-center-start flex-col gap-y-4" : "flex flex-col"}   h-full  `}
        >
          <h2
            className={` font-semibold ${listView ? "max-w-md text-3xl" : "text-xl tracking-wide"}`}
          >
            React Mastery
          </h2>

          <p
            className={`max-w-sm  tracking-wide ${listView ? "text-normal" : "text-sm"}`}
          >
            Master the art of building dynamic user interfaces with React.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
