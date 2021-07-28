import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_VIDEO_TO_FAVORITE,
  VIDEO_ADD_FAIL,
  VIDEO_ADD_SUCCESS,
  VIDEO_DELETE,
} from "../constants/videoConstants";

export const addVimeoVideo = (link, id) => async (dispatch) => {
  const token = process.env.REACT_APP_VIMEO_KEY;
  const { data } = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch({
    type: VIDEO_ADD_SUCCESS,
    payload: {
      ...data,
      idd: uuidv4(),
      modal: `https://player.vimeo.com/video/${id}`,
      favorite: "no",
      data: new Date().toLocaleString() + "",
    },
  });
};
export const addYoutubeVideo = (link) => async (dispatch) => {
  const { data } = await axios.get(link);
  if (data.items.toString().length > 1)
    return dispatch({
      type: VIDEO_ADD_SUCCESS,
      payload: {
        ...data.items[0],
        modal: `https://www.youtube.com/embed/${data.items[0].id}`,
        idd: uuidv4(),
        favorite: "no",
        data: new Date().toLocaleString() + "",
      },
    });
  return dispatch({ type: VIDEO_ADD_FAIL });
};

export const deleteVideo = (idd) => (dispatch) => {
  dispatch({ type: VIDEO_DELETE, payload: idd });
};

export const addVideoToFavorite = (idd) => (dispatch) => {
  dispatch({ type: ADD_VIDEO_TO_FAVORITE, payload: idd });
};
