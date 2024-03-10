import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  // {
  //   video: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Video",
  //   },
  //   comment: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Comment",
  //   },
  //   tweet: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Tweet",
  //   },
  //   likedBy: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // },
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

export { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike };
