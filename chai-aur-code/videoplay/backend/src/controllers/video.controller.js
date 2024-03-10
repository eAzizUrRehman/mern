import mongoose, { isValidObjectId } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import uploadOnCloudinary from "../cloudinary.js";
import Video from "../models/video.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import deleteLocalFile from "../utils/DeleteLocalFile.js";

const getVideos = asyncHandler(async (req, res) => {
  // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const videos = await Video.find({});

  // console.log("videos", videos);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

// const getVideos = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10, query, sortBy = 'createdAt', sortType = 'desc' } = req.query;

//   const options = {
//     page: parseInt(page, 10),
//     limit: parseInt(limit, 10),
//     sort: {
//       [sortBy]: sortType === 'desc' ? -1 : 1
//     }
//   };

//   let condition = {};
//   if (query) {
//     condition = { title: { $regex: new RegExp(query), $options: 'i' } };
//   }

//   const videos = await Video.mongooseAggregatePaginate(condition, options);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, 'success', videos));
// });

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video id is required");
  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  const video = await Video.findById(videoId);

  // console.log(video);
  res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const addVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (![title, description].some((field) => field?.trim()))
    throw new ApiError(400, "Title and description fields are required");

  const existedUser = await User.findById(req.user?._id);

  if (!existedUser) throw new ApiError(400, "User not found. Please login");

  let videoLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.videoFile) &&
    req.files.videoFile.length > 0
  )
    videoLocalPath = req.files?.videoFile[0]?.path;

  let thumbnailLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.thumbnail) &&
    req.files.thumbnail.length > 0
  )
    thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoLocalPath) throw new ApiError(400, "Video file is required");

  if (!thumbnailLocalPath)
    throw new ApiError(400, "Thumbnail file is required");

  const videoUploaded = await uploadOnCloudinary(videoLocalPath);
  const thumbnailUploaded = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoUploaded)
    throw new ApiError(400, "Video file failed to upload on cloudinary");

  if (!thumbnailUploaded)
    throw new ApiError(400, "Thumbnail file failed to upload on cloudinary");

  deleteLocalFile(videoLocalPath);
  deleteLocalFile(thumbnailLocalPath);

  const video = await Video.create({
    videoFile: videoUploaded?.secure_url,
    thumbnail: thumbnailUploaded?.secure_url,
    title: title,
    description: description,
    duration: videoUploaded?.duration,
    views: 0,
    isPublished: true,
    owner: req.user?._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, video, "Video uploaded to database successfully")
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video id is required");
  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  const { title, description } = req.body;

  console.log("req.body", req.body);

  if (![title, description].some((field) => field?.trim())) {
    throw new ApiError(400, "Title and description fields are required");
  }

  // tip: if you want to update image/file do it in separate controller, else it will send the text again upon update

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideo, "Video details updated successfully")
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video id is required");
  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  await Video.deleteOne({ _id: videoId });

  res.status(200).json(new ApiResponse(200, "Video deleted successfully"));
});

const togglePublishedStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video id is required");
  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  const video = await Video.findById(videoId);

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: video.isPublished,
      },
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedVideo,
        "Video publishing status updated successfully"
      )
    );
});

export {
  getVideos,
  addVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishedStatus,
};
