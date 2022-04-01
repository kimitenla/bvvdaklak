import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import {
  Home,
  CalendarPage,
  MeetupOnce,
  Room,
  ScoreRoom,
  User,
  ViewScoreRoom,
  Login,
  Layout1,
  ScoreFind,
} from "../pages";
export default function RouteCenter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Layout1>
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
              <PrivateRoute path="/ViewScoreRoom" exact>
                <ViewScoreRoom />
              </PrivateRoute>
              <PrivateRoute path="/ScoreFind" exact>
                <ScoreFind />
              </PrivateRoute>
            </Switch>
          </PrivateRoute>
        </Layout1>
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
