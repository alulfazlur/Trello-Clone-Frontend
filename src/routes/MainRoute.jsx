import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Board from "../pages/TrelloBoard";
import SignIn from "../pages/Signin";
// import SignUp from "../pages/Signup";
// import NotFound from "../pages/NotFound";

import { Provider } from "react-redux";
import store from "../store";

const MainRoutes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/:boardId" component={Board} />
          {/* <Route exact path="/signup" component={SignUp} /> */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default MainRoutes;
