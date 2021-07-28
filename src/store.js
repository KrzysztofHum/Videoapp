import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { videoReducer } from "./reducers/videoReducers";

const initialState = {
  video: {
    videos: localStorage.getItem("videos")
      ? JSON.parse(localStorage.getItem("videos"))
      : [],
    typescriptVideos: [
      "ydkQlJhodio",
      "BwuLxPH8IDs",
      "Z5iWr6Srsj8",
      "NjN00cM18Z4",
      "RnTU81aQMRA",
    ],
  },
};

const allReducers = combineReducers({
  video: videoReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
