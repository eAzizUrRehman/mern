import fs from "fs";
import ApiError from "./ApiError.js";

const deleteLocalFile = (filePath) => {
  try {
    fs.unlink(filePath, (error) => {
      error
        ? console.log("Unlink failed", error)
        : console.log(`File (${filePath}) deleted`);
    });
  } catch (error) {
    throw new ApiError(500, "Error deleting local file");
  }
};

export default deleteLocalFile;
