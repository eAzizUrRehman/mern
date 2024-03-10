import { Link, Outlet, useNavigate } from "react-router-dom";
import { dummyImg, editIcon, userIcon } from "../../assets";
import { Button } from "../../components";
import { channelNav } from "../../constants";

const Channel = ({ isMe = true }) => {
  const navigate = useNavigate();

  return (
    <section className="h-full    overflow-y-auto      ">
      <div className="">
        <img src={dummyImg} alt="" className="h-40 w-full object-cover" />
      </div>
      <div className="  padding-X-2 white-border relative flex h-fit gap-x-10 border-b  bg-secondary-color py-2 ">
        <div className="absolute -top-10 left-10 size-32 rounded-full border-2 border-white ">
          <img
            src={dummyImg}
            alt=""
            className="size-full rounded-full object-cover "
          />
        </div>
        <div className="flex-between-center ml-36 grow">
          <div className="">
            <h1 className="text-2xl font-semibold tracking-widest">
              React Patterns
            </h1>
            <h3 className="my-1 text-sm">@reactpatterns</h3>
            <div className="flex-start-center gap-x-1 text-xs">
              <p className="text-center">
                <span className="font-semibold">600k </span>
                Subscribers
              </p>
              <span>·</span>
              <p className="text-center">
                <span className="font-semibold">220</span> Subscribed
              </p>
            </div>
          </div>
          {isMe ? (
            <Button
              text="Edit Channel"
              icon={editIcon}
              onClick={() => navigate("edit")}
            />
          ) : (
            <Button text="Subscribe" icon={userIcon} />
          )}
        </div>
      </div>
      <div className="padding-X-2 sticky top-0 z-40 bg-secondary-color  py-2">
        <ul className="flex-between-center *:flex-center   gap-x-2 *:grow *:cursor-pointer *:rounded">
          {channelNav.map((nav) => (
            <li key={nav.id}>
              <Link to={nav.link} className="w-full">
                <Button
                  text={nav.title}
                  className="w-full   bg-tertiary-color hover:bg-primary-color"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </section>
  );
};

export default Channel;
