import { Router } from "express";
import {
  deleteVideo,
  getVideos,
  getVideoById,
  addVideo,
  togglePublishedStatus,
  updateVideo,
} from "../controllers/video.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getVideos);

router.route("/upload").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  addVideo
);

router.route("/:videoId").get(getVideoById);
//   .delete(verifyJWT, deleteVideo)
// .patch(verifyJWT, upload.single("thumbnail"), updateVideo);
// router.route("/toggle/publish/:videoId").patch(togglePublishedStatus);

export default router;
