import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import listsReducer from "./reducers/listsReducer";
import cardReducer from "./reducers/cardReducer";
import boardReducer from "./reducers/boardReducer";

const rootReducer = combineReducers({
  user : userReducer,
  lists: listsReducer,
  cards: cardReducer,
  board: boardReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.warn("cek state store", store.getState()));

export default store;
