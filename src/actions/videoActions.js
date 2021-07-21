import axios from "axios";
import {
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
} from "../constants/videoConstants";

export const addVideo = (link) => async (dispatch, getState) => {
  dispatch({ type: VIDEO_ADD_REQUEST });
  try {
    const { data } = await axios.get(link);
    dispatch({ type: VIDEO_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIDEO_ADD_FAIL, payload: error.message });
  }
};
