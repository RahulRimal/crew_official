import React from "react";
import { Gallery } from "../components";

// const images = [
//   { id: 0, src: "https://source.unsplash.com/3200x1500/?nature" },
//   { id: 1, src: "https://source.unsplash.com/3200x1000/?man" },
//   { id: 2, src: "https://source.unsplash.com/1500x500/?technology" },
//   { id: 3, src: "https://source.unsplash.com/1010x400/?laptop" },
//   { id: 4, src: "https://source.unsplash.com/1500x900/?landscape" },
//   { id: 5, src: "https://source.unsplash.com/3200x1000/?people" },
//   { id: 6, src: "https://source.unsplash.com/900x900/?teaching" },
// ];
const images = [
  {
    id: 0,
    src: "http://127.0.0.1:8000/media/equipment/images/nikon_D5600_front.jpg",
  },
  { id: 1, src: "http://127.0.0.1:8000/media/equipment/images/sonyfornt.jpg" },
  { id: 2, src: "http://127.0.0.1:8000/media/equipment/images/5df.jpg" },
  {
    id: 3,
    src: "http://127.0.0.1:8000/media/equipment/images/715g74yUKDS._AC_SL1500_.jpg",
  },
  {
    id: 4,
    src: "http://127.0.0.1:8000/media/equipment/images/1380C002_ef-24-105mm-f-4l-is-ii-usm_primary.jpg",
  },
  {
    id: 5,
    src: "http://127.0.0.1:8000/media/equipment/images/71LyXKeA3cL._AC_SL1500_.jpg",
  },
];

const ArtistGallery = () => {
  return <Gallery images={images} />;
};

export default ArtistGallery;
