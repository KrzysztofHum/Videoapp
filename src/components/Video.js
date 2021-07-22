import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";

export default function Video(props) {
  console.log(props.view);
  const title = props.title;
  const likeCount = props.like;
  const img = props.img;
  const view = props.view;

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
      </Card>
    </Col>
  );
}
