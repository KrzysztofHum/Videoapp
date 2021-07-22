import axios from "axios";
import {
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
} from "../constants/videoConstants";

export const addVideo = (link) => async (dispatch) => {
  dispatch({ type: VIDEO_ADD_REQUEST });
  try {
    console.log(link);
    if (link.includes("vimeo")) {
      const token = process.env.REACT_APP_VIMEO_KEY;
      const { data } = await axios.get(link, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: VIDEO_ADD_SUCCESS, payload: data });
    } else {
      const { data } = await axios.get(link);
      dispatch({ type: VIDEO_ADD_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};
