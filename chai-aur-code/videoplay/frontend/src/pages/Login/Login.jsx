import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { logo } from "../../assets";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCurrentUserData } from "../../features/currentUserSlice";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const FormSchema = z.object({
    emailOrUsername: z
      .string()
      .min(4, "Email/Username can't be less than 4 characters"),
    password: z.string().min(8, "Password can't be less than 8 characters"),
  });

  const handleLoginUserData = async () => {
    try {
      const validatedData = FormSchema.parse(userData);

      const toastId = toast.loading(`Logging in user [...]...`);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          emailOrUsername: validatedData.emailOrUsername,
          password: validatedData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // This will enable cookies
        },
      );

      const currentUser = await axios.get(
        "http://localhost:3000/api/v1/user/current-user",
        {
          withCredentials: true, // This will enable cookies
        },
      );
      dispatch(addCurrentUserData(currentUser.data.data));

      if (response.status === 200) {
        toast.success(`User [...] logged in successfully`, {
          id: toastId,
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      } else {
        console.error("Error in logging in user", error);
      }
    }
  };

  return (
    <section className=" size-full    ">
      <div className="flex-start-center   flex-col ">
        <Link to="/" className="my-4">
          <img src={logo} alt="" className="size-20 " />
        </Link>
        <div className=" flex-center mx-auto max-w-md flex-col rounded bg-secondary-color  p-5  ">
          <h1 className="mb-5 text-xl">Login</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email/Username*"
              type="text"
              placeholder="abc@example.com or johndoe"
              error={errors?.emailOrUsername}
              onChange={(e) =>
                setUserData({ ...userData, emailOrUsername: e.target.value })
              }
            />
            <Input
              label="Password*"
              type="password"
              placeholder="••••••••••••"
              error={errors?.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />

            <Button
              text="Login"
              className="mt-3 w-full bg-tertiary-color hover:bg-primary-color"
              onClick={handleLoginUserData}
            />
          </form>
        </div>
      </div>
      <div className="flex-center mx-auto my-2 gap-x-2">
        <h3>Don't have an account?</h3>
        <Link to="/signup" className="font-semibold tracking-wide underline">
          Signup
        </Link>
      </div>
    </section>
  );
};

export default Login;
