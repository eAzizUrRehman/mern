import { emailIcon } from "../../../assets";
import { Button } from "../../../components";
import { editNav } from "../../../constants";
import { useState } from "react";

const Edit = () => {
  const [selectedEditNavId, setSelectedEditNavId] = useState(editNav[0].id);

  return (
    <div className="h-[1000px]">
      <div className="padding-X-2 sticky top-0 z-40 bg-secondary-color  py-2">
        <ul className="flex-between-center *:flex-center   gap-x-2 *:grow *:cursor-pointer *:rounded">
          {editNav.map((nav) => (
            <li key={nav.id}>
              <Button
                text={nav.title}
                className="w-full   bg-tertiary-color hover:bg-primary-color"
                onClick={() => {
                  setSelectedEditNavId(nav.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      {editNav.find((nav) => nav.id === selectedEditNavId).title ===
        "Personal Information" && (
        <div className=" flex-center m-10 mx-auto max-w-xl flex-col rounded p-10">
          <h1 className="text-lg font-semibold">Personal Information</h1>
          <p className="text-sm">Update your photo and personal details.</p>
          <form action="">
            <div className="p-10">
              <div className="flex gap-x-5">
                <div className="">
                  <label htmlFor="firstName" className="capitalize">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value="React"
                    className=" white-border w-full rounded border bg-secondary-color px-4 py-1 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="capitalize">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value="Pattern"
                    className="white-border w-full rounded border bg-secondary-color px-4 py-1 outline-none"
                  />
                </div>
              </div>
              <label htmlFor="email">Email</label>
              <div className="relative">
                <img
                  src={emailIcon}
                  alt=""
                  className="absolute left-3 top-1.5 w-5"
                />
                <input
                  type="text"
                  placeholder="Enter last name"
                  value="patternsreact@gmail.com"
                  className="white-border w-full rounded  border bg-secondary-color py-1 pl-10 pr-4 outline-none"
                />
              </div>
            </div>

            <div className=" flex-end-center white-border w-full gap-x-3 border-t">
              <Button text="Cancel" />
              <Button text="Save changes" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
