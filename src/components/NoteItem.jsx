import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import { VIDEO } from "../utils/reducerTypes";
import { useState } from "react";
import AddNote from "./AddNote";
import Modal from "./Modal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function NoteItem({ noteData, videoId }) {
  const { videosDispatch } = useVideos();
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const { note, _id } = noteData;

  return (
    <div className="flex justify-between border-b pb-1">
      <p>{note}</p>
      <div className="flex gap-4">
        <button onClick={() => setOpenNotesModal((prev) => !prev)}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => {
            videosDispatch({
              type: VIDEO.DELETE_NOTE,
              payload: { videoId, noteId: _id },
            });
            toast("Note deleted!");
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <Modal open={openNotesModal} setOpen={setOpenNotesModal}>
        <AddNote
          videoId={videoId}
          setOpen={setOpenNotesModal}
          edit
          noteData={noteData}
        />
      </Modal>
    </div>
  );
}
