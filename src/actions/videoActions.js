import axios from "axios";
import {
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
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
    console.log(data);
    // dispatch({ type: VIDEO_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};
export const addYoutubeVideo = (link) => async (dispatch) => {
  dispatch({ type: VIDEO_ADD_REQUEST });
  try {
    const { data } = await axios.get(link);
    console.log(data.items[0]);
    if (data.items.toString().length > 1)
      return dispatch({ type: VIDEO_ADD_SUCCESS, payload: data.items[0] });
    return dispatch({ type: VIDEO_ADD_FAIL });
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};
