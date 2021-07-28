import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Button,
} from "reactstrap";
import { addVideoToFavorite, deleteVideo } from "../actions/videoActions";

export default function Video({ video, setIsOpen, setIframeSrc, isOpen }) {
  const dispatch = useDispatch();

  const idd = video.idd;
  const title = video.name ?? video.snippet.localized.title;
  const likeCount =
    video.metadata?.connections?.likes?.total ?? video.statistics.likeCount;
  const view = video.pictures ?? video.statistics.viewCount;
  const img =
    video.pictures?.sizes[2]?.link ?? video.snippet.thumbnails.default.url;
  const data = video.data;
  const link = video.link ?? `https://www.youtube.com/watch?v=${video.id}`;
  const modal = video.modal;

  const deleteVideoHandler = (idd) => {
    if (window.confirm("Na pewno chcesz usunąć film ?")) {
      dispatch(deleteVideo(idd));
    }
  };
  const addVideoToFavoriteHandler = (idd) => {
    dispatch(addVideoToFavorite(idd));
  };

  const modalHandler = (modal) => {
    setIframeSrc(modal);
    setIsOpen(!isOpen);
  };

  return (
    <Col sm="12" md="12" lg="6" xl="6">
      <Card className="mt-3">
        <CardImg
          width="100%"
          height="400px"
          src={img}
          alt={title}
          onClick={() => modalHandler(modal)}
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>Polubienia: {likeCount}</CardText>
          <CardText>Wyświetlenia: {view > -1 ? view : "Brak Danych"}</CardText>
          <CardText>Czas dodania: {data}</CardText>
        </CardBody>
        <Col className="d-flex justify-content-around p-4">
          <Button ml="5">
            <a aria-label="link" rel="noreferrer" target="_blank" href={link}>
              Obejrzyj
            </a>
          </Button>
          <Button onClick={() => deleteVideoHandler(idd)}>Usuń</Button>
          <Button onClick={() => addVideoToFavoriteHandler(idd)}>
            Dodaj do ulubionych
          </Button>
        </Col>
      </Card>
    </Col>
  );
}
