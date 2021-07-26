import { useDispatch, useSelector } from "react-redux";
import Video from "./Video";
import { Button, Container, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";
import Paginations from "./Paginations";
import { ALL_VIDEO_DELETE } from "../constants/videoConstants";

export default function VideoLists() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;

  const deleteAllVideoHandler = () => {
    if (window.confirm("Na pewno chcesz usunąć wszystkie filmy ?")) {
      dispatch({ type: ALL_VIDEO_DELETE });
    }
  };
  return (
    <Container className="mt-5">
      <Paginations />
      <Button onClick={() => deleteAllVideoHandler()}>Usuń Wszystko</Button>

      {loading ? (
        <div>Ładowanie</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {videos.map((video) => (
            <Video
              key={video.id}
              id={video.id}
              title={video.name ?? video.snippet.localized.title}
              like={
                video.metadata?.connections?.likes?.total ??
                video.statistics.likeCount
              }
              view={video.pictures ?? video.statistics.viewCount}
              img={
                video.pictures?.sizes[2]?.link ??
                video.snippet.thumbnails.default.url
              }
            ></Video>
          ))}
        </Row>
      )}
    </Container>
  );
}
