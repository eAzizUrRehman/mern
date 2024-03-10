import { Comment } from "../models/comment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");

  const comments = await Comment.find({
    video: videoId,
  });

  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  const { videoId, channelId } = req.params;

  if (!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id");
  if (!isValidObjectId(channelId))
    throw new ApiError(400, "Invalid channel id");

  if (![videoId, channelId].some((field) => field?.trim())) {
    throw new ApiError(400, "Video id and channel id are missing");
  }

  const { content } = req.body;

  if (!content) throw new ApiError(400, "Comment content can't be empty");

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: channelId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid comment id");

  const { content } = req.body;

  if (!content) throw new ApiError(400, "Comment content can't empty");

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content,
    },
    {
      new: true,
    }
  ).select("-video -owner");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId))
    throw new ApiError(400, "Invalid comment id");

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
