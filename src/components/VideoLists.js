import { useSelector } from "react-redux";
import Video from "./Video";

export default function VideoLists() {
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;


  return (
    <div className="video-list">
      {loading ? (
        <div>Ładowanie</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Video videos={videos}></Video>
      )}
    </div>
  );
}
