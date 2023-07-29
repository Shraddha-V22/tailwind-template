import React from "react";

export default function Avatar({ img = "https://picsum.photos/300/176" }) {
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full border">
      <img src={img} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
