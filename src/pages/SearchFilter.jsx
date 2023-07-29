import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import { VIDEO } from "../utils/reducerTypes";

export default function SearchFilter() {
  const { videosDispatch } = useVideos();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Videos..."
        className="min-w-full rounded-md border p-2 indent-1"
        onChange={(e) =>
          videosDispatch({ type: VIDEO.SEARCH, payload: e.target.value })
        }
      />
    </div>
  );
}
