import { useDispatch, useSelector } from "react-redux";
import Video from "./Video";
import Paginations from "./Paginations";
import {
  Alert,
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  ALL_VIDEO_DELETE,
  FILTER_VIDEO,
  FILTER_VIDEO_ALL,
  SORT_VIDEO_BY_LATEST,
  SORT_VIDEO_BY_THE_OLDEST,
} from "../constants/videoConstants";
import { useState } from "react";

export default function VideoLists() {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { error, videos } = video;

  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const toggle = () => setIsOpen(!isOpen);

  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 2;

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

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
      <Row className="p-3">
        <Col>
          <Button color="danger" onClick={() => deleteAllVideoHandler()}>
            Usuń Wszystko
          </Button>
        </Col>
        <Col>
          <UncontrolledDropdown>
            <DropdownToggle color="info" caret>
              Filtruj
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => getFilterAll()}>
                Wszystkie
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => getFilterFavorite()}>
                Tylko ulubione
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
        <Col>
          <UncontrolledDropdown>
            <DropdownToggle color="info" caret>
              Sortuj
            </DropdownToggle>
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
        </Col>
      </Row>
      {error ? (
        <Alert color="danger">
          Ten link nie prowadzi do zadnego video na YouTube/Vimeo. Proszę
          sprawdz poprawność.
        </Alert>
      ) : null}

      <Row className="mb-5">
        <Modal isOpen={isOpen} toggle={toggle}>
          <iframe
            width="560"
            height="315"
            src={iframeSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
        {currentVideos.map((video) => (
          <Video
            video={video}
            key={video.idd}
            setIsOpen={setIsOpen}
            setIframeSrc={setIframeSrc}
            isOpen={isOpen}
          ></Video>
        ))}
      </Row>
      <Paginations
        setCurrentPage={setCurrentPage}
        videos={videos}
        videosPerPage={videosPerPage}
      />
    </Container>
  );
}
