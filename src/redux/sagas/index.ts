import HomeSaga from "./Meetups/home";
import UserSaga from "./User/user";
import LoginSaga from "./User/login";
import RoomSaga from "./Room/room";
import ScoreSaga from "./Score/score";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...HomeSaga,
  ...UserSaga,
  ...LoginSaga,
  ...RoomSaga,
  ...ScoreSaga,
];
