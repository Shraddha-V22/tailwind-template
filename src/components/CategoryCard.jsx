import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ categoryData }) {
  const navigate = useNavigate();
  const { category, src, thumbnail, _id } = categoryData;
  return (
    <div
      onClick={() => navigate(`/category/${category}`)}
      className="hover:cursor-pointer"
    >
      <img src={thumbnail} alt={category} className="rounded-md" />
      <h3 className="p-1 text-lg font-semibold">{category}</h3>
    </div>
  );
}
