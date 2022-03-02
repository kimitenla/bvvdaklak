import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { handleCreateSaga } from "../../../utils/helper";
import { ISaga, IAction } from "../../../interfaces";
import { LoginActions } from "../../reducers/User/login";
import { Login } from "../../../api/user";

function* handleLogin(action: IAction) {
  const { data, cb } = action.payload;

  try {
    const res: AxiosResponse = yield call(Login, data);
    if (res) {
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      yield put(LoginActions.LOGIN_SUCCESS(action.payload.data));

      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e: any) {
    yield put(LoginActions.LOGIN_FAILED());
    if (cb && typeof cb === "function")
      yield cb({ isFailed: true, error: e.response.data });
  }
}

/**
 * khuc nay la tao ra 1 saga de lang nghe action get list request, khi action get_list_request -cai nay biet r | oke
 */

const LOGINSaga: ISaga = {
  on: LoginActions.LOGIN_REQUREST,
  handle: handleLogin,
};

export default handleCreateSaga([LOGINSaga]);
