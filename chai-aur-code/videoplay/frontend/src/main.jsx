import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  // Redirect,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DefaultLayout, OnlyHeaderLayout } from "./layouts";
import {
  Home,
  Channel,
  ChannelVideos,
  ChannelVideo,
  Video,
  Playlists,
  Playlist,
  Tweets,
  Subscribed,
  Signup,
  Login,
  Edit,
  Dashboard,
} from "./pages";
import { Provider } from "react-redux";
import store from "./app/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="channel" element={<Channel />}>
          <Route path="" element={<ChannelVideos />} />
          <Route path="videos" element={<ChannelVideos />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="tweets" element={<Tweets />} />
          <Route path="subscribed" element={<Subscribed />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="channel/videos/video" element={<ChannelVideo />} />
        <Route path="channel/playlists/playlist" element={<Playlist />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="" element={<OnlyHeaderLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="videos/:videoId" element={<Video />} />
      </Route>
    </Route>,
  ),
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
