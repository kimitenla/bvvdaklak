import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../pages/home/index";
import User from "../pages/home/user";
import CalendarPage from "../pages/home/calendar";
import MeetupOnce from "../pages/home/meetupOnce";
import Room from "../pages/home/room";
export default function RouteCenter() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <PrivateRoute path="/">
          <Switch>
            <PrivateRoute path="/user">
              <User />
            </PrivateRoute>

            <PrivateRoute path="/" exact>
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/calendar" exact>
              <CalendarPage />
            </PrivateRoute>
            <PrivateRoute path="/meetupOnce" exact>
              <MeetupOnce />
            </PrivateRoute>
            <PrivateRoute path="/room" exact>
              <Room />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }: any) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token != null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
