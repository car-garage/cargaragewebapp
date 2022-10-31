import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: "dtxszm4xo",
  api_key: "842167945335214",
  api_secret: "b4mcpPJmnrRMX92r5ZmZaEF5ivU",
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
