import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Container,
} from "reactstrap";
import { addVideo } from "../actions/videoActions";

export default function Search() {
  const dispatch = useDispatch("");
  const [id, setId] = useState("");

  const idUrl = id.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/);
  const api = process.env.REACT_APP_API_KEY;
  const youtubeApi = `https://www.googleapis.com/youtube/v3/videos?id=${idUrl}&key=${api}&part=snippet,contentDetails,statistics,status`;

  const addVideoHandler = () => {
    if (idUrl != null) {
      dispatch(addVideo(youtubeApi));
    } else {
      dispatch({ type: "VIDEO_ADD_FAIL" });
    }
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
    <Container>
      <h2>Wyszukiwarka filmów</h2>
      <h5>Wklej link z youtube:</h5>
      <InputGroup>
        <Input
          id="video"
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
