import { put, call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { handleCreateSaga } from "../../../utils/helper";
import { ISaga, IAction } from "../../../interfaces";
import { UserActions } from "../../reducers/User/user";

import {
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetOnRoom,
} from "../../../api/user";

function* handleGetist(action: IAction) {
  try {
    const res: AxiosResponse = yield call(GetUser);
    if (res.data)
      // co data tu api roi thi ta save vao store
      yield put(UserActions.GET_LIST_SUCCESS(res.data));
  } catch (e) {
    yield put(UserActions.GET_LIST_FAILED());
  }
}
function* handlegetListOnRoom(action: IAction) {
  try {
    const { data } = action.payload;
    const res: AxiosResponse = yield call(GetOnRoom, data);
    if (res.data) yield put(UserActions.GET_LIST_ON_ROOM_SUCCESS(data));
  } catch (e) {
    yield put(UserActions.GET_LIST_ON_ROOM_FAILED());
  }
}

function* handleCreate(action: IAction) {
  const { data, cb } = action.payload;
  try {
    const res: AxiosResponse = yield call(CreateUser, data);
    if (res) {
      yield put(UserActions.CREATE_TODO_SUCCESS(action.payload.data));
      yield put(UserActions.GET_LIST_REQUREST());
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e: any) {
    yield put(UserActions.CREATE_TODO_FAILED());

    if (cb && typeof cb === "function")
      yield cb({ isFailed: true, error: e.data });
  }
}
function* handleUpdate(action: IAction) {
  // trong handle nay tham so nhan vao la 1 action (type & payload), cai payload nay la cai dc truyen vao luc díspatch âấ
  try {
    // api thi goi ở đây
    // vi du co func call api
    // const res = yield call(funcAPI,tham số);
    // day la truong hop call api trong saga, con neu call o component thi truyen vao luc dispatch thoy, roi trong saga no nhâậ o phan action

    const { data, id, cb } = action.payload;
    const res: AxiosResponse = yield call(UpdateUser, id, data);

    if (res) {
      yield put(UserActions.UPDATE_TODO_SUCCESS({ data, id }));
      yield put(UserActions.GET_LIST_REQUREST());
      // o ben kia chung ta truyen them 1 func callback de tra data tu saga ve component
      // check if cb exist & type is func
      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(UserActions.UPDATE_TODO_FAILED());
  }
}

//
function* handleDelete(action: IAction) {
  try {
    const { id, cb } = action.payload;

    const res: AxiosResponse = yield call(DeleteUser, id);
    if (res) {
      yield put(UserActions.DELETE_TODO_SUCCESS({ id }));
      yield put(UserActions.GET_LIST_REQUREST());

      if (cb && typeof cb === "function") yield cb({ isSuccess: true });
    }
  } catch (e) {
    yield put(UserActions.DELETE_TODO_FAILED());
  }
}

/**
 * khuc nay la tao ra 1 saga de lang nghe action get list request, khi action get_list_request -cai nay biet r | oke
 */
const getListSaga: ISaga = {
  on: UserActions.GET_LIST_REQUREST,
  handle: handleGetist,
};
const getListOnRoomSaga: ISaga = {
  on: UserActions.GET_LIST_ON_ROOM,
  handle: handlegetListOnRoom,
};

const createSaga: ISaga = {
  on: UserActions.CREATE_TODO_REQUREST,
  handle: handleCreate,
};
const updateSaga: ISaga = {
  on: UserActions.UPDATE_TODO_REQUREST,
  handle: handleUpdate,
};
const deleteSaga: ISaga = {
  on: UserActions.DELETE_TODO_REQUREST,
  handle: handleDelete,
};

export default handleCreateSaga([
  getListSaga,
  createSaga,
  updateSaga,
  deleteSaga,
  getListOnRoomSaga,
]);
