import { useSelector } from "react-redux";
import Video from "./Video";
import { v4 as uuidv4 } from "uuid";
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
            <Video key={uuidv4()} product={video}></Video>
          ))}
        </Row>
      )}
    </Container>
  );
}
