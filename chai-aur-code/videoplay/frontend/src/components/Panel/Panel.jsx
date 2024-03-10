import { gridViewIcon, listViewIcon, searchIcon } from "../../assets";
import { Button } from "..";

const Panel = ({ listView, setListView, searchPlaceholder = "Search..." }) => {
  return (
    <div className="   flex-between-center padding-X-2 sticky top-12 z-20 h-fit  w-full bg-secondary-color py-2  ">
      <div className="flex-center gap-x-2">
        <div className="relative  ">
          <input
            type="text"
            className="border-br    white-border peer  size-full   rounded bg-tertiary-color   py-0.5 pl-8 pr-4 text-sm outline-none md:w-72"
            placeholder={searchPlaceholder}
          />
          <img
            src={searchIcon}
            alt=""
            width={18}
            height={18}
            className="absolute left-2 top-1 opacity-50 peer-focus:opacity-100"
          />
        </div>
        <Button
          text="Search"
          className="scale-75   bg-tertiary-color hover:bg-primary-color"
        />
      </div>

      {listView ? (
        <button
          className="cursor-pointer opacity-80"
          onClick={() => setListView(false)}
        >
          <img src={gridViewIcon} alt="" width={25} height={25} />
        </button>
      ) : (
        <button
          className="cursor-pointer opacity-80"
          onClick={() => setListView(true)}
        >
          <img src={listViewIcon} alt="" width={25} height={25} />
        </button>
      )}
    </div>
  );
};

export default Panel;
