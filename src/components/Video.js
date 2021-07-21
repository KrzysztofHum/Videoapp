import React from "react";

export default function Video(props) {
  const videos = props.videos.items[0];
  const title = videos.snippet.localized.title;
  const likeCount = videos.statistics.likeCount;
  const viewCount = videos.statistics.viewCount;
  const thumbnails = videos.snippet.thumbnails.default.url;
  return (
    <div>
      Video
      <h1>Counetr </h1>
      <h2>{title}</h2>
      <h3>{likeCount}</h3>
      <h3>{viewCount}</h3>
      <div>
        <img src={thumbnails} alt="zdjecie" />
      </div>
      <h3>Data {new Date().toLocaleString() + ""}</h3>
    </div>
  );
}
