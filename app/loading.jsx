import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-[600px]">
      <div className="w-10 h-10 border-4 border-cyan-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
