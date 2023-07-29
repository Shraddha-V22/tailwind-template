import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Avatar from "../components/Avatar";
import { faClock as faClockFilled } from "@fortawesome/free-solid-svg-icons/faClock";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";
import { VIDEO } from "../utils/reducerTypes";
import { useState } from "react";
import CreatePlaylist from "../components/CreatePlaylist";
import Modal from "../components/Modal";
import AddNote from "../components/AddNote";
import NoteItem from "../components/NoteItem";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

export default function Video() {
  const { videoId } = useParams();
  const {
    videosData: { videos, watchLater, playlists },
    videosDispatch,
  } = useVideos();
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNotesModal, setOpenNotesModal] = useState(false);

  const video = videos?.find((vid) => vid._id == videoId);

  return (
    <section className="grid w-full grid-cols-[1fr_auto] gap-8">
      <section className="h-fit">
        <div className="flex flex-col gap-2 border-b border-black pb-2">
          <iframe
            className="max-h-[500px] min-h-[350px] w-full min-w-[300px] rounded-md"
            src={video?.src}
          ></iframe>
          <div className="grid grid-cols-[1fr_auto] items-center p-1">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Avatar />
              <h3 className="text-lg font-semibold">{video?.title}</h3>
            </div>
            <div className="flex items-start gap-4">
              {watchLater?.find(({ _id }) => _id == videoId) ? (
                <button
                  onClick={() =>
                    videosDispatch({
                      type: VIDEO.WATCH_LATER,
                      payload: video,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faClockFilled} />
                </button>
              ) : (
                <button
                  onClick={() =>
                    videosDispatch({
                      type: VIDEO.WATCH_LATER,
                      payload: video,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faClock} />
                </button>
              )}
              <div className="relative">
                <button onClick={() => setShowPlaylists((prev) => !prev)}>
                  <span className="material-symbols-outlined">
                    playlist_add
                  </span>
                </button>
                {showPlaylists && (
                  <div className="absolute right-0 flex w-[200px] flex-col gap-2 rounded-md bg-gray-50 p-4 shadow-md">
                    <h3 className="text-lg font-semibold">Add to playlist</h3>
                    <div>
                      {playlists?.map((pl) => (
                        <p
                          className="rounded-md p-1 px-2 text-sm hover:cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            videosDispatch({
                              type: VIDEO.ADD_TO_PLAYLIST,
                              payload: { playlistId: pl._id, video: video },
                            });
                            setShowPlaylists(false);
                          }}
                          key={pl._id}
                        >
                          {pl.playlist_name}
                        </p>
                      ))}
                    </div>
                    <button
                      className="rounded-md border p-1 px-2 text-sm capitalize"
                      onClick={() => setOpenModal((prev) => !prev)}
                    >
                      create new playlist
                    </button>
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => setOpenNotesModal((prev) => !prev)}>
                  <FontAwesomeIcon icon={faSquarePen} />
                </button>
                <Modal open={openNotesModal} setOpen={setOpenNotesModal}>
                  <AddNote videoId={videoId} setOpen={setOpenNotesModal} />
                </Modal>
              </div>
              <Modal open={openModal} setOpen={setOpenModal}>
                <CreatePlaylist setOpen={setOpenModal} />
              </Modal>
            </div>
          </div>
        </div>
        <div className="px-1 py-6">
          <h2 className="text-lg font-semibold">My Notes</h2>
          <AllNotes notes={video?.notes} videoId={videoId} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        {videos?.map((vid) =>
          vid._id != videoId ? (
            <VideoCard key={vid._id} videoData={vid} />
          ) : null
        )}
      </section>
    </section>
  );
}

function AllNotes({ notes, videoId }) {
  return (
    <div>
      {notes?.map((note) => (
        <NoteItem key={note._id} noteData={note} videoId={videoId} />
      ))}
    </div>
  );
}
