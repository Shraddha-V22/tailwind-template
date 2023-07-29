import React from "react";
import { useVideos } from "../contexts/VideoProvider";
import { VIDEO } from "../utils/reducerTypes";
import { useState } from "react";

export default function AddNote({ videoId, setOpen, edit, noteData }) {
  const { videosDispatch } = useVideos();
  const [noteText, setNoteText] = useState(edit ? noteData.note : "");

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Write a note..."
        onChange={(e) => setNoteText(e.target.value)}
        value={noteText}
        className="outline-none"
      />
      {!edit ? (
        <button
          onClick={() => {
            videosDispatch({
              type: VIDEO.ADD_NOTE,
              payload: { videoId, noteText },
            });
            setOpen(false);
          }}
        >
          Add Note
        </button>
      ) : (
        <button
          onClick={() => {
            videosDispatch({
              type: VIDEO.EDIT_NOTE,
              payload: { videoId, noteId: noteData._id, noteText },
            });
            setOpen(false);
          }}
        >
          Edit Note
        </button>
      )}
    </div>
  );
}
