import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addVimeoVideo, addYoutubeVideo } from "../actions/videoActions";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Container,
} from "reactstrap";

export default function Search() {
  const dispatch = useDispatch("");
  const [id, setId] = useState("");

  const addVideoHandler = () => {
    if (id.includes("vimeo.com")) return vimeoVideo();
    return youtubeVideo();
  };

  const vimeoVideo = () => {
    const idUrlv = id.match(/(videos|video|channels|\.com)\/([\d]+)/)[2];
    const vimeoApi = `https://api.vimeo.com/videos/${idUrlv}`;
    console.log(vimeoApi);
    dispatch(addVimeoVideo(vimeoApi));
    setId("");
  };
  const youtubeVideo = () => {
    const idUrl = id.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/);
    const api = process.env.REACT_APP_API_KEY;
    const youtubeApi = `https://www.googleapis.com/youtube/v3/videos?id=${idUrl}&key=${api}&part=snippet,contentDetails,statistics,status`;
    dispatch(addYoutubeVideo(youtubeApi));
    setId("");
  };

  useEffect(() => {
    getLocalVideos();
  }, []);

  const getLocalVideos = () => {
    if (localStorage.getItem("videos") === null) {
      localStorage.setItem("videos", JSON.stringify([]));
    }
  };

  return (
    <Container className="mt-5">
      <h2>Wyszukiwarka filmów</h2>
      <h5>Wklej link z youtube:</h5>
      <InputGroup>
        <Input
          id="video"
          value={id}
          name=""
          type="text"
          placeholder="wklej id"
          onChange={(e) => setId(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={() => addVideoHandler()}>
            Pokaż Film!
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Container>
  );
}
