import { nanoid } from "@reduxjs/toolkit";
import { eyeIcon, heartIcon, plusIcon, profileCheckedIcon } from "../../assets";
import { Button } from "../../components";

const Dashboard = () => {
  const dashboardStats = [
    {
      id: nanoid(10),
      icon: eyeIcon,
      title: "Total Views",
      value: 221234,
    },
    {
      id: nanoid(10),
      icon: profileCheckedIcon,
      title: "Total Followers",
      value: 4053,
    },
    {
      id: nanoid(10),
      icon: heartIcon,
      title: "Total Likes",
      value: 63021,
    },
  ];

  return (
    <section className="space-y-10  py-10">
      <div className="flex-between-center  gap-x-5 ">
        <div className="space-y-1   ">
          <h1 className="text-3xl font-semibold tracking-wide">
            Welcome back, Olivia
          </h1>
          <p className="text-sm">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
        <Button text="Upload Video" icon={plusIcon} />
      </div>
      <ul className=" flex w-full gap-x-5">
        {dashboardStats.map((stat) => (
          <li className=" white-border w-full cursor-pointer space-y-3 rounded border p-10">
            <div className="size-12 rounded-full bg-white p-3">
              <img src={stat.icon} alt="" className="size-full rounded-full" />
            </div>
            <h3 className="text-base">{stat.title}</h3>
            <p className="text-4xl font-semibold tracking-wide">
              {stat.value.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr className="*:capitalize">
            <th className="">Status</th>
            <th>Status</th>
            <th>Uploaded</th>
            <th>Rating</th>
            <th>Date Uploaded</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="checkbox"
                class="peer hidden"
                id="dark-mode-toggler"
                checked="true"
              />
              <label
                htmlFor=""
                class="bg-gray-5 peer-checked:before:bg-purple-1 relative h-7 w-11 cursor-pointer rounded-full before:absolute before:left-1 before:top-1 before:h-5 before:w-5 before:rounded-full before:bg-[#363645] before:transition before:duration-150 before:content-[''] peer-checked:before:left-auto peer-checked:before:right-1 peer-checked:before:top-1"
              ></label>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Dashboard;
