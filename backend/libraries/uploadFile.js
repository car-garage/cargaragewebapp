import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImageToCloudinary = async (file) => {
  const imageURL = await cloudinary.uploader.upload(
    file.tempFilePath,
    { resource_type: "auto" },

    function (err, result) {
      console.log(result, err);
    }
  );
  fs.unlink(file.tempFilePath, function (err) {
    if (err) console.log(err);
  });

  return imageURL.secure_url;
};
