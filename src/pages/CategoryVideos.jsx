import React from "react";
import { useParams } from "react-router-dom";
import { useVideos } from "../contexts/VideoProvider";
import VideoCard from "../components/VideoCard";

export default function CategoryVideos() {
  const { cat } = useParams();
  const {
    videosData: { videos },
  } = useVideos();

  const categoryVids = videos?.filter((vid) => vid.category === cat);

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">{cat}</h1>
      <div className="flex flex-wrap gap-8">
        {categoryVids?.map((catVid) => (
          <VideoCard key={catVid._id} videoData={catVid} />
        ))}
      </div>
    </section>
  );
}
