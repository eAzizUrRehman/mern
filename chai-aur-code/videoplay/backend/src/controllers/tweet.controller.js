import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user id");

  const tweets = await Tweet.find({});

  res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
});

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) throw new ApiError(400, "Tweet content can't be empty");

  const tweet = await Tweet.create({
    content,
    video: videoId,
    owner: channelId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet added successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet id");

  const { content } = req.body;

  if (!content) throw new ApiError(400, "Tweet content can't empty");

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      content,
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet id");

  await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
