import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_VIDEO_TO_FAVORITE,
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
  VIDEO_DELETE,
} from "../constants/videoConstants";

export const addVimeoVideo = (link) => async (dispatch) => {
  dispatch({ type: VIDEO_ADD_REQUEST });
  try {
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
        id: uuidv4(),
        favorite: "no",
        data: new Date().toLocaleString() + "",
      },
    });
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};
export const addYoutubeVideo = (link) => async (dispatch) => {
  dispatch({ type: VIDEO_ADD_REQUEST });
  try {
    const { data } = await axios.get(link);
    if (data.items.toString().length > 1)
      return dispatch({
        type: VIDEO_ADD_SUCCESS,
        payload: {
          ...data.items[0],
          id: uuidv4(),
          favorite: "no",
          data: new Date().toLocaleString() + "",
        },
      });
    return dispatch({ type: VIDEO_ADD_FAIL });
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};

export const deleteVideo = (id) => (dispatch) => {
  dispatch({ type: VIDEO_DELETE, payload: id });
};

export const addVideoToFavorite = (id) => (dispatch) => {
  dispatch({ type: ADD_VIDEO_TO_FAVORITE, payload: id });
};
