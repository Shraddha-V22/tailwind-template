import React from "react";
import { useState } from "react";
import { useVideos } from "../contexts/VideoProvider";
import { VIDEO } from "../utils/reducerTypes";

export default function CreatePlaylist({ setOpen }) {
  const { videosDispatch } = useVideos();
  const [inputText, setInputText] = useState({
    playlist_name: "",
    playlist_desc: "",
  });

  function handleCreatePlaylist() {
    if (inputText.playlist_name) {
      videosDispatch({ type: VIDEO.NEW_PLAYLIST, payload: inputText });
    }
    setOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputText((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h2 className="mb-4">Create Playlist</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="playlist name"
          className="rounded-md border p-1"
          name="playlist_name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="playlist description"
          className="rounded-md border p-1"
          name="playlist_desc"
          onChange={handleInputChange}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
      </div>
    </>
  );
}
