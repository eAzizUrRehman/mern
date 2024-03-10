import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    // fields mean more than one file
    {
      name: "avatar", // at frontend, field name should be same as "avatar"
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured route
// can use .get for logout too
router.route("/logout").post(verifyJWT, logoutUser); // injecting verifyJWT middleware
// next() from middleware will call logoutUser
// use reference of middlewares here, not executing them

// secured route
router.route("/refresh-token").post(regenerateRefreshToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUserDetails);

// patch is used for updating, post updates all the details
router
  .route("/update/account-details")
  .patch(verifyJWT, updateUserAccountDetails);

router
  .route("/update/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/update/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(getUserChannelProfile);

router.route("/watch-history").get(verifyJWT, getUserWatchHistory);

export default router;
