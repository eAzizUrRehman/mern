import { Link } from "react-router-dom";
import { logo, searchIcon } from "../../assets";
import { Button } from "..";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentUserData } from "../../features/currentUserSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const toastId = toast.loading(`Logging out user [...]...`);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      dispatch(removeCurrentUserData());

      if (response.status === 200) {
        toast.success(`User [...] logged out successfully`, {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(
        "An error occurred while logging out. Please try again.",
        error,
      );
      toast.error("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <header className="flex-between-center paddingX paddingY bg-pri mary-color white-border w-full  gap-x-5 border-b bg-secondary-color ">
      <Link to="/" className="shrink-0">
        <img src={logo} alt="logo" width={60} height={60} />
      </Link>
      <div className="relative  ">
        <input
          type="text"
          className="border-br    white-border peer  size-full   rounded bg-tertiary-color   py-1 pl-8 pr-4 outline-none md:w-96"
          placeholder="Search VideoPlay..."
        />
        <img
          src={searchIcon}
          alt=""
          width={18}
          height={18}
          className="absolute left-2 top-2 opacity-50 peer-focus:opacity-100"
        />
      </div>

      {Object.keys(currentUser).length > 1 ? (
        <div className="flex-start-center gap-x-2">
          <div className="flex-center size-12 rounded-full bg-white/30  p-px">
            <img
              src={currentUser?.avatar}
              alt=""
              className="size-full rounded-full object-cover"
            />
          </div>
          <div className="  ">
            <p className=" text-sm text-green-500">{currentUser?.email}</p>
            <Button
              text="Logout"
              className=" mx-auto scale-75 bg-tertiary-color  hover:bg-primary-color"
              onClick={logoutUser}
            />
          </div>
        </div>
      ) : (
        <div className="flex-center gap-5">
          <Link to="/login">
            <Button text="Login" />
          </Link>
          <Link to="/signup">
            <Button text="Register" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
