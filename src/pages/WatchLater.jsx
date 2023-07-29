import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import VideoCard from "../components/VideoCard";

export default function WatchLater() {
  const {
    videosData: { watchLater },
  } = useVideos();

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-lg font-semibold capitalize">Watch Later</h1>
      {watchLater.length > 0 ? (
        <div className="flex flex-wrap gap-8">
          {watchLater?.map((vid) => (
            <VideoCard key={vid?._id} videoData={vid} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-16 flex flex-col gap-2">
          <p>No Videos Saved.</p>
          <button className="rounded-md border p-1">Add videos</button>
        </div>
      )}
    </section>
  );
}
