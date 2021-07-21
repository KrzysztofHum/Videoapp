import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { videoReducer } from "./reducers/videoReducers";

const initialState = {
  video: {
    loading: true,
    videos: [],
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
