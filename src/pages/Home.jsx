import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const {
    videosData: { categories },
  } = useVideos();

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold capitalize">categories</h1>
      <div className="flex flex-wrap gap-8">
        {categories?.map((cat) => (
          <CategoryCard key={cat._id} categoryData={cat} />
        ))}
      </div>
    </section>
  );
}
