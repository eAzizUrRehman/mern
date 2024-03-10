import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../cloudinary.js";
import User from "../models/user.model.js";
import deleteLocalFile from "../utils/DeleteLocalFile.js";

// TODO: prevent relogin if user is already logged in

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - check for non-empty fields
  // check if user already exists
  // check if images/avatar exists
  // upload images to cloudinary
  // create user- create entry in db
  // remove password and refresh token from response
  // send response to frontend
  // check for user creation
  // return response to frontend

  const { fullName, email, username, password } = req.body;

  console.log("\nreq.body", req.body, "\nfullName", fullName, "\nemail", email);

  if (![fullName, email, username, password].some((field) => field?.trim())) {
    throw new ApiError(
      400,
      "Full name, email, username and password fields are required"
    );
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser)
    throw new ApiError(400, "User with this username or email already exists");

  // req.files from multer
  console.log("req.files ", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;

  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // this cause error, use if for this as coverImage is optional field

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  )
    coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  // upload images to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar)
    throw new ApiError(400, "Avatar file failed to upload on cloudinary");

  if (coverImageLocalPath && !coverImage)
    throw new ApiError(400, "Cover image file failed to upload on cloudinary");

  // deleteLocalFile(avatar);
  // if (coverImageLocalPath) deleteLocalFile(coverImage);

  // only User can talk to db
  const user = await User.create({
    fullName,
    avatar: avatar?.secure_url,
    coverImage: coverImage?.secure_url || "",
    email,
    password,
    username: username?.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Failed to create user in database");

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User registered in database successfully"
      )
    );
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // adding tokens to user db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // don't ask for password validation before saving - NO VALIDATION REQUIRED HERE

    // sending to user
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error(error);
    throw new ApiError(
      500,
      "Failed to generate access and refresh tokens, try again later"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // username or email based login
  // check for empty fields
  // check if user exists
  // check if password is correct
  // generate access token
  // generate refresh token
  // send both tokens to user- using secure cookies

  const { emailOrUsername, password } = req.body;

  // if (!username || !email) throw new ApiError(400, "Username and email both are required");

  if (!emailOrUsername)
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
  });

  if (!user) throw new ApiError(404, "User not found");

  // it's user below not User
  // user.isPasswordCorrect is bcrypt method
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // at this point, user have empty token, the method above has add tokens to user db, now either we can  update existing user or bring the user again from db

  // bringing user again from db
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true, // readonly for user, can't modify
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options) // key, value, options
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken, // sending again to user, so that user can store in localstorage in case if server isn't able to save it in cookies
        refreshToken,
        message: "User logged in successfully",
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // we can't ask for email or username here from user, because this will let him logout other users

  // have req.user from verifyJWT middleware
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const regenerateRefreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken)
    throw new ApiError(401, "Unauthorized request, refresh token is missing");

  try {
    const decodedToken = jwt.verfiy(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // while generating refresh token, we have added user id in it

    const user = await User.findById(decodedToken?.id);

    if (!user)
      throw new ApiError(401, "Unauthorized request , Invalid user token");

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(
        401,
        "Unauthorized request, Refresh token is expired or used"
      );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            newRefreshToken,
          },
          "Tokens regenerated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Unauthorized request, Invalid refresh token"
    );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // req.user coming from auth middleware

  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordValid)
    throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateUserAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  // tip: if you want to update image/file do it in separate controller, else it will send the text again upon update

  if (!fullName || !email) throw new ApiError(400, "All fields are required");

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    {
      new: true, // return new data
    }
  ).select("-password");

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Account details updated successfully")
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  deleteLocalFile(avatarLocalPath);

  // if no url from cloudinary
  if (!avatar.secure_url)
    throw new ApiError(400, "Failed to upload avatar on cloudinary");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.secure_url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.files?.path;

  if (!coverImageLocalPath)
    throw new ApiError(400, "Cover image file is missing");

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  deleteLocalFile(coverImageLocalPath);

  if (!coverImage.secure_url)
    throw new ApiError(400, "Failed to upload cover image on cloudinary");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.secure_url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) throw new ApiError(400, "Username is missing");

  // User.findOne is not required because it's done by match

  const channel = await User.aggregate([
    // Each subscription creates a document
    // The document contains the channel id and the user id
    // to get subscribers, we need to select all the documents having that channel id

    // match gets only 1 channel for us, i.e chai aur code etc
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },

    // finding subscribers
    {
      $lookup: {
        from: "subscriptions", // our model
        localField: "_id", // searching using _id
        foreignField: "channel",
        as: "subscribers",
      },
    },

    // finding subscribed to
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribed to",
      },
    },

    // counting
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        subscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"],
            },
            then: true,
            else: false,
          },
        },
      },
    },

    // sending selected fields
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        subscribersCount: 1,
        subscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  // aggregate always return array

  if (!channel?.length) throw new ApiError(404, "Channel not found");

  res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "Channel profile fetched successfully")
    );
});

const getUserWatchHistory = asyncHandler(async (req, res) => {
  // mongodb _id is like ObjectId("60f3e3e3e3e3e3e3e3e3e3e3")
  // mongoose converts it to string, so we can use it in find
  // while query, mongoose converts it to ObjectId again

  const user = await User.aggregate([
    {
      $match: {
        // _id: req.user?._id, // in aggregate, code go to db directly, so we can't use _id directly without any involvement of mongoose

        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",

        // to get owner of video, in pool of videos documents
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",

              // not to send all fields of owner
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            // fixing data for frontend guy
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  if (!user?.length) throw new ApiError(404, "User not found");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  regenerateRefreshToken,
  changeCurrentPassword,
  getCurrentUserDetails,
  updateUserAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getUserWatchHistory,
};
