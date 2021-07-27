import { useDispatch, useSelector } from "react-redux";
import Video from "./Video";
import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import Paginations from "./Paginations";
import {
  ALL_VIDEO_DELETE,
  FILTER_VIDEO,
  FILTER_VIDEO_ALL,
  SORT_VIDEO_BY_LATEST,
  SORT_VIDEO_BY_THE_OLDEST,
} from "../constants/videoConstants";

export default function VideoLists() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { loading, error, videos } = video;

  const deleteAllVideoHandler = () => {
    if (window.confirm("Na pewno chcesz usunąć wszystkie filmy ?")) {
      dispatch({ type: ALL_VIDEO_DELETE });
    }
  };

  const getFilterFavorite = () => {
    dispatch({ type: FILTER_VIDEO });
  };
  const getFilterAll = () => {
    dispatch({ type: FILTER_VIDEO_ALL });
  };

  const sortByLatest = () => {
    dispatch({ type: SORT_VIDEO_BY_LATEST });
  };
  const sortByTheOldest = () => {
    dispatch({ type: SORT_VIDEO_BY_THE_OLDEST });
  };

  return (
    <Container className="mt-5">
      <Button onClick={() => deleteAllVideoHandler()}>Usuń Wszystko</Button>
      <UncontrolledDropdown>
        <DropdownToggle caret>Filtruj</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => getFilterAll()}>Wszystkie</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => getFilterFavorite()}>
            Tylko ulubione
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown>
        <DropdownToggle caret>Sortuj</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => sortByTheOldest()}>
            Najstarsze
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => sortByLatest()}>
            Ostatnio dodane
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Paginations />
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
              favorite={video.favorite}
              data={video.data}
            ></Video>
          ))}
        </Row>
      )}
    </Container>
  );
}
