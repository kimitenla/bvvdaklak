import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../pages/home/index";
import User from "../pages/home/user";
import CalendarPage from "../pages/home/calendar";
import MeetupOnce from "../pages/home/meetupOnce";
import Room from "../pages/home/room";
import ScoreRoom from "../pages/home/ScoreRoom";
export default function RouteCenter() {
  return (
    <HashRouter>
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
            <PrivateRoute path="/ScoreRoom" exact>
              <ScoreRoom />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
      </Switch>
    </HashRouter>
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
