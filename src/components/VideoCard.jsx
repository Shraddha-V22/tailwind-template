import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { faClock as faClockFilled } from "@fortawesome/free-solid-svg-icons/faClock";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { VIDEO } from "../utils/reducerTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideos } from "../contexts/VideoProvider";

export default function VideoCard({ videoData }) {
  const {
    videosData: { watchLater },
    videosDispatch,
  } = useVideos();
  const navigate = useNavigate();
  const { category, chips, creator, src, title, thumbnail, views, _id } =
    videoData;

  function handleWatchLater(e) {
    e.stopPropagation();
    videosDispatch({
      type: VIDEO.WATCH_LATER,
      payload: videoData,
    });
  }

  return (
    <div
      onClick={() => navigate(`/video/${_id}`)}
      className="relative grid w-[250px] grid-rows-[150px_1fr] rounded-md hover:cursor-pointer"
    >
      <div className="absolute right-0 grid h-8 w-8 place-items-center rounded-full bg-gray-200/50">
        {watchLater?.find((vid) => vid?._id == _id) ? (
          <button onClick={handleWatchLater}>
            <FontAwesomeIcon icon={faClockFilled} />
          </button>
        ) : (
          <button onClick={handleWatchLater}>
            <FontAwesomeIcon icon={faClock} />
          </button>
        )}
      </div>
      <img src={thumbnail} alt={title} className="h-full w-full rounded-md" />
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Avatar />
        <div className="p-1">
          <h4 className="line-clamp-1 font-semibold">{title}</h4>
          <h5 className="text-sm">{category}</h5>
          <div className="text-xs">
            <span>{views}</span> | <span>{creator}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// category
// :
// "Clay Modeling"
// chips
// :
// (4) ['sculpture', 'polymer clay', 'animals', 'crafts']
// creator
// :
// "CraftyCritters"
// src
// :
// "https://www.youtube.com/embed/GBIIQ0kP15E"
// thumbnail
// :
// "https://picsum.photos/300/176"
// title
// :
// "Sculpting Animals from Polymer Clay - Step by Step Guide"
// views
// :
// 2251
// _id
// :
// 21
