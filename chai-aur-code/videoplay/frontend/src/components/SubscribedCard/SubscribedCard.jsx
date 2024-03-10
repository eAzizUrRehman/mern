import { dummyImg } from "../../assets";
import Button from "../Button/Button";

const SubscribedCard = () => {
  return (
    <div className="flex-between-center gap-x-5 bg-secondary-color px-5   py-1">
      <div className="flex gap-x-2">
        <div className="size-16 rounded-full">
          <img
            src={dummyImg}
            alt=""
            className="size-full rounded-full object-cover"
          />
        </div>
        <div className="flex-center-start   flex-col">
          <h3 className="font-semibold tracking-wide">Code Master</h3>
          <p className="text-sm">20K Subscribers</p>
        </div>
      </div>
      <Button text="Unsubscribe" />
    </div>
  );
};

export default SubscribedCard;
