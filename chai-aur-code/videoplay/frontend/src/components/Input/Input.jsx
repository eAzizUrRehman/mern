import { useState } from "react";
import { eyeOffIcon, eyeOnIcon } from "../../assets";

const Input = ({ label, type, className, onChange, error, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="  ">
      <label htmlFor="email" className=" mb-px block text-sm">
        {label}
      </label>
      <div className=" relative">
        <input
          type={
            type === "password"
              ? isPasswordVisible
                ? "text"
                : "password"
              : type
          }
          className={`white-border border-br block w-full min-w-80 rounded border-l border-t border-l-tertiary-color border-t-tertiary-color  bg-tertiary-color px-2  py-1 outline-none  placeholder:text-white/20 focus:border focus:border-white ${className}`}
          onChange={onChange}
          {...props}
        />
        {type === "password" && (
          <button
            className=" absolute right-1 top-1 z-10 cursor-pointer bg-tertiary-color pl-2"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <img src={eyeOffIcon} alt="" />
            ) : (
              <img src={eyeOnIcon} alt="" />
            )}
          </button>
        )}
      </div>
      <p className="min-h-8  max-w-xs text-xs leading-tight text-red-500">
        {error && error}
      </p>
    </div>
  );
};

export default Input;
