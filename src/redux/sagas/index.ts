import HomeSaga from "./home";
import UserSaga from "./User/user";
import LoginSaga from "./User/login";
import RoomSaga from "./Room/room";

export default [...HomeSaga, ...UserSaga, ...LoginSaga, ...RoomSaga];
