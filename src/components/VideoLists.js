import { useSelector } from "react-redux";
import Video from "./Video";
import { v4 as uuidv4 } from "uuid";
import { Container, Row } from "reactstrap";

export default function VideoLists() {
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;
  console.log(videos);

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
              key={uuidv4()}
              title={video.name ?? video.items[0].snippet.localized.title}
              like={
                video.metadata?.connections?.likes?.total ??
                video.items[0].statistics.likeCount
              }
              view={video.pictures ?? video.items[0].statistics.viewCount}
              img={
                video.pictures?.sizes[2]?.link ??
                video.items[0].snippet.thumbnails.default.url
              }
            ></Video>
          ))}
        </Row>
      )}
    </Container>
  );
}
