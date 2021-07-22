import React, { useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";

export default function Video(props) {
  const [title, setTitle] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [thumbnails, setThumbnails] = useState("");
  if (props.products.item[0] != null) {
    const videos = props.product.items[0];
    setTitle(videos.snippet.localized.title);
    setLikeCount(videos.statistics.likeCount);
    setViewCount(videos.statistics.viewCount);
    setThumbnails(videos.snippet.thumbnails.default.url);
  } else {
  }
  return (
    <Col sm="12" md="6" lg="4" xl="3">
      <Card>
        <CardImg width="100%" height="400px" src={thumbnails} alt={title} />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>Polubienia: {likeCount}</CardText>
          <CardText>Wyświetlenia: {viewCount}</CardText>
          <CardText>Czas dodania: {new Date().toLocaleString() + ""}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
}
