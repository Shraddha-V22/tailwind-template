import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Playlists from "./pages/Playlists";
import WatchLater from "./pages/WatchLater";
import Sidebar from "./components/Sidebar";
import CategoryVideos from "./pages/CategoryVideos";
import Video from "./pages/Video";
import SinglePlaylist from "./pages/SinglePlaylist";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="grid grid-cols-[auto_1fr] p-8">
      <Sidebar />
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/category/:cat" element={<CategoryVideos />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
        </Routes>
      </section>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
        toastOptions={{
          style: { maxWidth: 500 },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
