import { VIDEO } from "../utils/reducerTypes";
import { v4 as uuid } from "uuid";

export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case VIDEO.SET_VIDEOS_DATA:
      {
        state = payload;
      }
      break;
    case VIDEO.WATCH_LATER:
      state = {
        ...state,
        watchLater: state.watchLater.find(({ _id }) => _id == payload._id)
          ? state.watchLater.filter(({ _id }) => _id != payload._id)
          : [payload, ...state.watchLater],
      };
      break;
    case VIDEO.NEW_PLAYLIST:
      state = {
        ...state,
        playlists: [
          { _id: uuid(), playlist_videos: [], ...payload },
          ...state.playlists,
        ],
      };
      break;
    case VIDEO.ADD_TO_PLAYLIST:
      state = {
        ...state,
        playlists: state.playlists.map((pl) =>
          pl._id === payload.playlistId
            ? {
                ...pl,
                playlist_videos: pl.playlist_videos.find(
                  ({ _id }) => _id == payload.video._id
                )
                  ? pl.playlist_videos
                  : [payload.video, ...pl.playlist_videos],
              }
            : pl
        ),
      };
      break;
    case VIDEO.REMOVE_FROM_PLAYLIST:
      state = {
        ...state,
        playlists: state.playlists.map((pl) =>
          pl._id === payload.playlistId
            ? {
                ...pl,
                playlist_videos: pl.playlist_videos.filter(
                  ({ _id }) => _id != payload.videoId
                ),
              }
            : pl
        ),
      };
      break;
    case VIDEO.ADD_NOTE:
      state = {
        ...state,
        videos: state.videos.map((vid) =>
          vid._id == payload.videoId
            ? {
                ...vid,
                notes: vid.notes
                  ? [{ _id: uuid(), note: payload.noteText }, ...vid.notes]
                  : [{ _id: uuid(), note: payload.noteText }],
              }
            : vid
        ),
      };
      break;
    case VIDEO.DELETE_NOTE:
      state = {
        ...state,
        videos: state.videos.map((vid) =>
          vid._id == payload.videoId
            ? {
                ...vid,
                notes: vid.notes.filter(({ _id }) => _id != payload.noteId),
              }
            : vid
        ),
      };
      break;
    case VIDEO.EDIT_NOTE:
      state = {
        ...state,
        videos: state.videos.map((vid) =>
          vid._id == payload.videoId
            ? {
                ...vid,
                notes: vid.notes.map((note) =>
                  note._id == payload.noteId
                    ? { ...note, note: payload.noteText }
                    : note
                ),
              }
            : vid
        ),
      };
      break;
    case VIDEO.SEARCH:
      state = {
        ...state,
        searchText: payload,
      };
      break;
    default:
      break;
  }

  localStorage.setItem("videoData", JSON.stringify(state));

  return state;
};
