import { combineReducers } from "redux";

import HomeReducers from "./Meetups/home";
import UserReducers from "./User/user";
import LoginReducers from "./User/login";
import RoomReducers from "./Room/room";
import ScoreReducers from "./Score/score";
export default combineReducers({
  user: UserReducers,
  home: HomeReducers,
  login: LoginReducers,
  room: RoomReducers,
  score: ScoreReducers,
});
