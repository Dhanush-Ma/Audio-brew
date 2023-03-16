import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Welcome from "./Components/Main Components/Welcome";
import Search from "./Components/Main Components/Search";
import CreatePlaylist from "./Components/Main Components/CreatePlaylist";
import LikedSongs from "./Components/Main Components/LikedSongs";
import Playlist from "./Components/Playlist";
import ArtistsPreferences from "./Pages/ArtistsPreferences";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ContextProvider from "./Context/Context";
import Profile from "./Components/Profile Components/Profile";
import Preferences from "./Pages/Preferences";
import ArtistPlaylist from "./Components/ArtistPlaylist";
import FeaturedPlaylistsTracks from "./Components/Welcome Components/FeaturedPlaylistsTracks";
import FeaturedPlaylistsInfo from "./Components/Welcome Components/FeaturedPlaylistsInfo";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="preferences">
        <Route index path="genre" element={<Preferences />} />
        <Route path="artist" element={<ArtistsPreferences />} />
      </Route>
      <Route path="/" element={<Home />}>
        <Route path="me" element={<Welcome />} />
        <Route path="search" element={<Search />} />
        <Route path="AudioBrew/artist/:id" element={<ArtistPlaylist />} />

        <Route
          path="AudioBrew/featured/:id"
          element={<FeaturedPlaylistsInfo />}
        />
        <Route
          path="AudioBrew/featured/tracks/:id"
          element={<FeaturedPlaylistsTracks />}
        />

        <Route path="playlist" element={<CreatePlaylist />} />
        <Route path="playlist/:id" element={<Playlist />} />

        <Route path="personal" element={<LikedSongs />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
}

export default App;
