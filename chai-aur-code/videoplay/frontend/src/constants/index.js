import { nanoid } from "@reduxjs/toolkit";
import {
  collectionsIcon,
  historyIcon,
  homeIcon,
  likedVideosIcon,
  myContentIcon,
  settingsIcon,
  subscribersIcon,
  supportIcon,
} from "../assets";

export const menus = [
  {
    id: nanoid(10),
    title: "Home",
    logo: homeIcon,
    path: "/",
  },
  {
    id: nanoid(10),
    title: "Liked Videos",
    logo: likedVideosIcon,
    path: "/",
  },
  {
    id: nanoid(10),
    title: "History",
    logo: historyIcon,
    path: "/",
  },
  {
    id: nanoid(10),
    title: "My Content",
    logo: myContentIcon,
    path: "/",
  },
  {
    id: nanoid(10),
    title: "Collections",
    logo: collectionsIcon,
    path: "/",
  },
  {
    id: nanoid(10),
    title: "Subscribers",
    logo: subscribersIcon,
    path: "/",
  },
];

export const bottomMenus = [
  {
    id: nanoid(12),
    title: "Settings",
    logo: settingsIcon,
    path: "/",
  },
  {
    id: nanoid(12),
    title: "Support",
    logo: supportIcon,
    path: "/",
  },
];

export const channelNav = [
  {
    id: nanoid(14),
    title: "Videos",
    link: "/channel/videos",
  },
  {
    id: nanoid(14),
    title: "Playlist",
    link: "/channel/playlists",
  },
  {
    id: nanoid(14),
    title: "Tweets",
    link: "/channel/tweets",
  },
  {
    id: nanoid(14),
    title: "Subscribed",
    link: "/channel/subscribed",
  },
];

export const editNav = [
  {
    id: nanoid(16),
    title: "Personal Information",
  },
  {
    id: nanoid(16),
    title: "Channel Information",
  },
  {
    id: nanoid(16),
    title: "Change Password",
  },
];

const base_url = "http://localhost:3000/api/v1/";

export const urls = {
  // healthcheck: `${base_url}healthcheck`,
  // user: `${base_url}user`,
  // tweets: `${base_url}tweets`,
  // subscriptions: `${base_url}subscriptions`,
  videos: `${base_url}videos`,
  // comments: `${base_url}comments`,
  // likes: `${base_url}likes`,
  // playlist: `${base_url}playlist`,
  // dashboard: `${base_url}dashboard`,
};
