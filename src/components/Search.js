import axios from "axios";
import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";

export default function Search() {
  const [id, setId] = useState("");

  const [title, setTitle] = useState("");
  const [likeCount, setLikeCount] = useState("");
  const [viewCount, setViewCount] = useState("");
  const [thumbnails, setThumbnails] = useState("");
  const [data, setData] = useState("");

  const idUrl = id.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/);

  const api = process.env.REACT_APP_API_KEY;
  const youtubeApi = `https://www.googleapis.com/youtube/v3/videos?id=${idUrl}&key=${api}&part=snippet,contentDetails,statistics,status`;

  const getVideo = () => {
    axios({
      method: "GET",
      url: youtubeApi,
    })
      .then((response) => {
        console.log(response.data);
        // console.log(data.items[0]);
        setTitle(response.data.items[0].snippet.localized.title);
        setLikeCount(response.data.items[0].statistics.likeCount);
        setViewCount(response.data.items[0].statistics.viewCount);
        setThumbnails(response.data.items[0].snippet.thumbnails.default.url);
        setData(new Date().toLocaleDateString());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="search">
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
          <Button color="primary" onClick={getVideo}>
            Pokaż Film!
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <div>Tytuł:{title}</div>
      <div>Like:{likeCount}</div>
      <div>Odsłony:{viewCount}</div>
      <div>
        Obrazek : <img src={thumbnails} alt={thumbnails} />
      </div>
      <div>Data: {data}</div>
    </div>
  );
}
