import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Button,
  Modal,
} from "reactstrap";
import { addVideoToFavorite, deleteVideo } from "../actions/videoActions";

export default function Video(props) {
  const dispatch = useDispatch();
  const { link, title, likeCount, img, view, data, modal } = props;
  console.log(modal);

  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");

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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        {/* <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="QBWuo9_O15I"
          onClose={() => setOpen(false)}
        /> */}
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
      <Col sm="12" md="12" lg="6" xl="4">
        <Card className="mt-3">
          <CardImg
            width="100%"
            height="400px"
            src={img}
            alt={title}
            onClick={() => modalHandler(props.modal)}
          />
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardText>Polubienia: {likeCount}</CardText>
            <CardText>
              Wyświetlenia: {view > -1 ? view : "Brak Danych"}
            </CardText>
            <CardText>Czas dodania: {data}</CardText>
          </CardBody>
          <Col className="d-flex justify-content-around p-4">
            <Button ml="5">
              <a aria-label="link" rel="noreferrer" target="_blank" href={link}>
                Obejrzyj
              </a>
            </Button>
            <Button onClick={() => deleteVideoHandler(props.idd)}>Usuń</Button>
            <Button onClick={() => addVideoToFavoriteHandler(props.idd)}>
              Dodaj do ulubionych
            </Button>
          </Col>
        </Card>
      </Col>
    </>
  );
}
