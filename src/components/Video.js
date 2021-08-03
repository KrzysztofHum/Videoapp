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

export default function Video({
  video,
  setIsOpen,
  setIframeSrc,
  isOpen,
  layout,
}) {
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
    <Col sm="12" md="12" lg="12" xl="12">
      <Card
        className={
          layout
            ? "mt-5 wrapper"
            : "mt-5 d-flex flex-row layout justify-content-center"
        }
      >
        <CardImg src={img} alt={title} onClick={() => modalHandler(modal)} />
        <CardBody
          className={
            layout
              ? "d-flex flex-column justify-content-around"
              : "col-6 d-flex flex-column justify-content-around card-body"
          }
        >
          <CardTitle tag="h3">{title}</CardTitle>
          <CardText>Polubienia: {likeCount}</CardText>
          <CardText>Wyświetlenia: {view > -1 ? view : "Brak Danych"}</CardText>
          <CardText>Czas dodania: {data}</CardText>
        </CardBody>
        <Col
          className={
            layout
              ? "p-4 d-flex justify-content-around"
              : "col-lg-2 col-md-2 col-sm-3 col-6 p-2 d-flex flex-column justify-content-around card-actions"
          }
        >
          <a
            className="btn btn-success"
            aria-label="link"
            rel="noreferrer"
            target="_blank"
            href={link}
          >
            Obejrzyj
          </a>

          <Button color="danger" onClick={() => deleteVideoHandler(idd)}>
            Usuń
          </Button>
          <Button
            color="primary"
            onClick={() => addVideoToFavoriteHandler(idd)}
          >
            Ulubione
          </Button>
        </Col>
      </Card>
    </Col>
  );
}
