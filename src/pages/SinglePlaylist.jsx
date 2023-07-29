import React from "react";
import { useParams } from "react-router-dom";
import { useVideos } from "../contexts/VideoProvider";
import VideoCard from "../components/VideoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { VIDEO } from "../utils/reducerTypes";

export default function SinglePlaylist() {
  const {
    videosData: { playlists },
    videosDispatch,
  } = useVideos();
  const { playlistId } = useParams();

  const currentPlaylist = playlists?.find(({ _id }) => _id == playlistId);

  return (
    <section>
      <h1>{currentPlaylist?.playlist_name}</h1>
      <div>
        {currentPlaylist?.playlist_videos?.map((vid) => (
          <div>
            <VideoCard videoData={vid} />
            <button
              onClick={() =>
                videosDispatch({
                  type: VIDEO.REMOVE_FROM_PLAYLIST,
                  payload: { playlistId, videoId: vid._id },
                })
              }
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
