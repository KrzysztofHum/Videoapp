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

export default function Video(props) {
  const dispatch = useDispatch();
  const title = props.title;
  const likeCount = props.like;
  const img = props.img;
  const view = props.view;
  const deleteVideoHandler = (id) => {
    if (window.confirm("Na pewno chcesz usunąć film ?")) {
      dispatch(deleteVideo(id));
    }
  };
  const addVideoToFavoriteHandler = (id) => {
    dispatch(addVideoToFavorite(id));
  };
  return (
    <Col sm="12" md="6" lg="4" xl="3">
      <Card>
        <CardImg width="100%" height="400px" src={img} alt={title} />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>Polubienia: {likeCount}</CardText>
          <CardText>Wyświetlenia: {view > -1 ? view : "Brak Danych"}</CardText>
          <CardText>Czas dodania: {new Date().toLocaleString() + ""}</CardText>
        </CardBody>
        <Col className="d-flex justify-content-around">
          <Button ml="5">Obejrzyj</Button>
          <Button onClick={() => deleteVideoHandler(props.id)}>Usuń</Button>
          <Button onClick={() => addVideoToFavoriteHandler(props.id)}>
            Dodaj do ulubionych
          </Button>
        </Col>
      </Card>
    </Col>
  );
}
