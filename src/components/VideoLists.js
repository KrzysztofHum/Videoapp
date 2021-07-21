import { useSelector } from "react-redux";
import Video from "./Video";
import { v4 as uuidv4 } from "uuid";

export default function VideoLists() {
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;
  console.log(videos);
  return (
    <div className="video-list">
      {loading ? (
        <div>Ładowanie</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {videos.map((video) => (
            <Video key={uuidv4()} product={video}></Video>
          ))}
        </>
      )}
    </div>
  );
}
