import { useSelector } from "react-redux";
import Video from "./Video";
import { Container, Row } from "reactstrap";

export default function VideoLists() {
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;

  return (
    <Container className="mt-5">
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
