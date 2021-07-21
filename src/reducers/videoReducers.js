import {
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
} from "../constants/videoConstants";

export const videoReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_ADD_REQUEST:
      return { loading: true };
    case VIDEO_ADD_SUCCESS:
      return { loading: false, videos: action.payload };
    case VIDEO_ADD_FAIL:
      return { loading: false, error: action.payload || "Taki film nie istnieje" };
    default:
      return state;
  }
};
