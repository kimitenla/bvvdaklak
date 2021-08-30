import { combineReducers } from "redux";

import HomeReducers from "./home";
import UserReducers from "./User/user";
import LoginReducers from "./User/login";
import RoomReducers from "./Room/room";
export default combineReducers({
  user: UserReducers,
  home: HomeReducers,
  login: LoginReducers,
  room: RoomReducers,
});
