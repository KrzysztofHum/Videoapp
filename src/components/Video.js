import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

export default function Video(props) {
  const videos = props.product.items[0];
  const title = videos.snippet.localized.title;
  const likeCount = videos.statistics.likeCount;
  const viewCount = videos.statistics.viewCount;
  const thumbnails = videos.snippet.thumbnails.default.url;
  return (
    <div>
      <Card>
        <CardImg width="100%" height="400px" src={thumbnails} alt={title} />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardText>{likeCount}</CardText>
          <CardText>{viewCount}</CardText>
          <CardText>{new Date().toLocaleString() + ""}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
