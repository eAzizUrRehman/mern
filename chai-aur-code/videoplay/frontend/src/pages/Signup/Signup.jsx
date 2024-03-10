import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button, Input } from "../../components";
import { logo } from "../../assets";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  const FormSchema = z.object({
    fullName: z.string().min(4, "Name must be at least 4 characters long"),
    email: z.string().email("Invalid email address"),
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .refine(
        (username) => /^[a-zA-Z0-9_.]+$/.test(username),
        "Username can only contain alphanumeric characters, underscores, and periods",
      ),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .refine((confirmPassword) => confirmPassword === userData.password, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }),
    avatar: z
      .instanceof(File)
      .refine((file) => file instanceof File, "Avatar must be a file")
      .refine(
        (file) => file !== undefined && file !== null,
        "Avatar file is required",
      )
      .refine(
        (file) => file && file.type.startsWith("image/"),
        "Avatar must be an image file",
      ),
    coverImage: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.type.startsWith("image/"),
        "Cover image must be an image file",
      ),
  });

  const handleRegisterUserData = async () => {
    try {
      const validatedData = FormSchema.parse(userData);

      const formData = new FormData();
      formData.append("fullName", validatedData.fullName);
      formData.append("email", validatedData.email);
      formData.append("username", validatedData.username);
      formData.append("password", validatedData.password);
      formData.append("avatar", validatedData.avatar);
      if (validatedData.coverImage)
        formData.append("coverImage", validatedData.coverImage);

      const registerUser = async () => {
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        return response;
      };
      const toastId = toast.loading(`Creating user [${userData.fullName}]...`);
      const registerUserResponse = await registerUser();
      if (registerUserResponse.status === 201) {
        toast.success("User created successfully", { id: toastId });
        navigator("/login");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className=" ">
      <div className="flex-start-center   flex-col ">
        <Link to="/" className="my-4">
          <img src={logo} alt="" className="size-20 " />
        </Link>
        <div className="flex-center   max-w-md flex-col rounded bg-secondary-color  p-5  ">
          <h1 className="mb-5 text-xl">Signup</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Full Name*"
              type="text"
              placeholder="John Doe"
              error={errors?.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
            />
            <Input
              label="Email*"
              type="email"
              placeholder="abc@example.com"
              error={errors?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              label="Username*"
              type="text"
              placeholder="johndoe"
              error={errors?.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
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
            <Input
              label="Confirm Password*"
              type="password"
              placeholder="••••••••••••"
              error={errors?.password}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            />
            <Input
              label="Avatar*"
              type="file"
              accept="image/*"
              error={errors?.avatar}
              onChange={(e) =>
                setUserData({ ...userData, avatar: e.target.files[0] })
              }
            />
            <Input
              label="Cover Image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setUserData({ ...userData, coverImage: e.target.files[0] })
              }
            />
            <Button
              text="Signup"
              className="mt-3 w-full bg-tertiary-color hover:bg-primary-color"
              onClick={handleRegisterUserData}
            />
          </form>
        </div>
      </div>
      <div className="flex-center mx-auto my-5 gap-x-2">
        <h3>Already have an account?</h3>
        <Link to="/login" className="font-semibold tracking-wide underline">
          Login
        </Link>
      </div>
    </section>
  );
};

export default Signup;
