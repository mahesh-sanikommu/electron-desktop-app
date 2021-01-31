import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { routerMiddleware } from "react-router-redux";
// import { createHashHistory } from "history";

const initialState = {};
// const history = createHashHistory();

// Redux DevTools Configuration
// const actionCreators = {
//   ...counterActions,
//   ...routerActions
// };

const middleware = [thunk];

// const router = routerMiddleware(history);
// middleware.push(router);

const reduxBrowserExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  : compose;

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxBrowserExtension
  )
);

export default store;
