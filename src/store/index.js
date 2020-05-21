import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import listsReducer from "./reducers/listsReducer";
import cardReducer from "./reducers/cardReducer";
import listOrderReducer from "./reducers/listOrderReducer";

const rootReducer = combineReducers({
  lists: listsReducer,
  listOrder: listOrderReducer,
  cards: cardReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.warn("cek state store", store.getState()));

export default store;
