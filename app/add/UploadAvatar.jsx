"use client";
import React from "react";
import { CldUploadButton } from "next-cloudinary";

function UploadAvatar({ setImageUrl }) {
  return (
    <div className="my-4">
      <CldUploadButton
        uploadPreset="next_lab"
        onSuccess={(result) => {
          setImageUrl(result.info.secure_url);
        }}
        className="bg-cyan-700 text-white px-3 py-1 rounded-2xl"
      >
        Upload Image
      </CldUploadButton>
    </div>
  );
}

export default UploadAvatar;
