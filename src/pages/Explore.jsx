import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import VideoCard from "../components/VideoCard";
import SearchFilter from "./SearchFilter";

export default function Explore() {
  const {
    videosData: { videos },
    filteredVideos,
  } = useVideos();

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Explore</h1>
      <SearchFilter />
      <div className="flex flex-wrap justify-center gap-8">
        {filteredVideos?.map((vid) => (
          <VideoCard key={vid._id} videoData={vid} />
        ))}
      </div>
    </section>
  );
}
