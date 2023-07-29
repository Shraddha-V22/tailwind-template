import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreatePlaylist from "../components/CreatePlaylist";
import Modal from "../components/Modal";
import { useEffect } from "react";

export default function Playlist() {
  const navigate = useNavigate();
  const {
    videosData: { playlists },
  } = useVideos();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const existingPlaylists = JSON.parse(localStorage.getItem("playlists"));
    if (existingPlaylists) {
    }
  }, [playlists]);

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Playlists</h1>
      <div className="flex flex-wrap gap-8">
        <div
          className="grid h-[100px] w-[200px] place-items-center rounded-md bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
          onClick={() => setOpenModal((prev) => !prev)}
        >
          add new playlist
        </div>
        {playlists?.map((pl) => (
          <div
            className="h-[200px] w-[200px]"
            onClick={() => navigate(`/playlist/${pl._id}`)}
          >
            <img
              src={pl.img ? pl.img : "https://picsum.photos/300/150"}
              alt=""
              className="h-[100px] rounded-md"
            />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{pl.playlist_name}</h3>
              <p className="text-xs">{pl.playlist_desc}</p>
            </div>
          </div>
        ))}
        <Modal open={openModal} setOpen={setOpenModal}>
          <CreatePlaylist setOpen={setOpenModal} />
        </Modal>
      </div>
    </section>
  );
}
