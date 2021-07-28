import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const video = useSelector((state) => state.video);
  const { typescriptVideos } = video;

  const [idd, setIdd] = useState("");

  const addVideoHandler = () => {
    if (idd.includes("vimeo.com/")) return vimeoVideo();
    return youtubeVideo();
  };

  const vimeoVideo = () => {
    const idUrlv = idd.match(/[^vimeo.com/]*$/);
    const vimeoApi = `https://api.vimeo.com/videos/${idUrlv}`;
    dispatch(addVimeoVideo(vimeoApi, idUrlv));
    setIdd("");
  };

  const youtubeVideo = () => {
    const idUrl = idd.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/);
    const api = process.env.REACT_APP_API_KEY;
    const youtubeApi = `https://www.googleapis.com/youtube/v3/videos?id=${idUrl}&key=${api}&part=snippet,statistics,id`;
    dispatch(addYoutubeVideo(youtubeApi));
    setIdd("");
  };

  const addTypescriptVideoHandler = () => {
    const api = process.env.REACT_APP_API_KEY;
    typescriptVideos.map((video) =>
      dispatch(
        addYoutubeVideo(
          `https://www.googleapis.com/youtube/v3/videos?id=${video}&key=${api}&part=snippet,statistics,id`
        )
      )
    );
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
          value={idd}
          name=""
          type="text"
          placeholder="wklej id"
          onChange={(e) => setIdd(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={() => addVideoHandler()}>
            Pokaż Film!
          </Button>
          <Button color="success" onClick={() => addTypescriptVideoHandler()}>
            Dodaj 5 filmów o TypeScript
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Container>
  );
}
