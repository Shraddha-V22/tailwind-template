import React from "react";
import { createContext } from "react";
import { videos } from "../data/videos";
import { categories } from "../data/categories";
import { videoReducer } from "../reducers/videoReducer";
import { useContext } from "react";
import { useReducer } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { VIDEO } from "../utils/reducerTypes";

const VideoContext = createContext();

const initialVideosData = {
  videos: [...videos],
  categories: [...categories],
  watchLater: [],
  playlists: [],
  searchText: "",
};

export default function VideoProvider({ children }) {
  const [videosData, videosDispatch] = useReducer(
    videoReducer,
    initialVideosData
  );

  const filteredVideos = useMemo(() => {
    let newData = [...videosData.videos];
    newData = videosData.videos.filter(({ title }) =>
      title.toLowerCase().includes(videosData.searchText.toLowerCase())
    );
    return newData;
  }, [videosData.searchText]);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("videoData"));
    if (existingData) {
      videosDispatch({
        type: VIDEO.SET_VIDEOS_DATA,
        payload: existingData,
      });
    } else {
      videosDispatch({ type: VIDEO.SET_VIDEOS_DATA, payload: videosData });
    }
  }, []);

  return (
    <VideoContext.Provider
      value={{ videosData, filteredVideos, videosDispatch }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export const useVideos = () => useContext(VideoContext);
