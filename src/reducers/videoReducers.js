import {
  ADD_VIDEO_TO_FAVORITE,
  ALL_VIDEO_DELETE,
  FILTER_VIDEO,
  FILTER_VIDEO_ALL,
  SORT_VIDEO_BY_LATEST,
  SORT_VIDEO_BY_THE_OLDEST,
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
        videos: state.videos.filter((video) => video.idd !== action.payload),
      };
      localStorage.setItem("videos", JSON.stringify(newVideos.videos));
      return {
        ...state,
        videos: state.videos.filter((video) => video.idd !== action.payload),
      };
    case ALL_VIDEO_DELETE:
      localStorage.setItem("videos", JSON.stringify([]));
      return {
        videos: [],
      };
    case ADD_VIDEO_TO_FAVORITE:
      const findVideo = {
        ...state,
        videos: state.videos.filter((video) => video.idd === action.payload),
      };
      const otherVideos = {
        ...state,
        videos: state.videos.filter((video) => video.idd !== action.payload),
      };
      const favoriteVideo = { ...findVideo.videos[0], favorite: "yes" };
      const videos = [...otherVideos.videos, favoriteVideo];
      localStorage.setItem("videos", JSON.stringify(videos));
      return state;
    case FILTER_VIDEO:
      let allFavoriteVideos = JSON.parse(localStorage.getItem("videos"));
      let filter = {
        ...state,
        videos: allFavoriteVideos.filter((video) => video.favorite === "yes"),
      };
      return filter;
    case FILTER_VIDEO_ALL:
      let allVideos = JSON.parse(localStorage.getItem("videos"));
      return { videos: allVideos };
    case SORT_VIDEO_BY_THE_OLDEST:
      const theOldestSort = state.videos.slice().sort(function (a, b) {
        let arrA = a.data.replace(/[^0-9]/g, "");
        let arrB = b.data.replace(/[^0-9]/g, "");
        return arrA - arrB;
      });
      return { videos: theOldestSort };
    case SORT_VIDEO_BY_LATEST:
      const latestSort = state.videos.slice().sort(function (a, b) {
        let arrA = a.data.replace(/[^0-9]/g, "");
        let arrB = b.data.replace(/[^0-9]/g, "");
        return arrB - arrA;
      });
      return { videos: latestSort };
    default:
      return state;
  }
};
