import {
  ALL_VIDEO_DELETE,
  VIDEO_ADD_FAIL,
  VIDEO_ADD_REQUEST,
  VIDEO_ADD_SUCCESS,
  VIDEO_DELETE,
} from "../constants/videoConstants";

export const videoReducer = (state = { videos: [] }, action) => {
  switch (action.type) {
    case VIDEO_ADD_REQUEST:
      return { loading: true };
    case VIDEO_ADD_SUCCESS:
      const old = JSON.parse(localStorage.getItem("videos"));
      old.push(action.payload);
      localStorage.setItem("videos", JSON.stringify(old));
      return { loading: false, videos: old };
    case VIDEO_ADD_FAIL:
      return {
        loading: false,
        error: action.payload || "Taki film nie istnieje",
      };
    case VIDEO_DELETE:
      const newVideos = {
        ...state,
        videos: state.videos.filter((video) => video.id !== action.payload),
      };
      localStorage.setItem("videos", JSON.stringify(newVideos.videos));
      return {
        ...state,
        videos: state.videos.filter((video) => video.id !== action.payload),
      };
    case ALL_VIDEO_DELETE:
      localStorage.setItem("videos", JSON.stringify([]));
      return {
        videos: [],
      };

    default:
      return state;
  }
};
